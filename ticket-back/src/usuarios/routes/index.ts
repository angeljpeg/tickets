import { Router } from "express";

//Controllers
import { GetAllUsers, CreateUser, GetUserById, LoginUser } from "../controllers";

const router = Router();

router.get("/usuarios", GetAllUsers);

router.post("/usuarios", CreateUser);

router.get("/usuarios/:id", GetUserById);

router.post("/usuarios/login", LoginUser);

export { router };
