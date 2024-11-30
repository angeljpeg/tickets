import validator, { isNumeric, toInt } from "validator";
import { ICreatePuesto } from "../Interfaces";
export class PuestoService {
  isValidPuesto(newPuesto: {
    nombrePuesto: string;
    prioridad: number;
  }): boolean {
    const { nombrePuesto, prioridad } = newPuesto;

    if (!nombrePuesto || !prioridad) {
      return false;
    }

    if (!validator.isLength(nombrePuesto, { min: 1, max: 50 })) {
      return false;
    }

    if (!isNumeric(prioridad.toString())) {
      return false;
    }

    if (prioridad < 1 || prioridad > 3) {
      return false;
    }

    return true;
  }
}
