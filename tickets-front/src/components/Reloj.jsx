import { useState, useEffect } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="text-lg">
        {currentTime.toLocaleDateString()}{" "}
        {currentTime.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default Clock;
