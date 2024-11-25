import { Puesto } from "./Puestos.model";
import { Usuario } from "./Usuarios.model";
import { Ticket } from "./Tickets.model";
import { Cita, TecnicoCita } from "./Citas.model";

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

// TICKETS - CITAS
// Relación con Ticket
Cita.belongsTo(Ticket, { foreignKey: "idTicket", as: "ticket" });
Ticket.hasOne(Cita, { foreignKey: "idTicket", as: "cita" });

// USUARIOS - CITAS
Cita.belongsToMany(Usuario, { through: TecnicoCita, foreignKey: "idCita", as: "tecnicos" });
Usuario.belongsToMany(Cita, { through: TecnicoCita, foreignKey: "idUsuario", as: "citas" });

export { Puesto, Usuario, Ticket, Cita, TecnicoCita };
