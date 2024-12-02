import PropTypes from "prop-types";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import DeleteTicket from "../components/Modales/deleteTicket";
import { BiBookAdd } from "react-icons/bi";

import dayjs from "dayjs";
import AddCitaModal from "./Modales/components/AddCitaModal";
import { EditarTicket } from "./forms/EditTicket";

export function Ticket({ ticket }) {
  const {
    user,
  } = useContext(UserContext);

  const [modals, setModals] = useState({
    editTicket: false,
    deleteTicket: false,
    addCita: false,
  });

  // Función para alternar visibilidad de modales
  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  // Cerrar modal de editar ticket
  //const handleCloseEditTicket = () => toggleModal("editTicket", false);

  // Cerrar modal de delete  ticket
  const handleCloseDeleteTicket = () => toggleModal("deleteTicket", false);
  // Cerrar modal de delete  Cita
  const handleCloseDeleteCita = () => toggleModal("addCita", false);
  // Cerrar modal de editar ticket
  const handleCloseEditTicket = () => toggleModal("editTicket", false);

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

  const stateIcons = {
    COMPLETADO: <FaRegCheckCircle className="text-xl" />,
    "EN PROCESO": <MdAccessTime className="text-2xl" />,
    "NO REVISADO": <FaRegTimesCircle className="text-xl" />,
    "NO COMPLETADO": <FaRegTimesCircle className="text-xl" />,
  };

  const fechaSolicitud = dayjs(ticket.fechaSolicitudTicket);

  const isDisabled =
    ticket.statusTicket === "Completado" ||
    ticket.statusTicket === "No Completado";

  return (
    <>
      <div
        className={`flex flex-col w-full p-4 bg-neutral-800 rounded-xl h-full`}
      >
        {/* Modal Edit ticket */}
        <EditarTicket
          handleClose={handleCloseEditTicket}
          ticket={ticket}
          isOpen={modals.editTicket}
        />
        <DeleteTicket
          handleClose={handleCloseDeleteTicket}
          ticket={ticket}
          isOpen={modals.deleteTicket}
        />
        <AddCitaModal
          ticket={ticket}
          handleCloseAddCita={handleCloseDeleteCita}
          isOpen={modals.addCita}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center w-full">
            <h2 className="text-xl font-semibold">
              {ticket.tituloTicket}{" "}
              <span className="text-lg font-medium text-neutral-500">
                #{ticket.idTicket}
              </span>
            </h2>
          </div>
          {(user.rolUsuario === "Administrador" ||
            user.rolUsuario === "Secretario") && (
            <div className="flex items-center gap-2">
              <BiBookAdd
                className={`text-2xl transition-all ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:text-golden hover:scale-110 cursor-pointer"
                }`}
                onClick={() => {
                  if (!isDisabled) {
                    toggleModal("addCita", true);
                  }
                }}
              />
              {user.rolUsuario === "Administrador" && (
                <>
                  <RiDeleteBin6Line
                    className="text-2xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer hover:scale-110"
                    onClick={() => toggleModal("deleteTicket", true)}
                  />
                  <TbEdit
                    className="text-2xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer hover:scale-110"
                    onClick={() => toggleModal("editTicket", true)}
                  />
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 mb-4 lg:grid-cols-4 md:grid-cols-2">
          <div className="p-4 rounded-lg bg-neutral-700">
            <p>Prioridad</p>
            <p
              className={`text-2xl font-semibold ${
                priorityColors[ticket.prioridadTicket] || "text-neutral-300"
              }`}
            >
              {ticket.prioridadTicket == null
                ? "SIN ASIGNAR"
                : priorityText[ticket.prioridadTicket]}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-neutral-700">
            <p>Estado</p>
            <div className="flex items-center gap-2">
              {stateIcons[ticket.statusTicket]}
              <p> {ticket.statusTicket}</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-neutral-700">
            <p>Fecha solicitud</p>
            <p>{fechaSolicitud.format("DD/MM/YYYY HH:mm")}</p>
          </div>
          <div className="p-4 rounded-lg bg-neutral-700">
            <p>Fecha finalizado</p>
            <p>
              {ticket.fechaFinalizadoTicket == null
                ? "No finalizado"
                : dayjs(ticket.fechaFinalizadoTicket).format("DD/MM/YYYY")}
            </p>
          </div>
          <div
            className={`p-4 col-span-${
              user.rolUsuario == "Administrador" ? 2 : "full"
            } rounded-lg bg-neutral-700`}
          >
            <p>Descripción</p>
            <p>{ticket.descripcionTicket}</p>
          </div>
          {user.rolUsuario == "Administrador" && (
            <div className="p-4 col-span-2 rounded-lg bg-neutral-700">
              <p>Usuario</p>
              <p>
                {ticket.usuario.nombreUsuario} {ticket.usuario.apellidoUsuario}
              </p>
              <p>{ticket.usuario.emailUsuario}</p>
              <p>
                Puesto #{ticket.usuario.puestoUsuario}:{" "}
                {ticket.usuario.Puesto.nombrePuesto}
              </p>
              <p>
                Departamento: {ticket.usuario.departamentoUsuario},{" "}
                {ticket.usuario.plantaUsuario}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object,
};
