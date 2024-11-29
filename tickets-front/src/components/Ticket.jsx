import PropTypes from "prop-types";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext /* ,useEffect, useState  */ } from "react";
import UserContext from "../context/UserContext";
import { EditarTicketModal } from "./Modales/components/EditarTicketModal";

export function Ticket({ ticket }) {
  const {
    user,
    setInformationModal /* , completaTickets, setCompletaTickets */,
  } = useContext(UserContext);

  const priorityColors = {
    ALTO: "text-red-500",
    MEDIO: "text-yellow-500",
    BAJO: "text-green-500",
  };

  const stateIcons = {
    COMPLETADO: <FaRegCheckCircle className="text-xl" />,
    "EN PROCESO": <MdAccessTime className="text-2xl" />,
    "NO REVISADO": <FaRegTimesCircle className="text-xl" />,
  };

  const objetoModal = {
    mostrar: true,
    title: "Editar tickets",
    id: ticket.id,
  };

  return (
    <div
      className={`flex flex-col w-full p-4 bg-neutral-800 rounded-xl h-full`}
    >
      {/* Modal Edit ticket */}
      <EditarTicketModal ticket={ticket} />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-full">
          <h2 className="text-xl font-semibold">
            {ticket.titulo}{" "}
            <span className="text-lg font-medium text-neutral-500">
              #{ticket.id}
            </span>
          </h2>
        </div>
        {user.role == "admin" && (
          <div className="flex items-center gap-2">
            <TbEdit
              className="text-2xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer hover:scale-110"
              onClick={() => setInformationModal(objetoModal)}
            />
            <RiDeleteBin6Line
              className="text-2xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer hover:scale-110"
              onClick={() =>
                /* setIsModalEditTicketVisible(true) */ alert("Abrir modal")
              }
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 mb-4 lg:grid-cols-4 md:grid-cols-2">
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Prioridad</p>
          <p
            className={`text-2xl font-semibold ${
              priorityColors[ticket.prioridad] || "text-neutral-300"
            }`}
          >
            {ticket.prioridad == null ? "SIN ASIGNAR" : ticket.prioridad}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Estado</p>
          <div className="flex items-center gap-2">
            {stateIcons[ticket.estado]}
            <p> {ticket.estado}</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Fecha solicitud</p>
          <p>{ticket.fechaSolicitud}</p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-700">
          <p>Fecha finalizado</p>
          <p>
            {ticket.fechaFinalizado == null
              ? "No finalizado"
              : ticket.fechaFinalizado}
          </p>
        </div>
      </div>
      <div className="p-4 mb-4 rounded-lg bg-neutral-700">
        <p>Descripción</p>
        <p>{ticket.descripcion}</p>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object,
};
