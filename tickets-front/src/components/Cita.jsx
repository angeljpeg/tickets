import PropTypes from "prop-types";
import dayjs from "dayjs";

export function Cita({ cita }) {
  const priorityColors = {
    ALTO: "text-red-500",
    MEDIO: "text-yellow-500",
    BAJO: "text-green-500",
  };

  const priorityText = {
    1: "Alto",
    2: "Medio",
    3: "Bajo",
  };

  const fechaSolicitud = dayjs(cita.fechaInicioCita);

  return (
    <div
      className={`flex flex-col w-full p-4 bg-neutral-800 rounded-xl h-full`}
    >
      <h2 className="mb-4 text-xl font-semibold">
        Cita{" "}
        <span className="text-lg font-medium text-neutral-500">
          #{cita.idCita}
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-2 mb-4 lg:grid-cols-4 md:grid-cols-2">
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Prioridad</p>
          <p
            className={`text-2xl font-semibold ${
              priorityColors[cita.ticket.prioridadTicket] || "text-neutral-300"
            }`}
          >
            {cita.ticket.prioridadTicket == null
              ? "SIN ASIGNAR"
              : priorityText[cita.ticket.prioridadTicket]}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>ID Ticket</p>
          <div className="flex items-center gap-2">
            <p>{cita.idTicket}</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Fecha Inicio</p>
          <p>{fechaSolicitud.format("DD/MM/YYYY HH:mm")}</p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Fecha finalizado</p>
          <p>
          {cita.fechaFinCita == null
                ? "No finalizado"
                : dayjs(cita.fechaFinCita).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <div className="p-4 mb-4 rounded-lg bg-neutral-700">
        <p>IDs Técnicos asignados</p>
        <p>{2}</p>
      </div>

      <button className="p-2 transition-all duration-300 rounded-lg w-fit h-fit bg-neutral-600 hover:bg-golden hover:text-black">
        Ver más
      </button>
    </div>
  );
}

Cita.propTypes = {
  cita: PropTypes.object,
};
