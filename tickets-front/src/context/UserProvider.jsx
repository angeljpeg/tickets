// src/context/UserProvider.jsx
import { useState } from "react";
import userContext from "./UserContext"; // Importar el contexto
import PropTypes from "prop-types";
import { tickets } from "../components/data/ticketData";

export default function UserProvider({ children }) {
  //Estado de los datos de usuario
  const [user, setUser] = useState(null);

  //Estado del arreglo de tickets
  const [completaTickets, setCompletaTickets] = useState([...tickets]);

  //Estado del modal
  const [informationModal, setInformationModal] = useState({
    mostrar: false,
    title: "",
    id: -1
  });

  const login = () => {
    setUser({
      id: 2,
      name: "Pirita",
      lastName: "Dream",
      email: "pirita@gmail.com",
      role: "admin",
    });
    console.log("Creando el usuario");
  };

  const logout = () => {
    setUser(null);
    console.log("Cerrando sesión, el usuario será eliminado");
  };

  return (
    <userContext.Provider
      value={{
        user,
        login,
        logout,
        completaTickets,
        setCompletaTickets,
        informationModal,
        setInformationModal,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element,
};
