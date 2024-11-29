import PropTypes from "prop-types";

export function Cita({cita}){
  const priorityColors = {
    ALTO: "text-red-500",
    MEDIO: "text-yellow-500",
    BAJO: "text-green-500",
  };

  return (
    <div
      className={`flex flex-col w-full p-4 bg-neutral-800 rounded-xl h-full`}
    >
      <h2 className="mb-4 text-xl font-semibold">Cita <span className="text-lg font-medium text-neutral-500">#{cita.id}</span></h2>
      <div className="grid grid-cols-1 gap-2 mb-4 lg:grid-cols-4 md:grid-cols-2">
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Prioridad</p>
          <p
            className={`text-2xl font-semibold ${
              priorityColors[cita.prioridadTicket] || "text-neutral-300"
            }`}
          >
            {cita.prioridadTicket}
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
          <p>{cita.fechaInicio}</p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Fecha finalizado</p>
          <p>
            {cita.fechaFin == null
              ? "No finalizado"
              : cita.fechaFin}
          </p>
        </div>
      </div>
      <div className="p-4 mb-4 rounded-lg bg-neutral-700">
        <p>IDs Técnicos asignados</p>
        <p>{cita.idTecnico}</p>
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