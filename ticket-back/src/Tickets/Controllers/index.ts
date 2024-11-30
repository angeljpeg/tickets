import { Request, Response } from "express";
import sequelize from "sequelize";
import { Ticket, Usuario, Puesto } from "../../model";

export const CreateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      statusTicket,
      tituloTicket,
      descripcionTicket,
      fechaSolicitadoTicket,
      idUsuario,
    } = req.body;

    // Validar que el usuario exista antes de crear el ticket
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    const puestoUsuario = await Puesto.findByPk(usuario.puestoUsuario);
    if (!puestoUsuario) {
      res.status(404).json({ error: "Puesto no encontrado." });
      return;
    }

    let prioridadTicket = 1;

    if (puestoUsuario.prioridad > 4) {
      prioridadTicket = 3;
    } else if (puestoUsuario.prioridad > 2) {
      prioridadTicket = 2;
    } else {
      prioridadTicket = 1;
    }

    // Crear el ticket
    const ticket = await Ticket.create({
      statusTicket,
      descripcionTicket,
      fechaSolicitadoTicket,
      prioridadTicket,
      idUsuario,
      tituloTicket,
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
    const tickets = await Ticket.findAndCountAll({
      order: [
        // Ordenar por status personalizado: Pendiente > En proceso > Completado
        [
          sequelize.literal(`
            CASE 
              WHEN statusTicket = 'Pendiente' THEN 1
              WHEN statusTicket = 'En proceso' THEN 2
              WHEN statusTicket = 'Completado' THEN 3
              ELSE 4
            END
          `),
          "ASC",
        ],
        // Ordenar por prioridadTicket: más bajo primero
        ["prioridadTicket", "ASC"],
        // Ordenar por fechaSolicitadoTicket: más reciente primero
        ["fechaSolicitadoTicket", "DESC"],
      ],
      include: [
        {
          model: Usuario,
          as: "usuario", // Alias configurado en la relación
          attributes: [
            "idUsuario",
            "nombreUsuario",
            "correoUsuario",
            "rolUsuario",
            "puestoUsuario",
          ], // Campos específicos del usuario
        },
      ],
      attributes: [
        "idTicket",
        "statusTicket",
        "tituloTicket",
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

export const getTicketsByUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tickets = await Ticket.findAndCountAll({
      where: {
        idUsuario: id,
      },
      order: [
        // Ordenar por status personalizado: Pendiente > En proceso > Completado
        [
          sequelize.literal(`
            CASE 
              WHEN statusTicket = 'Pendiente' THEN 1
              WHEN statusTicket = 'En proceso' THEN 2
              WHEN statusTicket = 'Completado' THEN 3
              ELSE 4
            END
          `),
          "ASC",
        ],
        // Ordenar por prioridadTicket: más bajo primero
        ["prioridadTicket", "ASC"],
        // Ordenar por fechaSolicitadoTicket: más reciente primero
        ["fechaSolicitadoTicket", "DESC"],
      ],
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombreUsuario",
            "correoUsuario",
            "rolUsuario",
          ],
        },
      ],
      attributes: [
        "idTicket",
        "statusTicket",
        "descripcionTicket",
        "fechaSolicitadoTicket",
        "fechaFinalizadoTicket",
        "prioridadTicket",
        "tituloTicket",
      ],
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
