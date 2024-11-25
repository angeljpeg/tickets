import { Request, Response } from "express";

import { Ticket, Usuario } from "../../model";

export const CreateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      statusTicket,
      descripcionTicket,
      fechaFinalizadoTicket,
      fechaSolicitadoTicket,
      prioridadTicket,
      idUsuario,
    } = req.body;

    // Validar que el usuario exista antes de crear el ticket
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    // Crear el ticket
    const ticket = await Ticket.create({
      statusTicket,
      descripcionTicket,
      fechaFinalizadoTicket,
      fechaSolicitadoTicket,
      prioridadTicket,
      idUsuario,
    });

    // Respuesta exitosa
    res.status(201).json({
      message: "Ticket creado exitosamente.",
      data: ticket,
    });
  } catch (error: any) {
    console.error("Error al crear el ticket:", error.message);

    res.status(500).json({
      error: "Ocurrió un error al crear el ticket.",
      details: error.message,
    });
  }
};

export const GetAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario", // Alias configurado en la relación
          attributes: [
            "idUsuario",
            "nombreUsuario",
            "correoUsuario",
            "rolUsuario",
          ], // Campos específicos del usuario
        },
      ],
      attributes: [
        "idTicket",
        "statusTicket",
        "descripcionTicket",
        "fechaSolicitadoTicket",
        "fechaFinalizadoTicket",
        "prioridadTicket",
      ], // Campos específicos del ticket
    });

    res.status(200).json({
      message: "Tickets obtenidos exitosamente.",
      data: tickets,
    });
  } catch (error: any) {
    console.error("Error al obtener los tickets:", error.message);

    res.status(500).json({
      error: "Ocurrió un error al obtener los tickets.",
      details: error.message,
    });
  }
};

export const GetTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tickets = await Ticket.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "usuario", // Alias configurado en la relación
          attributes: [
            "idUsuario",
            "nombreUsuario",
            "correoUsuario",
            "rolUsuario",
          ], // Campos específicos del usuario
        },
      ],
      attributes: [
        "idTicket",
        "statusTicket",
        "descripcionTicket",
        "fechaSolicitadoTicket",
        "fechaFinalizadoTicket",
        "prioridadTicket",
      ], // Campos específicos del ticket
    });

    res.status(200).json({
      message: "Tickets obtenidos exitosamente.",
      data: tickets,
    });
  } catch (error: any) {
    console.error("Error al obtener los tickets:", error.message);

    res.status(500).json({
      error: "Ocurrió un error al obtener los tickets.",
      details: error.message,
    });
  }
};
