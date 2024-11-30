import { useState, useEffect, useMemo, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import UserContext from "../context/UserContext";
import { Ticket } from "../components/Ticket";
import { ticketsByUser, allTickets } from "../api/tickets.fetch";
import AddTicket from "../components/forms/AddTicket";

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
  });

  // Función para alternar visibilidad de modales
  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  // Manejo de filtros
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Aplicar filtros
  const applyFilters = () => {
    toggleModal("filter", false);
  };

  // Cerrar modal de agregar ticket
  const handleCloseAddTicket = () => toggleModal("addTicket", false);

  // Cerrar modal de filtros
  const handleCloseFilter = () => toggleModal("filter", false);

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
    let filtered = Array.isArray(tickets) ? [...tickets] : [];
    // Filtrar por usuario o técnico según el rol
    if (user.rolUsuario === "Usuario") {
      filtered = filtered.filter((ticket) => ticket.idUsuario === user.id);
    } else if (user.rolUsuario === "Tecnico") {
      filtered = filtered.filter((ticket) => ticket.idUsuario === user.id);
    }
    // Otros filtros: prioridad, estado, etc.
    return filtered;
  }, [tickets, user]);

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

  console.log(`${user.rolUsuario}: `, tickets);

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
          content
        </div>
      </div>

      {/* Listado de Tickets */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          {filteredTickets.map((ticket) => (
            <Ticket key={ticket.idTicket} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
