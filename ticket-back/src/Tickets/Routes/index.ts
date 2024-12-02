import { Router } from "express";

//Controllers
import {
  CreateTicket,
  GetAllTickets,
  GetTicketById,
  getTicketsByUsuario,
  deleteTicketById,
  EditTicketById
} from "../Controllers";

const router = Router();

router.get("/tickets", GetAllTickets);

router.post("/tickets", CreateTicket);

router.get("/tickets/:id", GetTicketById);

router.get("/tickets/usuario/:id", getTicketsByUsuario);

/* router.put("/puestos/:id", );*/

router.delete("/tickets/delete/:id", deleteTicketById);

router.put("/tickets/edit/:id", EditTicketById);

export { router };
