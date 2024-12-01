import { Request, Response } from "express";
import { Cita, Ticket, Usuario, TecnicoCita } from "../../model";
import { Op, Transaction } from "sequelize";
import { sequelize } from "../../config";

// Crear una nueva cita
export const CreateCita = async (req: Request, res: Response): Promise<any> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const { idTicket, fechaInicioCita, tecnicos } = req.body;

    // Validación inicial
    if (
      !idTicket ||
      !fechaInicioCita ||
      !Array.isArray(tecnicos) ||
      tecnicos.length === 0
    ) {
      return res.status(400).json({ message: "Datos de entrada inválidos" });
    }

    const ticket = await Ticket.findByPk(idTicket);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    // Validar formato de fecha de inicio
    const fechaInicio = new Date(fechaInicioCita);

    // Verificar si hay citas existentes que se solapan
    const citasConflicto = await Cita.findAll({
      where: {
        fechaInicioCita: {
          [Op.eq]: fechaInicio, // Verifica si ya existe una cita en esta fecha y hora
        },
      },
    });

    if (citasConflicto.length > 0) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Ya existe una cita en este rango de fechas",
        citasConflicto,
      });
    }

    // Verificar conflictos de horarios para cada técnico
    for (const tecnicoId of tecnicos) {
      const citasConflicto = await Cita.findAll({
        include: [
          {
            model: Usuario,
            as: "tecnicos",
            through: { attributes: [] },
            where: { idUsuario: tecnicoId },
          },
        ],
        where: {
          fechaInicioCita: {
            [Op.eq]: fechaInicio,
          },
        },
      });

      if (citasConflicto.length > 0) {
        await transaction.rollback();
        return res.status(400).json({
          message: `El técnico con ID ${tecnicoId} tiene conflictos de horarios`,
          citasConflicto,
        });
      }
    }

    // Crear la cita
    const cita = await Cita.create(
      { idTicket, fechaInicioCita, fechaFinCita: null },
      { transaction }
    );

    // Asociar técnicos
    const tecnicosCita = [];
    for (const tecnicoId of tecnicos) {
      const tec = await Usuario.findByPk(tecnicoId);
      if (!tec || tec.rolUsuario.toUpperCase() !== "TECNICO") {
        await transaction.rollback();
        return res.status(400).json({
          error: "Usuario no es técnico",
          campo: "tecnicos",
          valor: tecnicoId,
        });
      }

      const tecnicoCita = await TecnicoCita.create(
        {
          idUsuario: tecnicoId,
          idCita: cita.idCita,
        },
        { transaction }
      );
      tecnicosCita.push(tecnicoCita);
    }

    // Confirmar la transacción
    await transaction.commit();
    res.status(201).json({
      message: "Cita creada con éxito",
      data: { cita, tecnicosCita },
      status: 201,
      ok: true,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error:", error);
    res.status(500).json({ message: "Error al crear la cita", error });
  }
};

// Obtener todas las citas
export const GetAllCitas = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const citas = await Cita.findAndCountAll({
      include: [
        { model: Ticket, as: "ticket" },
        { model: Usuario, as: "tecnicos" },
      ],
    });
    res
      .status(200)
      .json({ message: "Citas obtenidas exitosamente.", data: citas });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Obtener una cita por Usuario
export const GetCitaByUsuario = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID de usuario no especificado" });
    }

    // Buscar usuario y cargar los tickets relacionados
    const usuario = await Usuario.findByPk(id, {
      include: [{ model: Ticket, as: "tickets" }],
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log(usuario);

    // Extraer los IDs de los tickets del usuario
    const ticketIds = usuario.tickets.map((ticket: any) => ticket.idTicket);

    // Buscar citas relacionadas con estos tickets
    const citas = await Cita.findAndCountAll({
      include: [
        { model: Ticket, as: "ticket" },
        { model: Usuario, as: "tecnicos" },
      ],
      where: {
        idTicket: { [Op.in]: ticketIds },
      },
    });

    return res
      .status(200)
      .json({ message: "Citas obtenidas exitosamente.", data: citas });
  } catch (error) {
    console.error("Error al obtener citas por usuario:", error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

// Obtener una cita por ID
export const GetCitaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const cita = await Cita.findByPk(req.params.id, {
      include: [
        { model: Ticket, as: "ticket" },
        { model: Usuario, as: "tecnicos" },
      ],
    });

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Actualizar una cita por ID
export const UpdateCitaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { fechaInicioCita, fechaFinCita, tecnicos } = req.body;

    const cita = await Cita.findByPk(req.params.id);

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    await cita.update({ fechaInicioCita, fechaFinCita });

    await TecnicoCita.destroy({ where: { idCita: cita.idCita } });

    // Crear técnicos asociados
    const tecnicosCita = await Promise.all(
      tecnicos.map((tecnico: Usuario) =>
        TecnicoCita.create({
          idUsuario: tecnico,
          idCita: cita.idCita,
        })
      )
    );
    res.status(200).json({ cita, tecnicosCita });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Eliminar una cita por ID
export const DeleteCitaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  /*   try {
    const rowsDeleted = await Cita.destroy({ where: { idCita: req.params.id } });

    if (!rowsDeleted) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json({ message: "Cita eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } */
};
