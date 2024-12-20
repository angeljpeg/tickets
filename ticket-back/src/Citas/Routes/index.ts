import { Router } from "express";

//Controllers
import { CreateCita, GetAllCitas, GetCitaById, DeleteCitaById, UpdateCitaById, GetCitaByUsuario, CompleteCitaById, GetCitasByTecnico } from "../Controllers";

const router = Router();

router.get("/citas", GetAllCitas);

router.post("/citas", CreateCita);

router.get("/citas/:id", GetCitaById);

router.put("/citas/:id", UpdateCitaById);

router.get("/citas/usuario/:id", GetCitaByUsuario);

router.get("/citas/tecnico/:id", GetCitasByTecnico);

router.put("/citas/complete/:id", CompleteCitaById);

router.delete("/citas/delete/:id", DeleteCitaById);

export { router };
