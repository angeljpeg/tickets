import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";

import { getTecnicos } from "../../api/user.fetch";
import { addCita } from "../../api/citas.js";

export default function AddCita({ handleCloseAddCita, ticket }) {
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicosSeleccionados, setTecnicosSeleccionados] = useState([]);
  const [error, setError] = useState(undefined);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleAddCita = async (data) => {
    const fechaInicioCita = new Date(`${data.fechaInicio}T${data.horaInicio}`);

    if (tecnicosSeleccionados.length === 0) {
      alert("Debes seleccionar al menos un técnico para agregar la cita.");
      return;
    }

    const bodyData = {
      idTicket: ticket.idTicket,
      fechaInicioCita: fechaInicioCita,
      tecnicos: tecnicosSeleccionados, // Solo los IDs
    };

    try {
      console.log("Datos enviados:", bodyData);
      const response = await addCita(bodyData);
      
      if ( !response.ok) {
        return setError(response.message);
      }

      handleCloseAddCita();
      alert("Cita agregada con éxito");

    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTecnico = (id) => {
    if (!tecnicosSeleccionados.includes(id)) {
      setTecnicosSeleccionados([...tecnicosSeleccionados, id]);
    }
  };

  const handleRemoveTecnico = (id) => {
    setTecnicosSeleccionados(tecnicosSeleccionados.filter((t) => t !== id));
  };

  const handleChange = async (e) => {
    try {
      const response = await getTecnicos(e.target.value);
      if (response.ok) {
        setTecnicos(response.data.rows);
      } else {
        console.error("Error fetching técnicos:", response);
        setTecnicos([]);
      }
    } catch (error) {
      console.error("Error fetching técnicos:", error);
      setTecnicos([]);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(handleAddCita)}
    >
      {/* errores */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* FECHA Y HORA */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg mb-1">Fecha de Inicio</label>
          <input
            type="date"
            className="w-full px-4 py-2 my-2 transition-all duration-300 rounded-lg outline-none bg-neutral-800"
            {...register("fechaInicio", {
              required: "La fecha de inicio es obligatoria",
            })}
          />
          {errors.fechaInicio && (
            <p className="text-red-500 text-sm">{errors.fechaInicio.message}</p>
          )}
        </div>
        <div>
          <label className="block text-lg mb-1">Hora de Inicio</label>
          <input
            type="time"
            className="w-full px-4 py-2 my-2 transition-all duration-300 rounded-lg outline-none bg-neutral-800"
            {...register("horaInicio", {
              required: "La hora de inicio es obligatoria",
            })}
          />
          {errors.horaInicio && (
            <p className="text-red-500 text-sm">{errors.horaInicio.message}</p>
          )}
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="mb-4 w-full">
        <label className="block text-lg mb-1">Buscar Técnico por ID</label>
        <input
          className="w-full px-4 py-2 my-2 transition-all duration-300 rounded-lg outline-none hover:bg-neutral-700 bg-neutral-800"
          type="number"
          name="tecnico"
          placeholder="Buscar Técnico"
          onChange={handleChange}
        />
        {/* RESULTADOS */}
        <div>
          <h4 className="font-semibold">Resultados</h4>
          {tecnicos.length > 0 ? (
            tecnicos.map((tecnico) => (
              <div key={tecnico.idUsuario} className="flex items-center py-1 gap-2">
                <span>
                  #{tecnico.idUsuario} - {tecnico.nombreUsuario} {tecnico.apellidoUsuario}
                </span>
                <button
                  type="button"
                  className="p-1 text-white bg-blue-600 hover:bg-blue-800 rounded"
                  onClick={() => handleAddTecnico(tecnico.idUsuario)}
                >
                  Seleccionar
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No se encontraron técnicos.</p>
          )}
        </div>
      </div>

      {/* TÉCNICOS SELECCIONADOS */}
      {tecnicosSeleccionados.length > 0 && (
        <div>
          <h4 className="font-semibold">Técnicos Seleccionados</h4>
          <ul className="list-disc ml-4">
            {tecnicosSeleccionados.map((id) => (
              <li key={id} className="flex justify-between items-center">
                <span>ID Técnico: {id}</span>
                <button
                  type="button"
                  className="text-red-600 hover:underline ml-2"
                  onClick={() => handleRemoveTecnico(id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FOOTER */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCloseAddCita}
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
  );
}

AddCita.propTypes = {
  handleCloseAddCita: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};
