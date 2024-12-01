import { Request, Response } from "express";
import { Usuario, Puesto } from "../../model";

// Obtener todos los usuarios
export const GetAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const usuarios = await Usuario.findAndCountAll();
    return res.json(usuarios);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener un usuario por ID
export const GetUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    console.log(id, " Este es el id");
    const usuario = await Usuario.findByPk(id, { include: Puesto });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(usuario);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error });
  }
};

// Crear un nuevo usuario
export const CreateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const newUsuario = await Usuario.create(req.body);
    return res.status(201).json(newUsuario);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el usuario", error });
  }
};

// Actualizar un usuario por ID
export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const [updated] = await Usuario.update(req.body, {
      where: { idUsuario: id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updatedUsuario = await Usuario.findByPk(id);
    return res.json(updatedUsuario);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario por ID
export const DeleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await Usuario.destroy({
      where: { idUsuario: id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error });
  }
};

// Login de un usuario
export const LoginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { correoUsuario, claveUsuario } = req.body;
    const usuario = await Usuario.findOne({
      where: { correoUsuario },
    });

    console.log(usuario);

    if (!usuario) {
      return res.status(404).json({ 
        campo: "correoUsuario",
        mensaje: "Usuario no encontrado",
        valor: correoUsuario
      });
    }

    if (usuario.claveUsuario !== claveUsuario) {
      return res.status(401).json({ 
        campo: "claveUsuario",
        mensaje: "Contraseña incorrecta",
        valor: claveUsuario
      });
    }

    return res.json({ usuario });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al realizar el login", error });
  }
};

// Obtener un Tecnico por ID
export const GetTecnicoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    console.log(id, " Este es el id");
    const usuarios = await Usuario.findAndCountAll({
      where: { idUsuario: id, rolUsuario: "Tecnico" },
      include: Puesto,
    });

    if (usuarios.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado", data: usuarios, status: 404 });
    }

    return res.status(200).json({ message: "Usuario obtenido", data: usuarios, status: 200, ok: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error });
  }
};

