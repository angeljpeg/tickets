import { useContext } from "react";
import UserContext from "../context/UserContext";
import { citas } from "../components/data/calendarData";
import { Cita } from '../components/Cita'

export function AppointmentUI() {
  const { completaTickets, user } = useContext(UserContext);

  const appointments = citas

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Citas
        </p>
      </div>
      {/* Lista de tickets */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((cita, index) => <Cita cita={cita} key={index}/>)}
        </div>
      </div>
    </div>
  );
}
