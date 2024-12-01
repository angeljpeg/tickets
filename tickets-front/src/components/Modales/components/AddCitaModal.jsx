import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";
import AddCita from "../../forms/AddCita";

export default function AddCitaModal({ handleCloseAddCita, isOpen, ticket }) {

  return (
    <>
      {/* Modal Delete Ticket */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
          isOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between w-full mb-2 h-fit">
            <header className="text-lg font-bold">Agregar Cita</header>
            <HiOutlineX
              onClick={handleCloseAddCita}
              className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
            />
          </div>
          {/* CONTENT */}
          <AddCita handleCloseAddCita={handleCloseAddCita} ticket={ticket} />
        </div>
      </div>
    </>
  );
}

AddCitaModal.propTypes = {
  handleCloseAddCita: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  ticket: PropTypes.object.isRequired,
};
