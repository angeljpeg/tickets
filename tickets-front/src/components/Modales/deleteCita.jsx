import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";
import { deleteCita } from "../../api/citas";

export default function DeleteCita({ handleClose, cita, isOpen }) {

  const handleDelete = async () => {
    const response = await deleteCita(cita.idCita);
    if (response.ok) {
      handleClose();
      alert("Cita eliminado con éxito", "success");
    }
  };
  return (
    <>
      {/* Modal Delete Ticket */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
          isOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      >
        <div
          className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          onClick={handleClose}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between w-full mb-2 h-fit">
            <header className="text-lg font-bold">Eliminar Cita</header>
            <HiOutlineX
              onClick={handleClose}
              className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
            />
          </div>
          {/* CONTENT */}
          <div className="flex flex-col gap-4 p-4">
            <p className="text-lg font-bold">
              ¿Estás seguro de que quieres eliminar este Cita?
            </p>
            <p className="text-sm font-medium">
              ID de la Cita: {cita.idCita}
            </p>
            <p className="text-sm font-medium">
              Título del ticket: {cita.ticket.tituloTicket}
            </p>
          </div>
          {/* FOOTER */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleClose}
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete()}
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-red-600 hover:text-black"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

DeleteCita.propTypes = {
  handleClose: PropTypes.func.isRequired, // Función para cerrar el modal
  cita: PropTypes.object.isRequired, // Objeto del ticket a eliminar
  isOpen: PropTypes.bool.isRequired, // Propiedad que indica si el modal está abierto o cerrado
};
