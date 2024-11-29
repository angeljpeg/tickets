import { useContext } from "react";
import UserContext from "../context/UserContext";

export function TechnicianUI() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>TECHNICIAN {user.name}</h1>
    </div>
  );
}