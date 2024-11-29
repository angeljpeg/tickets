// src/context/UserProvider.jsx
import { useState } from "react";
import userContext from "./UserContext"; // Importar el contexto
import PropTypes from "prop-types";

export default function UserProvider({ children }) {
  //Estado de los datos de usuario
  const [user, setUser] = useState(null);

  //Estado del modal
  const [informationModal, setInformationModal] = useState({
    mostrar: false,
    title: "",
    id: -1
  });

  const login = (loggedUser) => {
    setUser(loggedUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        user,
        login,
        logout,
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
