import { Request, Response } from "express";
import { Cita, Ticket, Usuario, TecnicoCita } from "../../model";

// Crear una nueva cita
export const CreateCita = async (req: Request, res: Response): Promise<any> => {
  try {
    const { idTicket, fechaInicioCita, fechaFinCita, tecnicos } = req.body;

    // Validación
    if (!Array.isArray(tecnicos)) {
      return res
        .status(400)
        .json({ error: "El campo 'tecnicos' debe ser un arreglo" });
    }

    // Crear cita
    const cita = await Cita.create(
      { idTicket, fechaInicioCita, fechaFinCita },
      { include: [{ model: Ticket, as: "ticket" }] }
    );

    // Crear técnicos asociados
    const tecnicosCita = await Promise.all(
      tecnicos.map((tecnico: Usuario) =>
        TecnicoCita.create({
          idUsuario: tecnico,
          idCita: cita.idCita,
        })
      )
    );

    res.status(201).json({ cita, tecnicosCita });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

// Obtener todas las citas
export const GetAllCitas = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Ticket, as: "ticket" },
        { model: Usuario, as: "tecnicos" },
      ],
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(200).json({cita, tecnicosCita});
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
