import express from "express";

// Routes
import {router as UsuarioRouter} from "./usuarios/routes"

const API_PREFIX = "/api/v1"

const app = express();

// config
app.use(express.json());


//Routes exec

app.use(API_PREFIX, UsuarioRouter)


export default app;
