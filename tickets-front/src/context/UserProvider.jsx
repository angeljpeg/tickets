// src/context/UserProvider.jsx
import { useState, useEffect } from "react";
import userContext from "./UserContext"; // Importar el contexto
import PropTypes from "prop-types";

// Constante para la clave en localStorage
const USER_STORAGE_KEY = "app_user";

export default function UserProvider({ children }) {
  // Estado inicial: verificar si hay un usuario en localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Estado del modal
  const [informationModal, setInformationModal] = useState({
    mostrar: false,
    title: "",
    id: -1,
  });

  // Guardar usuario en localStorage al hacer login
  const login = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedUser));
  };

  // Limpiar usuario de localStorage al hacer logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Verificar si `user` cambia y sincronizar con `localStorage` (opcional)
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

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
