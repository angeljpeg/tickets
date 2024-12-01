import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  parseISO,
} from "date-fns";
import { getAllCitas, getCitaByUser, getCitaByTecnico } from "../api/citas.js";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Para mostrar en el modal
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(UserContext);

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const formatAppointments = (date) =>
    appointments.filter((appt) =>
      isSameDay(parseISO(appt.fechaInicioCita), date)
    );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setIsVisible(true);
    }
  }, [selectedDate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response;
        if (user?.rolUsuario === "Usuario") {
          response = await getCitaByUser(user.idUsuario);
        } else if (user?.rolUsuario === "Administrador") {
          response = await getAllCitas();
        } else if (user?.rolUsuario === "Tecnico") {
          response = await getCitaByTecnico(user.idUsuario);
        }

        if (response && Array.isArray(response.data.rows)) {
          setAppointments(response.data.rows);
        } else {
          setAppointments([]); // Establecer un array vacío si no hay datos válidos
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedDate(null);
    }, 300); // Tiempo igual a la duración de la transición
  };

  return (
    <div className="overflow-scroll overflow-y-hidden lg:overflow-hidden">
      <div className="p-8 min-w-[600px]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
          >
            Anterior
          </button>
          <h2 className="text-2xl font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
          >
            Siguiente
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="font-bold text-neutral-500">
              {day}
            </div>
          ))}

          {days.map((date, index) => {
            const appointmentsOnDate = formatAppointments(date);

            return (
              <div
                key={index}
                className={`p-4 rounded-lg transition-all duration-300 hover:bg-opacity-70 hover:cursor-pointer ${
                  isSameMonth(date, currentMonth)
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                } ${
                  isSameDay(date, new Date()) ? "bg-neutral-400 text-white" : ""
                }`}
                onClick={() => setSelectedDate(appointmentsOnDate)}
              >
                <div className="text-sm font-bold">{format(date, "d")}</div>
                {appointmentsOnDate.map((appt) => {
                  const priorityClass =
                    appt.ticket.prioridadTicket === "1"
                      ? "bg-green-500"
                      : appt.ticket.prioridadTicket === "2"
                      ? "bg-yellow-500"
                      : "bg-red-500";

                  return (
                    <div
                      key={appt.idCita}
                      className={`px-1 mt-1 text-xs rounded ${priorityClass} text-neutral-700`}
                    >
                      {format(parseISO(appt.fechaInicioCita), "HH:mm")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`p-4 rounded-lg shadow-2xl max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
                isVisible ? "scale-100" : "scale-95"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2 h-fit">
                <header className="text-lg font-bold">
                  Detalles de las citas
                </header>
                <HiOutlineX
                  onClick={handleClose}
                  className="text-3xl transition-all duration-300 ease-in-out hover:text-golden hover:cursor-pointer"
                />
              </div>
              <div className="max-h-[300px] overflow-x-hidden overflow-scroll">
                {selectedDate.length > 0 ? (
                  <ul>
                    {selectedDate.map((appt) => (
                      <li key={appt.idCita} className="mt-2">
                        <p className="text-xl">
                          Cita{" "}
                          <span className="font-medium text-neutral-500">
                            #{appt.idCita}
                          </span>
                        </p>
                        <p>
                          Hora:{" "}
                          {format(parseISO(appt.fechaInicioCita), "HH:mm")} -{" "}
                          {format(parseISO(appt.fechaFinCita), "HH:mm")}
                        </p>
                        <p>ID Ticket: {appt.ticket.idTicket}</p>
                        <p>
                          Prioridad:{" "}
                          <span
                            className={`font-semibold ${
                              appt.ticket.prioridadTicket === "1"
                                ? "text-green-500"
                                : appt.ticket.prioridadTicket === "2"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {appt.ticket.prioridadTicket}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay citas para este día.</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 mt-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
