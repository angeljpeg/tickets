import { useState, useEffect, useMemo, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import UserContext from "../context/UserContext";
import { Ticket } from "../components/Ticket";
import { ticketsByUser, allTickets } from "../api/tickets.fetch";
import AddTicket from "../components/forms/AddTicket";
import FilterTicket from "../components/Modales/TicketsFilter";

export function TicketsUI() {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [filters, setFilters] = useState({
    prioridad: [],
    estado: [],
    idTicket: { valor: "" },
    fechaSolicitud: { operador: "", valor: "" },
    hora: { operador: "", valor: "" },
  });
  const [modals, setModals] = useState({
    filter: false,
    addTicket: false,
    deleteTicket: false,
  });

  // Función para alternar visibilidad de modales
  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  // Manejo de filtros
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Cerrar modal de agregar ticket
  const handleCloseAddTicket = () => toggleModal("addTicket", false);

  // Cerrar modal de filtros
  const handleCloseFilter = () => toggleModal("filter", false);

  // Reiniciar filtros
  const handleRestartFilters = () => {
    setFilters({
      prioridad: [],
      estado: [],
      idTicket: { valor: "" },
      fechaSolicitud: { operador: "", valor: "" },
      hora: { operador: "", valor: "" },
    });
    toggleModal("filter", false);
  };

  // Funciones para filtrar tickets
  const filterByOperator = (ticketValue, operator, filterValue) => {
    switch (operator) {
      case ">":
        return ticketValue > filterValue;
      case "<":
        return ticketValue < filterValue;
      case "=":
        return ticketValue === filterValue;
      case ">=":
        return ticketValue >= filterValue;
      case "<=":
        return ticketValue <= filterValue;
      default:
        return true;
    }
  };

  const filteredTickets = useMemo(() => {
    let filtered = [...tickets];

    // Filtrar por prioridad
    if (filters.prioridad.length > 0) {
      filtered = filtered.filter((ticket) =>
        filters.prioridad.includes(ticket.prioridadTicket)
      );
    }

    // Filtrar por estado
    if (filters.estado.length > 0) {
      filtered = filtered.filter((ticket) =>
        filters.estado.includes(ticket.statusTicket)
      );
    }

    // Filtrar por ID del ticket
    if (filters.idTicket.valor) {
      filtered = filtered.filter(
        (ticket) => ticket.idTicket === parseInt(filters.idTicket.valor, 10)
      );
    }

    // Filtrar por fecha de solicitud
    if (filters.fechaSolicitud.valor) {
      filtered = filtered.filter((ticket) =>
        filterByOperator(
          new Date(ticket.fechaSolicitadoTicket).toISOString().split("T")[0],
          filters.fechaSolicitud.operador,
          filters.fechaSolicitud.valor
        )
      );
    }

    // Filtrar por hora de solicitud
    if (filters.hora.valor) {
      filtered = filtered.filter((ticket) =>
        filterByOperator(
          new Date(ticket.fechaSolicitadoTicket)
            .toISOString()
            .split("T")[1]
            .slice(0, 5),
          filters.hora.operador,
          filters.hora.valor
        )
      );
    }

    return filtered;
  }, [tickets, filters]);

  // Cargar tickets del usuario al montar el componente
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let response;
        if (user?.rolUsuario === "Usuario") {
          response = await ticketsByUser(user?.idUsuario);
        } else if (user?.rolUsuario === "Administrador") {
          response = await allTickets();
        }

        if (response && Array.isArray(response.data.rows)) {
          setTickets(response.data.rows);
          setTotalTickets(response.data.count);
        } else {
          setTickets([]); // Establecer un array vacío si no hay datos válidos
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setTickets([]); // En caso de error, evitar que tickets sea undefined
      }
    };

    fetchTickets();
  }, [user]);

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Tickets <span className="text-sm font-extrabold">{totalTickets}</span>
        </p>
      </div>

      {/* Botones de Modales */}
      <div className="absolute flex gap-2 right-6 bottom-4">
        {/* Modal Filter */}
        {user.rolUsuario !== "Usuario" && (
          <button
            className="p-4 transition-all duration-300 ease-in-out rounded-lg hover:bg-golden hover:text-black bg-neutral-950 text-neutral-300"
            onClick={() => toggleModal("filter", true)}
          >
            <CiFilter className="text-3xl" />
          </button>
        )}
        {/* Modal Add Ticket */}
        <button
          className="p-4 transition-all duration-300 ease-in-out rounded-lg hover:bg-golden hover:text-black bg-neutral-950 text-neutral-300"
          onClick={() => toggleModal("addTicket", true)}
        >
          <IoIosAdd className="text-3xl" />
        </button>
      </div>

      {/* Modal Agregar Ticket */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
          modals.addTicket ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
            modals.addTicket ? "scale-100" : "scale-95"
          }`}
        >
          <AddTicket handleCloseAddTicket={handleCloseAddTicket} />
        </div>
      </div>

      {/* Modal Filtrat Ticket */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
          modals.filter ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
            modals.filter ? "scale-100" : "scale-95"
          }`}
        >
          <FilterTicket
            handleClose={handleCloseFilter}
            handleFilterChange={handleFilterChange}
            handleRestartFilters={handleRestartFilters}
            filters={filters}
          />
        </div>
      </div>

      {/* Listado de Tickets */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          {filteredTickets.map((ticket) => (
            <Ticket key={ticket.idTicket} ticket={ticket} toggleModal={toggleModal} />
          ))}
        </div>
      </div>
    </div>
  );
}
