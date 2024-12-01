import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";
import { completeCita } from "../../../api/citas.js";
import {useState} from 'react'

export default function CompletedCita({ handleCloseCita, isOpen, cita, user }) {
  const [error, setError] = useState(undefined);
  
  const handleCompleteCita = async (status) => {
    try {
      let response;
      if (status) {
        response = await completeCita({
          idCita: cita.idCita,
          idUsuario: user,
          newStatus: "Completado",
        });
      }
      else {
        response = await completeCita({
          idCita: cita.idCita,
          idUsuario: user,
          newStatus: "No Completado",
        });
      }

      if (response.ok) {
        alert("Cita completada con éxito");
        handleCloseCita();
      } else {
        console.error("Error al completar cita:", response);
        setError(response.message);
      }
    } catch (error) {
      console.error("Error al completar cita:", error);
    }
  };

  return (
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
        <div className="flex items-center justify-between w-full mb-2 h-fit">
          <header className="text-lg font-bold">Completar Cita</header>
          <HiOutlineX
            onClick={handleCloseCita}
            className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
          />
        </div>
        {/* CONTENT */}
        <div className="text-center mb-4">
            <p>¿Completar cita?</p>
            {
              error && <p className="text-red-500">{error}</p>
            }
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleCloseCita}
            className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => handleCompleteCita(false)}
            className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-red-600 hover:text-black"
          >
            No Completada
          </button>
          <button
            type="button"
            onClick={() => handleCompleteCita(true)}
            className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-green-600 hover:text-black"
          >
            Completada
          </button>
        </div>
      </div>
    </div>
  );
}

CompletedCita.propTypes = {
  handleCloseCita: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  cita: PropTypes.object.isRequired,
  user: PropTypes.number.isRequired,
};
