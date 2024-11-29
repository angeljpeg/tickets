import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

export function Modal({
  title,
  btnCancelText,
  btnActionText,
  btnActionFunction,
  modalBody,
  objetoModal,
}) {
  const { informationModal, setInformationModal } = useContext(UserContext);

  //Acción que se ejecuta cuando el modal se cierra
  const handleCloseModal = (event) => {
    event.preventDefault();
    setInformationModal({
      mostrar: false,
      title: "",
      objeto: -1,
    });
  };

  //Acción que se ejecuta cuando se da clic en el botón de acción del modal
  const handleEjecuteModalAction = (event) => {
    event.preventDefault();
    btnActionFunction();
  };

  return (
    <div
      className={`fixed inset-0 lg:ml-[300px] flex items-center lg:px-0 md:px-0 px-4 justify-center bg-black/75 transition-opacity duration-300 ${
        informationModal.mostrar && objetoModal.id == informationModal.id
          ? "opacity-100"
          : "opacity-0"
      }`}
      style={{
        pointerEvents:
          informationModal.mostrar && objetoModal.id == informationModal.id
            ? "auto"
            : "none",
      }} // Opcional: evita clics cuando está oculto
    >
      <div
        className={`p-4 rounded-lg lg:max-w-[400px] lg:w-[400px] md:max-w-[350px] md:w-[350px] mx-4 w-full bg-neutral-800 transition-transform duration-300 ${
          informationModal.mostrar && objetoModal.id == informationModal.id
            ? "scale-100"
            : "scale-95"
        }`}
      >
        <div className="flex items-center justify-between w-full mb-2 h-fit">
          <header className="text-lg font-bold">{title}</header>
          <HiOutlineX
            onClick={handleCloseModal}
            className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
          />
        </div>
        <form>
          <div className="p-2 mb-2 max-h-[300px] overflow-y-scroll overflow-hidden">
            {modalBody}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCloseModal}
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
            >
              {btnCancelText}
            </button>
            <button
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
              onClick={handleEjecuteModalAction}
            >
              {btnActionText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  btnCancelText: PropTypes.string,
  btnActionText: PropTypes.string,
  btnActionFunction: PropTypes.func,
  modalBody: PropTypes.element,
  objetoModal: PropTypes.object,
};
