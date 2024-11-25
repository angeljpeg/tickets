import express from "express";

// Routes
import {router as UsuarioRouter} from "./usuarios/routes"
import {router as PuestoRouter} from "./Puestos/Routes"
import {router as TicketRouter} from "./Tickets/Routes"
import {router as CitaRouter} from "./Citas/Routes"

const API_PREFIX = "/api/v1"

const app = express();

// config
app.use(express.json());


//Routes exec

app.use(API_PREFIX, UsuarioRouter)
app.use(API_PREFIX, PuestoRouter)
app.use(API_PREFIX, TicketRouter)
app.use(API_PREFIX, CitaRouter)


export default app;
