import { HiOutlineX } from "react-icons/hi";
import PropTypes from "prop-types";

export default function CitasFilter({ handleClose, handleFilterChange, filters, handleRestartFilters }) {
  return (
    <>
      <div className="flex items-center justify-between w-full mb-2 h-fit">
        <header className="text-lg font-bold">Filtrar citas</header>
        <HiOutlineX
          onClick={handleClose}
          className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
        />
      </div>
      {/* Filtros */}
      <div className="mb-4">
        {/* Filtro por ID de cita */}
        <p>ID de la cita</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="number"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              handleFilterChange("idCita", e.target.value);
            }}
          />
        </div>
        {/* Filtro por ID de ticket */}
        <p>ID del ticket</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="number"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              handleFilterChange("idTicket", e.target.value);
            }}
          />
        </div>
        {/* Filtro por técnico */}
        <p>ID del técnico</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="number"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              handleFilterChange("idTecnico", e.target.value);
            }}
          />
        </div>
        {/* Filtro por usuario */}
        <p>ID del usuario</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="number"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              handleFilterChange("idUsuario", e.target.value);
            }}
          />
        </div>
        {/* Filtro por fecha de inicio */}
        <p>Fecha de inicio</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="date"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              handleFilterChange("fechaInicioCita", e.target.value);
            }}
          />
        </div>
        {/* Filtro por fecha de fin */}
        <p>Fecha de fin</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="date"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              handleFilterChange("fechaFinCita", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleClose}
          className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
        >
          Cancelar
        </button>
        <button
          onClick={handleRestartFilters}
          className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
        >
          Reiniciar Filtros
        </button>
        <button
          className="p-2 col-span-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
          onClick={handleClose}
        >
          Aplicar Filtros
        </button>
      </div>
    </>
  );
}

CitasFilter.propTypes = {
  handleClose: PropTypes.func.isRequired, // Función para cerrar el modal
  handleFilterChange: PropTypes.func.isRequired, // Función para cambiar el estado del filtro
  filters: PropTypes.object.isRequired, // Objeto con los filtros actuales
  handleRestartFilters: PropTypes.func.isRequired, // Función para reiniciar los filtros
};
