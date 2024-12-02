import { Request, Response } from "express";
import { Cita, Ticket, Usuario, TecnicoCita } from "../../model";
import { Op, Transaction } from "sequelize";
import { sequelize } from "../../config";
import { ok } from "assert";

// Crear una nueva cita
export const CreateCita = async (req: Request, res: Response): Promise<any> => {
  const MAX_RETRIES = 3; // Número máximo de reintentos
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    const transaction: Transaction = await sequelize.transaction();

    try {
      const { idTicket, fechaInicioCita, tecnicos } = req.body;

      if (
        !idTicket ||
        !fechaInicioCita ||
        !Array.isArray(tecnicos) ||
        tecnicos.length === 0
      ) {
        return res
          .status(400)
          .json({ message: "Datos de entrada inválidos", ok: false });
      }

      const ticket = await Ticket.findByPk(idTicket, { transaction });
      if (!ticket) {
        return res
          .status(404)
          .json({ message: "Ticket no encontrado", ok: false });
      }

      // Actualizar el estado del ticket primero
      await ticket.update({ statusTicket: "En Proceso" }, { transaction });

      // Validar formato de fecha de inicio
      const fechaInicio = new Date(fechaInicioCita);
      const today = new Date();
      const fechaInicioSoloFecha = fechaInicio.toISOString().split("T")[0];

      if (fechaInicio < today) {
        return res.status(400).json({
          message: "La fecha de inicio no puede ser anterior a la fecha actual",
        });
      }

      // Mostrar la fecha de inicio en formato ISO
      console.log("Fecha de inicio:", fechaInicioSoloFecha);

      // Verificar si hay citas existentes para los técnicos en la misma fecha
      console.log("Buscando citas de conflicto globalmente...");
      const citasConflicto = await Cita.findAll({
        include: [
          {
            model: Usuario,
            as: "tecnicos",
            through: { attributes: [] },
            where: { idUsuario: { [Op.in]: tecnicos } }, // Filtra por los técnicos
          },
        ],
        where: sequelize.where(
          sequelize.fn("DATE", sequelize.col("fechaInicioCita")),
          fechaInicioSoloFecha
        ),
        transaction,
      });

      console.log("Citas de conflicto encontradas:", citasConflicto.length);

      if (citasConflicto.length > 0) {
        await transaction.rollback();
        return res.status(400).json({
          message: "Ya existe una cita en este rango de fechas para los técnicos seleccionados",
          citasConflicto,
        });
      }

      // Verificar conflictos de horarios para cada técnico individualmente
      const tecnicosConConflicto: number[] = []; // Para almacenar los IDs de técnicos con conflicto

      for (const tecnicoId of tecnicos) {
        console.log(`Buscando citas de conflicto para el técnico ${tecnicoId}...`);
        const citasConflictoPorTecnico = await Cita.findAll({
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
          transaction,
        });

        console.log(`Citas de conflicto para el técnico ${tecnicoId}:`, citasConflictoPorTecnico.length);

        if (citasConflictoPorTecnico.length > 0) {
          tecnicosConConflicto.push(tecnicoId); // Agregar el ID del técnico con conflicto
        }
      }

      // Si hay técnicos con conflicto, rollback y mensaje de error con sus IDs
      if (tecnicosConConflicto.length > 0) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Los siguientes técnicos tienen conflictos de horarios: ${tecnicosConConflicto.join(', ')}`,
          tecnicosConConflicto,
        });
      }

      // Crear la cita
      const cita = await Cita.create(
        { idTicket, fechaInicioCita, fechaFinCita: null },
        { transaction }
      );

      // Asociar técnicos
      const tecnicosCita = [];
      for (const tecnicoId of tecnicos) {
        const tec = await Usuario.findByPk(tecnicoId, { transaction });
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
      return res.status(201).json({
        message: "Cita creada con éxito",
        data: { cita, tecnicosCita },
        status: 201,
        ok: true,
      });
    } catch (error: any) {
      await transaction.rollback();
      if (error.original?.code === "ER_LOCK_WAIT_TIMEOUT") {
        attempts++;
        if (attempts >= MAX_RETRIES) {
          return res.status(500).json({
            message: "Error al crear la cita: tiempo de espera excedido",
            error,
          });
        }
        continue; // Reintentar
      }
      console.error("Error:", error);
      return res.status(500).json({ message: "Error al crear la cita", error });
    }
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
      order: [
        [
          sequelize.literal(`
            CASE 
              WHEN \`ticket\`.\`statusTicket\` = 'Pendiente' THEN 1
              WHEN \`ticket\`.\`statusTicket\` = 'No Completado' THEN 2
              WHEN \`ticket\`.\`statusTicket\` = 'En proceso' THEN 3
              WHEN \`ticket\`.\`statusTicket\` = 'Completado' THEN 4
              ELSE 5
            END
          `),
          "ASC",
        ],
        // Ordenar por prioridadTicket: más bajo primero
        ["ticket", "prioridadTicket", "ASC"],
        // Ordenar por fechaSolicitadoTicket: más reciente primero
        ["ticket", "fechaSolicitadoTicket", "DESC"],
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
      order: [
        [
          sequelize.literal(`
            CASE 
              WHEN \`ticket\`.\`statusTicket\` = 'Pendiente' THEN 1
              WHEN \`ticket\`.\`statusTicket\` = 'No Completado' THEN 2
              WHEN \`ticket\`.\`statusTicket\` = 'En proceso' THEN 3
              WHEN \`ticket\`.\`statusTicket\` = 'Completado' THEN 4
              ELSE 5
            END
          `),
          "ASC",
        ],
        // Ordenar por prioridadTicket: más bajo primero
        ["ticket", "prioridadTicket", "ASC"],
        // Ordenar por fechaSolicitadoTicket: más reciente primero
        ["ticket", "fechaSolicitadoTicket", "DESC"],
      ],
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
  try {
    const rowsDeleted = await Cita.destroy({
      where: { idCita: req.params.id },
    });

    if (!rowsDeleted) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json({ message: "Cita eliminada exitosamente", ok: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Completar una cita
export const CompleteCitaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { idUsuario, newStatus } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID de cita no especificado" });
    }

    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Verificar si la cita ya está completa
    if (cita.fechaFinCita) {
      return res.status(400).json({ message: "La cita ya está completa" });
    }

    // Verificar si el usuario es técnico
    const tecnico = await Usuario.findByPk(idUsuario);
    if (!tecnico || tecnico.rolUsuario.toUpperCase() !== "TECNICO") {
      return res
        .status(403)
        .json({ message: "No tiene permisos para completar la cita" });
    }

    const ticket = await Ticket.findByPk(cita.idTicket);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    // Cambiar el estado del ticket
    await ticket.update({
      statusTicket: newStatus,
      fechaFinalizadoTicket: new Date(),
    });

    // Completar la cita
    await cita.update({ fechaFinCita: new Date() });

    res.status(200).json({ message: "Cita completada con éxito", ok: true });
  } catch (error) {
    res.status(500).json({ message: "Error al completar la cita", error });
  }
};

