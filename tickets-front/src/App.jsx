import "./App.css";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

// Obtener el día de mañana
const getTomorrow = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toDateString(); // Formato de fecha consistente
};

const occupiedDates = [getTomorrow()]; 

function CustomCalendar() {
  const [date, setDate] = useState(null);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      dayClassName={(day) =>
        occupiedDates.includes(day.toDateString())
          ? "bg-red-200 text-white" // Cambia a un fondo rojo pastel
          : ""
      }
    />
  );
}// Aquí puedes añadir más fechas en el futuro

function App() {
  return (
    <CustomCalendar />
  );
}

export default App;
