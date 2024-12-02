import { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "../Modal";

export function EditarTicketModal({ ticket }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tituloTicket: "",
      descripcionTicket: "",
      prioridadTicket: "",
    },
  });

  console.log(ticket);

  useEffect(() => {
    if (ticket) {
      reset({
        tituloTicket: ticket.tituloTicket || "",
        descripcionTicket: ticket.descripcionTicket || "",
        prioridadTicket: ticket.prioridadTicket || "",
      });
    }
  }, [ticket, reset]);

  const handleEditTicket = (data) => {
    console.log("Datos editados:", data);
    reset();
    alert("Se editó el ticket");
  };

  const getEstadoClase = (prioridad) => {
    switch (prioridad) {
      case "1":
        return "bg-red-500 hover:bg-red-400";
      case "2":
        return "bg-yellow-500 hover:bg-yellow-400";
      case "3":
        return "bg-green-500 hover:bg-green-400";
      default:
        return "bg-neutral-700 hover:bg-neutral-400";
    }
  };

  return (
    <Modal
      title={"Editar ticket"}
      btnCancelText={"Cancelar"}
      btnActionText={"Guardar"}
      btnActionFunction={handleSubmit(handleEditTicket)} // React Hook Form
      modalBody={
        <>
          <p className="mb-2">Prioridad</p>
          <Controller
            name="prioridadTicket"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`p-2 mb-2 text-black cursor-pointer rounded-md transition-all duration-300 ease-in-out outline-none w-full ${getEstadoClase(
                  field.value
                )}`}
              >
                <option value="1">ALTO</option>
                <option value="2">MEDIO</option>
                <option value="3">BAJO</option>
              </select>
            )}
          />

          <p className="mb-2">Título del problema</p>
          <input
            {...register("tituloTicket", { required: "El título es obligatorio" })}
            className="w-full px-4 py-2 mb-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700"
            type="text"
            placeholder="Problema en la impresora"
          />
          {errors.tituloTicket && (
            <p className="text-red-500">{errors.tituloTicket.message}</p>
          )}

          <p className="mb-2">Descripción del problema</p>
          <textarea
            {...register("descripcionTicket", { required: "La descripción es obligatoria" })}
            className="w-full h-[200px] px-4 py-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700 resize-none"
            placeholder="La impresora no quiere encender"
          />
          {errors.descripcionTicket && (
            <p className="text-red-500">{errors.descripcionTicket.message}</p>
          )}
        </>
      }
      objetoModal={ticket} // Pasar el ticket como referencia al modal
    />
  );
}

EditarTicketModal.propTypes = {
  ticket: PropTypes.object.isRequired,
};
