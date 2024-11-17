import { Router } from "express";

//Controllers
import { CreatePuesto, GetAllPuestos, GetPuestoById, deletePuestoById, updatePuestoById } from "../Controllers";

const router = Router();

router.get("/puestos", GetAllPuestos);

router.post("/puestos", CreatePuesto);

router.get("/puestos/:id", GetPuestoById);

router.put("/puestos/:id", updatePuestoById);

router.delete("/puestos/:id", deletePuestoById);

export { router };
