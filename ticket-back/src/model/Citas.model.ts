import { sequelize } from "../config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { Usuario } from "./Usuarios.model";

class Cita extends Model<
  InferAttributes<Cita>,
  InferCreationAttributes<Cita>
> {
  declare idCita: CreationOptional<number>;
  declare fechaInicioCita: Date;
  declare fechaFinCita: Date | null;
  declare idTicket: number;
}

Cita.init(
  {
    idCita: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idTicket: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    fechaInicioCita: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFinCita: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Cita",
    tableName: "citas",
    timestamps: false,
  }
);

// Tabla intermedia para la relación many-to-many entre Usuario y Cita
const TecnicoCita = sequelize.define(
  "TecnicoCita",
  {
    idUsuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Usuario,
        key: "idUsuario",
      },
    },
    idCita: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Cita,
        key: "idCita",
      },
    },
  },
  {
    tableName: "tecnicos_citas",
    timestamps: false,
  }
);

export { Cita, TecnicoCita };