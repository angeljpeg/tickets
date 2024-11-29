import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Modal } from "../Modal";

export function EditarTicketModal({ ticket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [fechaFinalizado, setFechaFinalizado] = useState("");
  const [prioridadTicket, setPrioridadTicket] = useState("");
  const [estadoTicket, setEstadoTicket] = useState("");

  const getEstadoClase = (prioridad) => {
    switch (prioridad) {
      case "ALTO":
        return "bg-red-500 hover:bg-red-400";
      case "MEDIO":
        return "bg-yellow-500 hover:bg-yellow-400";
      case "BAJO":
        return "bg-green-500 hover:bg-green-400";
      default:
        return "bg-neutral-700 hover:bg-neutral-400";
    }
  };

  useEffect(() => {
    setTitle(ticket.titulo || "");
    setPrioridadTicket(ticket.prioridad || "");
    setEstadoTicket(ticket.estado || "");
    setDescription(ticket.descripcion || "");

    let fechaSolicitud = ticket.fechaSolicitud;
    let fechaFinalizado = ticket.fechaFinalizado;

    const formatFecha = (fecha) => {
      const [dia, mes, anioHora] = fecha.split("-");
      const [anioAbreviado, hora] = anioHora.split(" ");
      const anioCompleto = `20${anioAbreviado}`;
      return `${anioCompleto}-${mes}-${dia}T${hora.slice(0, 5)}`;
    };

    setFechaSolicitud(
      fechaSolicitud != null ? formatFecha(fechaSolicitud) : ""
    );
    setFechaFinalizado(
      fechaFinalizado != null ? formatFecha(fechaFinalizado) : ""
    );
  }, [ticket]);

  const handleEditTicket = () => {
    alert("Se editó el ticket");
  };

  // Memoiza el contenido del cuerpo del modal
  const modalBody = useMemo(() => {
    return (
      <>
        <p className="mb-2">Prioridad</p>
        <select
          className={`p-2 mb-2 text-black cursor-pointer rounded-md transition-all duration-300 ease-in-out outline-none w-full ${getEstadoClase(
            prioridadTicket
          )}`}
          value={prioridadTicket}
          onChange={(e) => setPrioridadTicket(e.target.value)}
        >
          <option value="ALTO">ALTO</option>
          <option value="MEDIO">MEDIO</option>
          <option value="BAJO">BAJO</option>
        </select>
        <p className="mb-2">Estado</p>
        <select
          className={`p-2 mb-2 bg-neutral-600 hover:bg-neutral-500 cursor-pointer rounded-md transition-all duration-300 ease-in-out outline-none w-full`}
          value={estadoTicket}
          onChange={(e) => setEstadoTicket(e.target.value)}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="EN PROCESO">EN PROCESO</option>
          <option value="NO REVISADO">NO REVISADO</option>
        </select>
        <p className="mb-2">Título del problema</p>
        <input
          value={title}
          className="w-full px-4 py-2 mb-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700"
          type="text"
          placeholder="Problema en la impresora"
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="mb-2">Descripción del problema</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-[200px] px-4 py-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700 resize-none"
          placeholder="La impresora no quiere encender"
        ></textarea>
        <p className="mb-2">Fecha Solicitud</p>
        <input
          value={fechaSolicitud}
          className="w-full px-4 py-2 mb-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700"
          type="datetime-local"
          onChange={(e) => setFechaSolicitud(e.target.value)}
        />
        <p className="mb-2">Fecha finalizado</p>
        <input
          value={fechaFinalizado}
          className="w-full px-4 py-2 mb-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700"
          type="datetime-local"
          onChange={(e) => setFechaFinalizado(e.target.value)}
        />
      </>
    );
  }, [
    title,
    description,
    prioridadTicket,
    estadoTicket,
    fechaSolicitud,
    fechaFinalizado,
  ]);

  return (
    <Modal
      title={"Editar ticket"}
      btnCancelText={"Cancelar"}
      btnActionText={"Guardar"}
      btnActionFunction={handleEditTicket}
      modalBody={modalBody}
      objetoModal={ticket}
    />
  );
}

EditarTicketModal.propTypes = {
  ticket: PropTypes.object,
};
