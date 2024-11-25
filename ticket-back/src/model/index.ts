import { Puesto } from "./Puestos.model";
import { Usuario } from "./Usuarios.model";
import { Ticket } from "./Tickets.model";

// USUARIOS - PUESTOS
Usuario.belongsTo(Puesto, { foreignKey: "puestoUsuario" });
Puesto.hasMany(Usuario, { foreignKey: "puestoUsuario" });

// USUARIOS - TICKETS
Usuario.hasMany(Ticket, {
  foreignKey: "idUsuario", // Llave foránea en Ticket
  as: "tickets", // Alias para acceder a los tickets de un usuario
});

Ticket.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuario",
});

export { Puesto, Usuario, Ticket };
