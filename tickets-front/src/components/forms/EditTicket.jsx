import { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { editTicket } from "../../api/tickets.fetch";

export function EditarTicket({ ticket, isOpen, handleClose }) {
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

  useEffect(() => {
    if (ticket) {
      reset({
        tituloTicket: ticket.tituloTicket || "",
        descripcionTicket: ticket.descripcionTicket || "",
        prioridadTicket: ticket.prioridadTicket || "",
      });
    }
  }, [ticket, reset]);

  const handleEditTicket = async (data) => {
    console.log("Datos editados:", data);
    data = { ...data, idTicket: ticket.idTicket };
    const response = await editTicket(data);
    if (response.ok) {
      handleClose();
      alert("Se editó el ticket");
    } else {
      console.error("Error al editar ticket:", response);
    }
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
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-300 ${
        isOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`p-4 rounded-lg max-w-[400px] w-[400px] bg-neutral-800 transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <form onSubmit={handleSubmit(handleEditTicket)}>
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
            {...register("tituloTicket", {
              required: "El título es obligatorio",
            })}
            className="w-full px-4 py-2 mb-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700"
            type="text"
            placeholder="Problema en la impresora"
          />
          {errors.tituloTicket && (
            <p className="text-red-500">{errors.tituloTicket.message}</p>
          )}

          <p className="mb-2">Descripción del problema</p>
          <textarea
            {...register("descripcionTicket", {
              required: "La descripción es obligatoria",
            })}
            className="w-full h-[200px] px-4 py-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-600 bg-neutral-700 resize-none"
            placeholder="La impresora no quiere encender"
          />
          {errors.descripcionTicket && (
            <p className="text-red-500">{errors.descripcionTicket.message}</p>
          )}
          {/* FOOTER */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-golden hover:text-black"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditarTicket.propTypes = {
  ticket: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
