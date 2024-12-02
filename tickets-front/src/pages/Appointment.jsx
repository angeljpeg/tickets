import { useContext, useState, useEffect, useMemo } from "react";
import UserContext from "../context/UserContext";
import { Cita } from "../components/Cita";
import { CiFilter } from "react-icons/ci";

import { getAllCitas, getCitaByUser, getCitaByTecnico } from "../api/citas.js";
import CitasFilter from "../components/Modales/CitasFilter.jsx";

export function AppointmentUI() {
  const { user } = useContext(UserContext);
  const [citas, setCitas] = useState([]);
  const [totalCitas, setTotalCitas] = useState(0);
  const [modals, setModals] = useState({
    filter: false,
  });
  const [filters, setFilters] = useState({
    idCita: "",
    idTicket: "",
    idTecnico: "",
    idUsuario: "",
    fechaInicioCita: "",
    fechaFinCita: "",
  });

  // Función para alternar visibilidad de modales
  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  const handleCloseFilter = () => toggleModal("filter", false);

  // Reiniciar filtros
  const handleRestartFilters = () => {
    setFilters({
      idCita: "",
      idTicket: "",
      idTecnico: "",
      idUsuario: "",
      fechaInicioCita: "",
      fechaFinCita: "",
    });
    toggleModal("filter", false);
  };

  // Función para manejar el cambio de filtros
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Función auxiliar para operadores
  const filterByOperator = (value, operator, filterValue) => {
    if (!value || !filterValue) return true;
    switch (operator) {
      case ">":
        return value > filterValue;
      case "<":
        return value < filterValue;
      case "=":
        return value === filterValue;
      case ">=":
        return value >= filterValue;
      case "<=":
        return value <= filterValue;
      default:
        return true;
    }
  };

  // Filtrar citas
  const filteredCitas = useMemo(() => {
    let filtered = [...citas];

    if (filters.idCita) {
      filtered = filtered.filter(
        (cita) => cita.idCita === parseInt(filters.idCita, 10)
      );
    }

    if (filters.idTicket) {
      filtered = filtered.filter(
        (cita) => cita.idTicket === parseInt(filters.idTicket, 10)
      );
    }

    if (filters.idTecnico) {
      filtered = filtered.filter((cita) =>
        cita.tecnicos.some(
          (tecnico) => tecnico.idUsuario === parseInt(filters.idTecnico, 10)
        )
      );
    }

    if (filters.idUsuario) {
      filtered = filtered.filter(
        (cita) => cita.ticket.idUsuario === parseInt(filters.idUsuario, 10)
      );
    }

    if (filters.fechaInicioCita) {
      filtered = filtered.filter((cita) =>
        filterByOperator(
          new Date(cita.fechaInicioCita).toISOString().split("T")[0],
          "=",
          filters.fechaInicioCita
        )
      );
    }

    if (filters.fechaFinCita) {
      filtered = filtered.filter((cita) =>
        filterByOperator(
          new Date(cita.fechaFinCita).toISOString().split("T")[0],
          "=",
          filters.fechaFinCita
        )
      );
    }

    return filtered;
  }, [citas, filters]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const totalPages = Math.ceil(filteredCitas.length / ticketsPerPage);

  const visibleTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    return filteredCitas.slice(startIndex, endIndex);
  }, [filteredCitas, currentPage, ticketsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        let response;
        if (user?.rolUsuario === "Usuario") {
          response = await getCitaByUser(user.idUsuario);
        } else if (user?.rolUsuario === "Administrador" || user?.rolUsuario === "Secretario") {
          response = await getAllCitas();
        } else if (user?.rolUsuario === "Tecnico") {
          response = await getCitaByTecnico(user.idUsuario);
        }

        if (response && Array.isArray(response.data.rows)) {
          setCitas(response.data.rows);
          setTotalCitas(response.data.count);
        } else {
          setCitas([]);
        }
      } catch (error) {
        console.error("Error fetching citas:", error);
        setCitas([]);
      }
    };

    fetchCitas();
  }, [user]);

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Citas <span className="text-sm font-extrabold">{totalCitas}</span>
        </p>
      </div>

      {/* Botones de Modales */}
      <div className="absolute flex gap-2 right-6 bottom-4">
        <button
          className="p-4 transition-all duration-300 ease-in-out rounded-lg hover:bg-golden hover:text-black bg-neutral-950 text-neutral-300"
          onClick={() => toggleModal("filter", true)}
        >
          <CiFilter className="text-3xl" />
        </button>
      </div>

      {/* Lista de citas */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          {visibleTickets.map((cita, index) => (
            <Cita cita={cita} key={index} />
          ))}
        </div>
      </div>

      {/* Modal de Filtro */}
      {modals.filter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800">
            <CitasFilter
              handleClose={handleCloseFilter}
              handleFilterChange={handleFilterChange}
              handleRestartFilters={handleRestartFilters}
              filters={filters}
            />
          </div>
        </div>
      )}

      {/* Paginación */}
      <div className="py-4">
        <div className="flex justify-center items-center gap-2">
          <button
            className="px-4 py-2 text-sm bg-neutral-800 text-neutral-300 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>
          <span className="text-neutral-500">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 text-sm bg-neutral-800 text-neutral-300 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
