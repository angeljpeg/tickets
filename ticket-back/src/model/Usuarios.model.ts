import { sequelize } from "../config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

enum RolUsuarios {
    Usuario = "USUARIO",
    Tecnico = "TECNICO",
    Administrador = "ADMINISTRADOR"
}

class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  declare idUsuario: CreationOptional<number>;
  declare nombreUsuario: string;
  declare correoUsuario: string;
  declare claveUsuario: string;
  declare rolUsuario: RolUsuarios;
  declare puestoUsuario: number;
}

Usuario.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreUsuario: {
      type: new DataTypes.STRING(65),
      allowNull: true,
    },
    correoUsuario: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    claveUsuario: {
      type: new DataTypes.STRING(25),
      allowNull: true,
    },
    rolUsuario: {
      type: DataTypes.ENUM(...Object.values(RolUsuarios)),
    },
    puestoUsuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
  }
);

export { Usuario };
