import { useContext } from "react";
import UserContext from "../context/UserContext";

export function ProfileUI() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <div className="absolute top-0 z-1 w-full lg:w-[calc(100%-300px)] h-16 lg:left-[300px] bg-neutral-900 flex items-center">
        <p className="absolute pl-4 ml-4 text-lg border-l left-14 lg:static border-neutral-500 text-neutral-500">
          Perfil
        </p>
      </div>
      {/* Lista de tickets */}
      <div className="p-4 mt-14">
        <div className="grid grid-cols-1 gap-4">
          <p className="text-xl font-medium text-golden">
            ID <span className="text-neutral-500">#{user.id}</span>
          </p>
          <p className="text-xl font-medium text-golden">Nombre completo</p>
          <p className="">
            {user.name} {user.lastName}
          </p>
          <p className="text-xl font-medium text-golden">Correo</p>
          <p className="">{user.email}</p>
          <p className="text-xl font-medium text-golden">Rol</p>
          <p className="">
            {user.role == "admin"
              ? "Administrador"
              : user.role == "tech"
              ? "Técnico"
              : user.role == "secre"
              ? "Secretario"
              : "Usuario"}
          </p>
        </div>
      </div>
    </div>
  );
}
