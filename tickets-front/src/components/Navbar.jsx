import { NavLink, useNavigate } from "react-router-dom";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegCalendarDays, FaUser, FaToolbox } from "react-icons/fa6";
import { MdUnfoldMore } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Iconos para abrir/cerrar

import UserContext from "../context/UserContext";
import { useContext } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el sidebar

  const { logout, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => setIsOpen(!isOpen); // Cambiar estado

  const getInitials = (name, lastName) => {
    const nameInitial = name?.charAt(0).toUpperCase() || ""; // Toma la primera letra y la convierte a mayúscula
    const lastNameInitial = lastName?.charAt(0).toUpperCase() || "";
    return `${nameInitial}${lastNameInitial}`; // Combina las iniciales
  };

  return (
    <>
      <nav
        className={`bg-neutral-950 z-10 w-[300px] min-w-[300px] h-screen text-neutral-300 py-4 pl-2 pr-0 lg:static absolute top-0 left-0 transition-all duration-[0.5s] ease-in-out ${
          isOpen ? "" : "translate-x-[-100%] lg:translate-x-0"
        }`}
      >
        {/* Botón de abrir/cerrar */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 -right-14 bg-neutral-950 text-neutral-300 p-2 rounded-lg shadow-lg z-50 
          flex items-center justify-center transition-all duration-300 lg:hidden ${
            isOpen ? "-translate-x-[175%] translate-y-[20%]" : "translate-x-0"
          }`}
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        <ul className="relative h-full">
          <li
            className={`mb-4 mr-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-neutral-800`}
          >
            <div>
              <NavLink
                className={({ isActive }) =>
                  `flex gap-2 p-2 rounded-lg items-center ${
                    isActive
                      ? "bg-neutral-900 text-neutral-300"
                      : "text-neutral-400"
                  }`
                }
                to="/welcome"
              >
                {({ isActive }) => (
                  <>
                    {/* Cambia el fondo del ícono dinámicamente */}
                    <div
                      className={`p-2 rounded-full ${
                        isActive ? "bg-golden" : "bg-neutral-700"
                      }`}
                    >
                      <HiWrenchScrewdriver
                        className={`text-2xl ${
                          isActive ? "text-black" : "text-neutral-300"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-neutral-300">
                        TI<span className="text-sm"> go! </span>
                        <span className="text-sm font-semibold text-neutral-500">
                          {user.role == "admin" ? "Administrador" : (user.role == "tech" ? "Técnico" : (user.role == "secre" ? "Secretario" : "Usuario"))}
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            </div>
          </li>
          <li
            className={`mb-2 mr-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-neutral-800`}
          >
            <div>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${
                    isActive
                      ? "bg-neutral-900 text-neutral-200"
                      : "text-neutral-500"
                  }`
                }
                to="/tickets"
              >
                {({ isActive }) => (
                  <>
                    {/* Cambia el fondo del ícono dinámicamente */}
                    <div className={`p-2 rounded-full ${isActive ? "" : ""}`}>
                      <LuFileSpreadsheet
                        className={`text-xl ${
                          isActive ? "text-golden" : "text-neutral-300"
                        }`}
                      />
                    </div>
                    <p className={`text-sm font-semibold text-neutral-300`}>
                      Mis tickets
                    </p>
                  </>
                )}
              </NavLink>
            </div>
          </li>
          <li
            className={`mb-2 mr-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-neutral-800`}
          >
            <div>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${
                    isActive
                      ? "bg-neutral-900 text-neutral-200"
                      : "text-neutral-500"
                  }`
                }
                to="/calendar"
              >
                {({ isActive }) => (
                  <>
                    {/* Cambia el fondo del ícono dinámicamente */}
                    <div className={`p-2 rounded-full ${isActive ? "" : ""}`}>
                      <FaRegCalendarDays
                        className={`text-xl ${
                          isActive ? "text-golden" : "text-neutral-300"
                        }`}
                      />
                    </div>
                    <p className={`text-sm font-semibold text-neutral-300`}>
                      Calendario
                    </p>
                  </>
                )}
              </NavLink>
            </div>
          </li>
          <li
            className={`mb-2 mr-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-neutral-800`}
          >
            <div>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${
                    isActive
                      ? "bg-neutral-900 text-neutral-200"
                      : "text-neutral-500"
                  }`
                }
                to="/appointment"
              >
                {({ isActive }) => (
                  <>
                    {/* Cambia el fondo del ícono dinámicamente */}
                    <div className={`p-2 rounded-full ${isActive ? "" : ""}`}>
                      <FaToolbox
                        className={`text-xl ${
                          isActive ? "text-golden" : "text-neutral-300"
                        }`}
                      />
                    </div>
                    <p className={`text-sm font-semibold text-neutral-300`}>
                      Citas
                    </p>
                  </>
                )}
              </NavLink>
            </div>
          </li>
          <li className={`absolute bottom-0 w-full group`}>
            <div className={`w-full`}>
              {/* Contenedor principal */}
              <div className="flex gap-2 p-2 mr-2 transition-all duration-300 ease-in-out rounded-lg cursor-pointer group-hover:bg-neutral-800">
                <div className="p-2 text-xl font-semibold rounded-lg bg-neutral-600">
                  <p>{getInitials(user.name, user.lastName)}</p>
                </div>
                <div className={`flex items-center justify-between w-full`}>
                  <div className="flex flex-col">
                    <p className="text-base text-neutral-400">{user.name} {user.lastName}</p>
                    <p className="text-sm text-neutral-600">
                      {user.email}
                    </p>
                  </div>
                  <MdUnfoldMore className="text-xl" />
                </div>
              </div>

              {/* Ventana emergente */}
              <div
                className="absolute bottom-full right-2 lg:bottom-0 lg:left-[99.2%] w-56 bg-neutral-800 border-neutral-600 border rounded-lg 
              opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 
              transition-all duration-300 ease-in-out z-10 
              pointer-events-none group-hover:pointer-events-auto"
              >
                <div className="flex gap-2 p-2 cursor-default">
                  <div className="p-2 text-xl font-semibold rounded-lg bg-neutral-600">
                    <p>{getInitials(user.name, user.lastName)}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base text-neutral-400">{user.name} {user.lastName}</p>
                    <p className="text-xs text-neutral-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="mx-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-neutral-600">
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 ${
                        isActive
                          ? "bg-neutral-500 rounded-lg text-neutral-200"
                          : "text-neutral-400"
                      }`
                    }
                    to="/profile"
                  >
                    <FaUser className="text-xl" />
                    <p className="text-sm font-semibold">Cuenta</p>
                  </NavLink>
                </div>
                <div
                  className="flex items-center gap-2 p-2 mx-2 my-2 transition-all duration-300 ease-in-out rounded-lg cursor-pointer hover:bg-neutral-600"
                  onClick={handleLogout}
                >
                  <BiLogOut className="text-xl text-neutral-400" />
                  <p className="text-sm font-semibold text-neutral-400">
                    Cerrar sesión
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
