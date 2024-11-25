import { sequelize } from "../config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

enum StatusTickets {
    Completado = "Completado",
    EnProceso = "En Proceso",
    Pendiente = "Pendiente"
}

class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  declare idTicket: CreationOptional<number>;
  declare statusTicket: string;
  declare descripcionTicket: string;
  declare fechaSolicitadoTicket: Date;
  declare fechaFinalizadoTicket: Date | null;
  declare prioridadTicket: number;
  declare idUsuario: number; 
}

Ticket.init(
  {
    idTicket: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    statusTicket: {
      type: DataTypes.ENUM(...Object.values(StatusTickets)),
      allowNull: false,
    },
    descripcionTicket: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    fechaSolicitadoTicket: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFinalizadoTicket: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    prioridadTicket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: false,
  }
);

export { Ticket };