import { HiOutlineX } from "react-icons/hi";
import PropTypes from "prop-types";

export default function TicketsFilter({ handleClose, handleFilterChange, filters, handleRestartFilters }) {
  return (
    <>
      <div className="flex items-center justify-between w-full mb-2 h-fit">
        <header className="text-lg font-bold">Filtrar tickets</header>
        <HiOutlineX
          onClick={handleClose}
          className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
        />
      </div>
      {/* Filtros */}
      <div className="mb-4">
        {/* Filtro por estado */}
        <p>Estado</p>
        <div className="mb-2">
          <label className="mr-2">
            <input
              type="checkbox"
              value="Completado"
              className="mr-1 bg-neutral-600"
              onChange={(e) =>
                handleFilterChange("estado", [
                  ...(filters.estado.includes(e.target.value)
                    ? filters.estado.filter((p) => p !== e.target.value)
                    : [...filters.estado, e.target.value]),
                ])
              }
            />
            COMPLETADO
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              value="En Proceso"
              className="mr-1 bg-neutral-600"
              onChange={(e) =>
                handleFilterChange("estado", [
                  ...(filters.estado.includes(e.target.value)
                    ? filters.estado.filter((p) => p !== e.target.value)
                    : [...filters.estado, e.target.value]),
                ])
              }
            />
            EN PROCESO
          </label>
          <label>
            <input
              type="checkbox"
              value="Pendiente"
              className="mr-1 bg-neutral-600"
              onChange={(e) =>
                handleFilterChange("estado", [
                  ...(filters.estado.includes(e.target.value)
                    ? filters.estado.filter((p) => p !== e.target.value)
                    : [...filters.estado, e.target.value]),
                ])
              }
            />
            NO REVISADO
          </label>
        </div>
        {/* Filtro por prioridad */}
        <p>Prioridad</p>
        <div className="mb-2">
          <label className="mr-2">
            <input
              type="checkbox"
              value="1"
              className="mr-1 bg-neutral-600"
              onChange={(e) =>
                handleFilterChange("prioridad", [
                  ...(filters.prioridad.includes(e.target.value)
                    ? filters.prioridad.filter((p) => p !== e.target.value)
                    : [...filters.prioridad, e.target.value]),
                ])
              }
            />
            ALTO
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              value="2"
              className="mr-1 bg-neutral-600"
              onChange={(e) =>
                handleFilterChange("prioridad", [
                  ...(filters.prioridad.includes(e.target.value)
                    ? filters.prioridad.filter((p) => p !== e.target.value)
                    : [...filters.prioridad, e.target.value]),
                ])
              }
            />
            MEDIO
          </label>
          <label>
            <input
              type="checkbox"
              value="3"
              className="mr-1 bg-neutral-600"
              onChange={(e) =>
                handleFilterChange("prioridad", [
                  ...(filters.prioridad.includes(e.target.value)
                    ? filters.prioridad.filter((p) => p !== e.target.value)
                    : [...filters.prioridad, e.target.value]),
                ])
              }
            />
            BAJO
          </label>
        </div>
        {/* Filtro por ID */}
        <p>ID del ticket</p>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="number"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) => {
              console.log(e.target.value);
              handleFilterChange("idTicket", {
                ...filters.idTicket,
                valor: e.target.value,
              });
            }}
          />
        </div>
        {/* Filtro por fecha */}
        <p>Fecha de solicitud</p>
        <div className="flex flex-col gap-2 mb-2">
          <select
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) =>
              handleFilterChange("fechaSolicitud", {
                ...filters.fechaSolicitud,
                operador: e.target.value,
              })
            }
          >
            <option value="">Operador</option>
            <option value=">">Mayor</option>
            <option value="<">Menor</option>
            <option value="=">Igual</option>
            <option value=">=">Mayor o igual</option>
            <option value="<=">Menor o igual</option>
          </select>
          <input
            type="date"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) =>
              handleFilterChange("fechaSolicitud", {
                ...filters.fechaSolicitud,
                valor: e.target.value,
              })
            }
          />
        </div>
        {/* Filtro por hora */}
        <p>Hora de solicitud</p>
        <div className="flex flex-col gap-2 mb-2">
          <select
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) =>
              handleFilterChange("hora", {
                ...filters.hora,
                operador: e.target.value,
              })
            }
          >
            <option value="">Operador</option>
            <option value=">">Mayor</option>
            <option value="<">Menor</option>
            <option value="=">Igual</option>
            <option value=">=">Mayor o igual</option>
            <option value="<=">Menor o igual</option>
          </select>
          <input
            type="time"
            className="p-2 rounded-md outline-none bg-neutral-600"
            onChange={(e) =>
              handleFilterChange("hora", {
                ...filters.hora,
                valor: e.target.value,
              })
            }
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


TicketsFilter.propTypes = {
  handleClose: PropTypes.func.isRequired, // Función para cerrar el modal
  handleFilterChange: PropTypes.func.isRequired, // Función para cambiar el estado del filtro
  filters: PropTypes.object.isRequired, // Objeto con los filtros actuales
  handleRestartFilters: PropTypes.func.isRequired, // Función para reiniciar los filtros    
};