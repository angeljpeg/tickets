import { Ticket } from "../components/Ticket";
import { tickets } from "../components/data/ticketData";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { HiOutlineX } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

export function TicketsUI() {
  const { user, completaTickets, setCompletaTickets } = useContext(UserContext);

  const [filters, setFilters] = useState({
    prioridad: [], // ["ALTO", "MEDIO", "BAJO"]
    estado: [], // ["COMPLETADO", "EN PROCESO", "NO RECIBIDO"]
    idTicket: { valor: "" }, // Ej: ["22"]
    fechaSolicitud: { operador: "", valor: "" }, // Ej: { operador: ">", valor: "2024-09-01" }
    hora: { operador: "", valor: "" }, // Ej: { operador: "<", valor: "15:00" }
  });

  /*   const [completaTickets, setCompletaTickets] = useState([...tickets]); */
  const [filteredTickets, setFilteredTickets] = useState([...tickets]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Actualizar los filtros
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...completaTickets];
    let noResults = false; // Nueva bandera

    //console.log("Original tickets:", filtered);

    // Filtrar por usuario actual
    if (user.role == "user") {
      filtered = filtered.filter((ticket) => ticket.fk_idUsuario === user.id);
    } else if (user.role == "tech") {
      //console.log("Filtro de técnico");
      filtered = filtered.filter((ticket) => ticket.fk_idTecnico === user.id);
    }

    // Filtrar por prioridad
    if (filters.prioridad.length > 0) {
      filtered = filtered.filter((ticket) =>
        filters.prioridad.includes(ticket.prioridad)
      );
      //console.log("Después de filtrar por prioridad:", filtered);
    }

    // Filtrar por ID
    console.log("Antes de filtrar por ID");
    if (filters.idTicket.valor) {
      const filterID = filters.idTicket.valor;
      console.log("El ID seleccionado fue " + filterID);
      filtered = filtered.filter((ticket) => filterID == ticket.id);
      console.log("Después de filtrar por ID:", filtered);
    }

    // Filtrar por estado
    if (filters.estado.length > 0) {
      filtered = filtered.filter((ticket) =>
        filters.estado.includes(ticket.estado)
      );
      //console.log("Después de filtrar por estado:", filtered);
    }

    // Filtrar por fecha de solicitud
    if (filters.fechaSolicitud.operador && filters.fechaSolicitud.valor) {
      const filterDate = new Date(filters.fechaSolicitud.valor);
      filtered = filtered.filter((ticket) => {
        const ticketDate = new Date(ticket.fechaSolicitud.split(" ")[0]);
        switch (filters.fechaSolicitud.operador) {
          case ">":
            return ticketDate > filterDate;
          case "<":
            return ticketDate < filterDate;
          case "=":
            return ticketDate.getTime() === filterDate.getTime();
          case ">=":
            return ticketDate >= filterDate;
          case "<=":
            return ticketDate <= filterDate;
          default:
            return true;
        }
      });
      //console.log("Después de filtrar por fechaSolicitud:", filtered);
    }

    // Filtrar por hora
    if (filters.hora.operador && filters.hora.valor) {
      const filterTime = filters.hora.valor.split(":").map(Number);
      filtered = filtered.filter((ticket) => {
        const ticketTime = ticket.fechaSolicitud
          .split(" ")[1]
          .split(":")
          .map(Number);
        const ticketDateObj = new Date();
        const filterDateObj = new Date();

        ticketDateObj.setHours(ticketTime[0], ticketTime[1], ticketTime[2]);
        filterDateObj.setHours(filterTime[0], filterTime[1], 0);

        switch (filters.hora.operador) {
          case ">":
            return ticketDateObj > filterDateObj;
          case "<":
            return ticketDateObj < filterDateObj;
          case "=":
            return ticketDateObj.getTime() === filterDateObj.getTime();
          case ">=":
            return ticketDateObj >= filterDateObj;
          case "<=":
            return ticketDateObj <= filterDateObj;
          default:
            return true;
        }
      });
      //console.log("Después de filtrar por hora:", filtered);
    }
    // Verifica si no hay resultados
    noResults = filtered.length === 0;
    //console.log(noResults)
    setNoResults(noResults); // Nuevo estado para manejar la bandera

    setFilteredTickets(filtered);
    //console.log("Filtered tickets:", filtered);
    setIsModalFilterVisible(false);
  };

  const [noResults, setNoResults] = useState(false);

  const [isModalFilterVisible, setIsModalFilterVisible] = useState(false);

  const [isModalAddTicketVisible, setIsModalAddTicketVisible] = useState(false);

  const handleClose = () => {
    setIsModalFilterVisible(false);
  };

  const handleCloseAddTicket = (event) => {
    event.preventDefault();
    setIsModalAddTicketVisible(false);
  };

  const handleAddTicket = (event) => {
    event.preventDefault();
    // Crear un nuevo ticket
    const fechaSolicitud = new Date();

    // Obtenemos los componentes de la fecha y la hora
    const dia = String(fechaSolicitud.getDate()).padStart(2, "0"); // Día con dos dígitos
    const mes = String(fechaSolicitud.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos
    const año = String(fechaSolicitud.getFullYear()).slice(-2); // Últimos dos dígitos del año
    const hora = String(fechaSolicitud.getHours()).padStart(2, "0"); // Hora con dos dígitos
    const minutos = String(fechaSolicitud.getMinutes()).padStart(2, "0"); // Minutos con dos dígitos
    const segundos = String(fechaSolicitud.getSeconds()).padStart(2, "0"); // Segundos con dos dígitos

    // Concatenamos todo en el formato deseado
    const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

    const newTicket = {
      id: filteredTickets.length + 1,
      titulo: title,
      estado: "NO REVISADO",
      prioridad: null,
      fechaSolicitud: fechaFormateada,
      fechaFinalizado: null,
      descripcion: description,
      fk_idUsuario: user.id,
      fk_idTecnico: null,
    };
    /* console.log(newTicket); */
    // Limpiar los campos de entrada después de agregar el ticket
    setTitle("");
    setDescription("");
    // Actualizar el arreglo de tickets
    setCompletaTickets([...completaTickets, newTicket]);
    setFilteredTickets([...completaTickets, newTicket]);
    /* console.log(completaTickets); */
    setIsModalAddTicketVisible(false);
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Tickets
        </p>
      </div>

      {/* Botones: Filtrar y Agregar ticket */}
      <div className="absolute flex gap-2 right-6 bottom-4">
        <button
          className="p-4 transition-all duration-300 ease-in-out rounded-lg hover:bg-golden hover:text-black right-6 bottom-4 bg-neutral-950 w-fit h-fit text-neutral-300"
          onClick={() => setIsModalFilterVisible(true)}
        >
          <CiFilter className="text-3xl" />
        </button>
        <button
          onClick={() => setIsModalAddTicketVisible(true)}
          className="p-4 transition-all duration-300 ease-in-out rounded-lg hover:bg-golden hover:text-black right-6 bottom-4 bg-neutral-950 w-fit h-fit text-neutral-300"
        >
          <IoIosAdd className="text-3xl" />
        </button>
      </div>

      {/* Modal Add ticket */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
          isModalAddTicketVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: isModalAddTicketVisible ? "auto" : "none" }} // Opcional: evita clics cuando está oculto
      >
        <div
          className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
            isModalAddTicketVisible ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2 h-fit">
            <header className="text-lg font-bold">Agregar ticket</header>
            <HiOutlineX
              onClick={handleCloseAddTicket}
              className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
            />
          </div>
          <form>
            <div className="p-2 mb-2 h-fit">
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
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCloseAddTicket}
                className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
              >
                Cancelar
              </button>
              <button
                className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
                onClick={handleAddTicket}
              >
                Agregar ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal filtrar tickets */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
          isModalFilterVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: isModalFilterVisible ? "auto" : "none" }} // Opcional: evita clics cuando está oculto
      >
        <div
          className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
            isModalFilterVisible ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2 h-fit">
            <header className="text-lg font-bold">Filtrar tickets</header>
            <HiOutlineX
              onClick={handleClose}
              className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
            />
          </div>
          {/* Filtros */}
          <div className="mb-4">
            {/* Filtro por estado */}
            <p>Estado</p>
            <div className="mb-2">
              <label className="mr-2">
                <input
                  type="checkbox"
                  value="COMPLETADO"
                  className="mr-1 bg-neutral-600"
                  onChange={(e) =>
                    handleFilterChange("estado", [
                      ...(filters.estado.includes(e.target.value)
                        ? filters.estado.filter((p) => p !== e.target.value)
                        : [...filters.estado, e.target.value]),
                    ])
                  }
                />
                COMPLETADO
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  value="EN PROCESO"
                  className="mr-1 bg-neutral-600"
                  onChange={(e) =>
                    handleFilterChange("estado", [
                      ...(filters.estado.includes(e.target.value)
                        ? filters.estado.filter((p) => p !== e.target.value)
                        : [...filters.estado, e.target.value]),
                    ])
                  }
                />
                EN PROCESO
              </label>
              <label>
                <input
                  type="checkbox"
                  value="NO REVISADO"
                  className="mr-1 bg-neutral-600"
                  onChange={(e) =>
                    handleFilterChange("estado", [
                      ...(filters.estado.includes(e.target.value)
                        ? filters.estado.filter((p) => p !== e.target.value)
                        : [...filters.estado, e.target.value]),
                    ])
                  }
                />
                NO REVISADO
              </label>
            </div>
            {/* Filtro por prioridad */}
            <p>Prioridad</p>
            <div className="mb-2">
              <label className="mr-2">
                <input
                  type="checkbox"
                  value="ALTO"
                  className="mr-1 bg-neutral-600"
                  onChange={(e) =>
                    handleFilterChange("prioridad", [
                      ...(filters.prioridad.includes(e.target.value)
                        ? filters.prioridad.filter((p) => p !== e.target.value)
                        : [...filters.prioridad, e.target.value]),
                    ])
                  }
                />
                ALTO
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  value="MEDIO"
                  className="mr-1 bg-neutral-600"
                  onChange={(e) =>
                    handleFilterChange("prioridad", [
                      ...(filters.prioridad.includes(e.target.value)
                        ? filters.prioridad.filter((p) => p !== e.target.value)
                        : [...filters.prioridad, e.target.value]),
                    ])
                  }
                />
                MEDIO
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BAJO"
                  className="mr-1 bg-neutral-600"
                  onChange={(e) =>
                    handleFilterChange("prioridad", [
                      ...(filters.prioridad.includes(e.target.value)
                        ? filters.prioridad.filter((p) => p !== e.target.value)
                        : [...filters.prioridad, e.target.value]),
                    ])
                  }
                />
                BAJO
              </label>
            </div>
            {/* Filtro por ID */}
            <p>ID del ticket</p>
            <div className="flex flex-col gap-2 mb-2">
              <input
                type="number"
                className="p-2 rounded-md outline-none bg-neutral-600"
                onChange={(e) => {
                  console.log(e.target.value);
                  handleFilterChange("idTicket", {
                    ...filters.idTicket,
                    valor: e.target.value,
                  });
                }}
              />
            </div>
            {/* Filtro por fecha */}
            <p>Fecha de solicitud</p>
            <div className="flex flex-col gap-2 mb-2">
              <select
                className="p-2 rounded-md outline-none bg-neutral-600"
                onChange={(e) =>
                  handleFilterChange("fechaSolicitud", {
                    ...filters.fechaSolicitud,
                    operador: e.target.value,
                  })
                }
              >
                <option value="">Operador</option>
                <option value=">">Mayor</option>
                <option value="<">Menor</option>
                <option value="=">Igual</option>
                <option value=">=">Mayor o igual</option>
                <option value="<=">Menor o igual</option>
              </select>
              <input
                type="date"
                className="p-2 rounded-md outline-none bg-neutral-600"
                onChange={(e) =>
                  handleFilterChange("fechaSolicitud", {
                    ...filters.fechaSolicitud,
                    valor: e.target.value,
                  })
                }
              />
            </div>
            {/* Filtro por hora */}
            <p>Hora de solicitud</p>
            <div className="flex flex-col gap-2 mb-2">
              <select
                className="p-2 rounded-md outline-none bg-neutral-600"
                onChange={(e) =>
                  handleFilterChange("hora", {
                    ...filters.hora,
                    operador: e.target.value,
                  })
                }
              >
                <option value="">Operador</option>
                <option value=">">Mayor</option>
                <option value="<">Menor</option>
                <option value="=">Igual</option>
                <option value=">=">Mayor o igual</option>
                <option value="<=">Menor o igual</option>
              </select>
              <input
                type="time"
                className="p-2 rounded-md outline-none bg-neutral-600"
                onChange={(e) =>
                  handleFilterChange("hora", {
                    ...filters.hora,
                    valor: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleClose}
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
            >
              Cancelar
            </button>
            <button
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
              onClick={applyFilters}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de tickets */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          {noResults ? (
            <p className="text-neutral-500">
              Ningún ticket coincide con los filtros aplicados.
            </p>
          ) : (
            filteredTickets.map((ticket, index) =>
              user.role === "admin" || user.role === "secre" ? (
                <Ticket key={index} ticket={ticket} />
              ) : user.role === "user" ? (
                user.id == ticket.fk_idUsuario && (
                  <Ticket key={index} ticket={ticket} />
                )
              ) : (
                user.role === "tech" &&
                user.id == ticket.fk_idTecnico && (
                  <Ticket key={index} ticket={ticket} />
                )
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
