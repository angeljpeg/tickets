import { Request, Response } from "express";

import { PuestoService } from "../Services";

import { Puesto } from "../../model";

// Interface
import { ICreatePuesto } from "../Interfaces";

const puestoService = new PuestoService();

export const CreatePuesto = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { nombrePuesto, prioridad } = req.body;

    if (!puestoService.isValidPuesto({ nombrePuesto, prioridad })) {
      return res.status(400).json({ error: "Datos invalidos" });
    }

    const puesto = await Puesto.create({ nombrePuesto, prioridad });
    res.status(201).json(puesto);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const GetAllPuestos = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const puestos = await Puesto.findAll();
    res.status(200).json(puestos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const GetPuestoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const puestos = await Puesto.findByPk(req.params.id);
    res.status(200).json(puestos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deletePuestoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const puestos = await Puesto.destroy({
      where: { idPuesto: req.params.id },
    });
    res.status(200).json(puestos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePuestoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { nombrePuesto, prioridad } = req.body;

    if (!puestoService.isValidPuesto({ nombrePuesto, prioridad })) {
      return res.status(400).json({ error: "Datos invalidos" });
    }

    const puesto = await Puesto.update(
      { nombrePuesto, prioridad },
      {
        where: { idPuesto: req.params.id },
      }
    );
    res.status(200).json(puesto);
  } catch (error) {
    res.status(500).json({ error });
  }
};
