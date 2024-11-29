import { Router } from "express";

//Controllers
import { CreateTicket, GetAllTickets, GetTicketById, getTicketsByUsuario } from "../Controllers";

const router = Router();

router.get("/tickets", GetAllTickets);

router.post("/tickets", CreateTicket);

router.get("/tickets/:id", GetTicketById);

router.get("/tickets/usuario/:id", getTicketsByUsuario);

/* router.put("/puestos/:id", );

router.delete("/puestos/:id", ); */

export { router };