// Obtener Citas por Tecnico
export const GetCitasByTecnico = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    // Validar que se proporcione un ID
    if (!id) {
      return res.status(400).json({ message: "ID de usuario no especificado" });
    }

    // Buscar usuario para validar que existe y es un técnico
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (usuario.rolUsuario.toUpperCase() !== "TECNICO") {
      return res.status(400).json({ message: "El usuario no es un técnico" });
    }

    // Buscar todas las citas relacionadas con el técnico
    const citasPorTecnico = await Cita.findAndCountAll({
      include: [
        {
          model: Usuario,
          as: "tecnicos",
          where: { idUsuario: id },
          through: { attributes: [] }, // Ocultar atributos de la tabla intermedia
        },
        {
          model: Ticket,
          as: "ticket",
        },
      ],
      order: [
        [
          sequelize.literal(`
            CASE 
              WHEN \`ticket\`.\`statusTicket\` = 'Pendiente' THEN 1
              WHEN \`ticket\`.\`statusTicket\` = 'No Completado' THEN 2
              WHEN \`ticket\`.\`statusTicket\` = 'En proceso' THEN 3
              WHEN \`ticket\`.\`statusTicket\` = 'Completado' THEN 4
              ELSE 5
            END
          `),
          "ASC",
        ],
        // Ordenar por prioridadTicket: más bajo primero
        ["ticket", "prioridadTicket", "ASC"],
        // Ordenar por fechaSolicitadoTicket: más reciente primero
        ["ticket", "fechaSolicitadoTicket", "DESC"],
      ],
    });

    return res.status(200).json({
      message: "Citas obtenidas exitosamente.",
      data: citasPorTecnico,
      ok: true,
    });
  } catch (error) {
    console.error("Error al obtener citas por técnico:", error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
