import Clock from "../components/Reloj";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export function WelcomeUI() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Bienvenida
        </p>
      </div>
      <div className="mb-4">
        <h1 className="text-6xl font-semibold lg:text-8xl text-golden">
          ¡Hola!{" "}
          <span className="text-4xl font-semibold lg:text-6xl text-neutral-300">
            {user.name}
          </span>
        </h1>
      </div>
      <Clock />
    </div>
  );
}