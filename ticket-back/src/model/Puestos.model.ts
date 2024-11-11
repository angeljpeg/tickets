import { sequelize } from "../config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

class Puesto extends Model<
  InferAttributes<Puesto>,
  InferCreationAttributes<Puesto>
> {
  declare idPuesto: CreationOptional<number>;
  declare nombrePuesto: string;
  declare prioridad: number;
}

Puesto.init(
  {
    idPuesto: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombrePuesto: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    prioridad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Valor predeterminado de acuerdo con la estructura de la tabla
    },
  },
  {
    sequelize,
    modelName: "Puesto",
    tableName: "puestos",
    timestamps: false, // No se usan campos `createdAt` y `updatedAt`
  }
);

export { Puesto };