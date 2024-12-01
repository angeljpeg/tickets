import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Cita } from "../components/Cita";
import { CiFilter } from "react-icons/ci";

import { getAllCitas, getCitaByUser } from "../api/citas.js";

export function AppointmentUI() {
  const { user } = useContext(UserContext);
  const [citas, setCitas] = useState([]);
  const [totalCitas, setTotalCitas] = useState(0);
  const [modals, setModals] = useState({
    filter: false,
  });

  // Función para alternar visibilidad de modales
  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let response;
        if (user?.rolUsuario === "Usuario") {
          response = await getCitaByUser(user.idUsuario);
        } else if (user?.rolUsuario === "Administrador") {
          response = await getAllCitas();
        }

        if (response && Array.isArray(response.data.rows)) {
          setCitas(response.data.rows);
          setTotalCitas(response.data.count);
        } else {
          setCitas([]); // Establecer un array vacío si no hay datos válidos
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setCitas([]);
      }
    };

    fetchTickets();
  }, [user]);

  console.log(citas);
  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Citas <span className="text-sm font-extrabold">{totalCitas}</span>
        </p>
      </div>

      {/* Botones de Modales */}
      <div className="absolute flex gap-2 right-6 bottom-4">
        {/* Modal Filter */}
        {user.rolUsuario !== "Usuario" && (
          <button
            className="p-4 transition-all duration-300 ease-in-out rounded-lg hover:bg-golden hover:text-black bg-neutral-950 text-neutral-300"
            onClick={() => toggleModal("addCita", true)}
          >
            <CiFilter className="text-3xl" />
          </button>
        )}
      </div>

      {/* Lista de tickets */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          {citas.map((cita, index) => (
            <Cita cita={cita} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
