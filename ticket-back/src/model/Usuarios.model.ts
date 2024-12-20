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
    Administrador = "ADMINISTRADOR",
    Secretario = "SECRETARIO"
}

class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  [x: string]: any;
  declare idUsuario: CreationOptional<number>;
  declare nombreUsuario: string;
  declare apellidoUsuario: string;
  declare correoUsuario: string;
  declare claveUsuario: string;
  declare departamentoUsuario: string;
  declare plantaUsuario: string;
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
    apellidoUsuario: {
      type: DataTypes.STRING(65),
      allowNull: true
    },
    correoUsuario: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    claveUsuario: {
      type: new DataTypes.STRING(25),
      allowNull: true,
    },
    departamentoUsuario: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    plantaUsuario: {
      type: new DataTypes.STRING(255),
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
