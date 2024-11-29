import InputText from "../ui/InputText";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import UserContext from "../../context/UserContext";
import { addTicket } from "../../api/tickets.fetch";

import PropTypes from "prop-types";

export default function AddTicket({ handleCloseAddTicket }) {
  const { user } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  // Agregar nuevo ticket
  const handleAddTicket = async () => {
    try {
      console.log(user.idUsuario);
      const NewTicket = {
        statusTicket: "Pendiente",
        tituloTicket: getValues("tituloTicket"),
        descripcionTicket: getValues("descripcionTicket"),
        idUsuario: user.idUsuario,
      };
      const response = await addTicket(NewTicket);
      console.log(response);
    } catch (error) {
      console.error("Error al agregar ticket:", error);
    }
    handleCloseAddTicket();
  };

  return (
    <>
      <div className="flex items-center justify-between w-full mb-2">
        <header className="text-lg font-bold">Agregar Ticket</header>
        <HiOutlineX
          onClick={handleCloseAddTicket}
          className="text-3xl transition-all duration-300 ease-in-out hover:text-golden cursor-pointer"
        />
      </div>
      <form onSubmit={handleSubmit(handleAddTicket)}>
        <InputText
          errors={errors}
          register={register}
          name="tituloTicket"
          label="Título del Problema"
          validation={{ required: "El título es obligatorio" }}
          className={"border-neutral-500 border-2"}
        />
        <InputText
          errors={errors}
          register={register}
          name="descripcionTicket"
          typeInput="textarea"
          label="Descripción"
          validation={{ required: "La descripción es obligatoria" }}
          className={"border-neutral-500 border-2"}
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCloseAddTicket}
            className="p-2 rounded bg-neutral-600 hover:bg-golden hover:text-black"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="p-2 rounded bg-neutral-600 hover:bg-golden hover:text-black"
          >
            Agregar Ticket
          </button>
        </div>
      </form>
    </>
  );
}

AddTicket.propTypes = {
  handleCloseAddTicket: PropTypes.func.isRequired, // Función para cerrar el modal
};
