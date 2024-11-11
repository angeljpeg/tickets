import { Puesto } from "./Puestos.model";
import { Usuario } from "./Usuarios.model";

Usuario.belongsTo(Puesto, { foreignKey: "puestoUsuario" });
Puesto.hasMany(Usuario, { foreignKey: "puestoUsuario" });

export { Puesto, Usuario };
