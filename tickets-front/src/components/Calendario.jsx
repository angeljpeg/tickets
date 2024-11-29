import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import {citas} from './data/calendarData'
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Para mostrar en el modal
  const [appointments, setAppointments] = useState(citas);

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
    appointments.filter((appt) => isSameDay(parseISO(appt.fechaInicio), date));

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setIsVisible(true);
    }
  }, [selectedDate]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedDate(null);
    }, 300); // Tiempo igual a la duración de la transición
  };

  const { user } = useContext(UserContext);

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
                {appointmentsOnDate.map((appt) =>
                  user.role == "tech"
                    ? appt.idTecnico == user.id && (
                        <div
                          key={appt.id}
                          className={`px-1 mt-1 text-xs rounded ${
                            appt.prioridadTicket == "BAJO"
                              ? "bg-green-500"
                              : appt.prioridadTicket == "ALTO"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          } text-neutral-500`}
                        >
                          {format(parseISO(appt.fechaInicio), "HH:mm")}
                        </div>
                      )
                    : user.role == "user"
                    ? appt.idUsuario == user.id && (
                        <div
                          key={appt.id}
                          className={`px-1 mt-1 text-xs rounded ${
                            appt.prioridadTicket == "BAJO"
                              ? "bg-green-500"
                              : appt.prioridadTicket == "ALTO"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          } text-neutral-700`}
                        >
                          {format(parseISO(appt.fechaInicio), "HH:mm")}
                        </div>
                      )
                    : (user.role == "secre" || user.role == "admin") && (
                        <div
                          key={appt.id}
                          className={`px-1 mt-1 text-xs rounded ${
                            appt.prioridadTicket == "BAJO"
                              ? "bg-green-500"
                              : appt.prioridadTicket == "ALTO"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          } text-neutral-700`}
                        >
                          {format(parseISO(appt.fechaInicio), "HH:mm")}
                        </div>
                      )
                )}
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
                    {selectedDate.map((appt) =>
                      user.role == "tech"
                        ? appt.idTecnico == user.id && (
                            <li key={appt.id} className="mt-2">
                              <p className="text-xl">
                                Cita{" "}
                                <span className="font-medium text-neutral-500">
                                  #{appt.id}
                                </span>
                              </p>
                              <p>
                                Hora:{" "}
                                {format(parseISO(appt.fechaInicio), "HH:mm")} -{" "}
                                {format(parseISO(appt.fechaFin), "HH:mm")}
                              </p>
                              <p>ID Ticket: {appt.idTicket}</p>
                              <p>
                                Prioridad:{" "}
                                <span
                                  className={`font-semibold ${
                                    appt.prioridadTicket == "BAJO"
                                      ? "text-green-500"
                                      : appt.prioridadTicket == "ALTO"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  {appt.prioridadTicket}
                                </span>
                              </p>
                            </li>
                          )
                        : user.role == "user"
                        ? appt.idUsuario == user.id && (
                            <li key={appt.id} className="mt-2">
                              <p className="text-xl">
                                Cita{" "}
                                <span className="font-medium text-neutral-500">
                                  #{appt.id}
                                </span>
                              </p>
                              <p>
                                Hora:{" "}
                                {format(parseISO(appt.fechaInicio), "HH:mm")} -{" "}
                                {format(parseISO(appt.fechaFin), "HH:mm")}
                              </p>
                              <p>ID Ticket: {appt.idTicket}</p>
                              <p>
                                Prioridad:{" "}
                                <span
                                  className={`font-semibold ${
                                    appt.prioridadTicket == "BAJO"
                                      ? "text-green-500"
                                      : appt.prioridadTicket == "ALTO"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  {appt.prioridadTicket}
                                </span>
                              </p>
                            </li>
                          )
                        : (user.role == "secre" || user.role == "admin") && (
                            <li key={appt.id} className="mt-2">
                              <p className="text-xl">
                                Cita{" "}
                                <span className="font-medium text-neutral-500">
                                  #{appt.id}
                                </span>
                              </p>
                              <p>
                                Hora:{" "}
                                {format(parseISO(appt.fechaInicio), "HH:mm")} -{" "}
                                {format(parseISO(appt.fechaFin), "HH:mm")}
                              </p>
                              <p>ID Ticket: {appt.idTicket}</p>
                              <p>
                                Prioridad:{" "}
                                <span
                                  className={`font-semibold ${
                                    appt.prioridadTicket == "BAJO"
                                      ? "text-green-500"
                                      : appt.prioridadTicket == "ALTO"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  {appt.prioridadTicket}
                                </span>
                              </p>
                            </li>
                          )
                    )}
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
