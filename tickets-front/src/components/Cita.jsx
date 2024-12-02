import PropTypes from "prop-types";
import dayjs from "dayjs";
import UserContext from "../context/UserContext";
import { IoCheckboxOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import CompletedCita from "./Modales/components/CompletedCita";
import DeleteCita from "./Modales/deleteCita";

export function Cita({ cita }) {
  const { user } = useContext(UserContext);

  const [modals, setModals] = useState({
    completedCita: false,
    deleteCita: false,
  });

  // Función para alternar visibilidad de modales
  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  // Cerrar modal de completed cita
  const handleCloseModalCompleteCita = () =>
    toggleModal("completedCita", false);

  const handleCloseDeleteCita = () => toggleModal("deleteCita", false);

  const priorityColors = {
    1: "text-red-500",
    2: "text-yellow-500",
    3: "text-green-500",
  };

  const priorityText = {
    1: "Alto",
    2: "Medio",
    3: "Bajo",
  };

  const fechaSolicitud = dayjs(cita.fechaInicioCita);

  const isDisabled =
    cita.ticket.statusTicket === "Completado" ||
    cita.ticket.statusTicket === "No Completado";

  return (
    <div
      className={`flex flex-col w-full p-4 bg-neutral-800 rounded-xl h-full`}
    >
      <DeleteCita
        handleClose={handleCloseDeleteCita}
        cita={cita}
        isOpen={modals.deleteCita}
      />
      <CompletedCita
        isOpen={modals.completedCita}
        handleCloseCita={handleCloseModalCompleteCita}
        cita={cita}
        user={user.idUsuario}
      />
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-xl font-semibold">
          Cita{" "}
          <span className="text-lg font-medium text-neutral-500">
            #{cita.idCita}
          </span>
        </h2>
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-2">
            {user.rolUsuario === "Tecnico" && (
              <IoCheckboxOutline
                className={`text-2xl transition-all ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:text-golden hover:scale-110"
                }`}
                onClick={() => {
                  if (!isDisabled) {
                    toggleModal("completedCita", true);
                  }
                }}
              />
            )}
            {user.rolUsuario == "Administrador" && (
              <RiDeleteBin6Line
                className="text-2xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer hover:scale-110"
                onClick={() => toggleModal("deleteCita", true)}
              />
            )}
          </div>
        </div>
      </div>
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
        {
          <p>
            {cita.tecnicos.map(({ idUsuario: id }) => (
              <span key={id}>#{id} </span>
            ))}
          </p>
        }
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
