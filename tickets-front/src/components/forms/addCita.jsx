import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";

import { getTecnicos } from "../../api/user.fetch";

export default function AddCita({ handleCloseAddCita }) {
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicosSeleccionados, setTecnicosSeleccionados] = useState([]);
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm();

  const handleAddCita = () => {
    console.log("Técnicos seleccionados:", tecnicosSeleccionados);
    console.log("Formulario:", getValues());
  };

  const handleAddTecnico = (tecnico) => {
    if (!tecnicosSeleccionados.some((t) => t.idUsuario === tecnico.idUsuario)) {
      setTecnicosSeleccionados([...tecnicosSeleccionados, tecnico]);
    }
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

  const handleRemoveTecnico = (id) => {
    setTecnicosSeleccionados(tecnicosSeleccionados.filter((t) => t.idUsuario !== id));
  };

  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(handleAddCita)}
    >
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
                  className="px-2 py-1 text-white bg-green-500/50 hover:bg-green-600/80 rounded-3xl"
                  onClick={() => handleAddTecnico(tecnico)}
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
            {tecnicosSeleccionados.map((tecnico) => (
              <li key={tecnico.idUsuario} className="flex justify-between items-center">
                {tecnico.nombreUsuario} {tecnico.apellidoUsuario} (#{tecnico.idUsuario})
                <button
                  type="button"
                  className="text-red-600 hover:underline ml-2"
                  onClick={() => handleRemoveTecnico(tecnico.idUsuario)}
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
          className="p-2 transition-all duration-300 rounded bg-neutral-600 hover:bg-green-600 hover:text-black"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

AddCita.propTypes = {
  handleCloseAddCita: PropTypes.func.isRequired,
};
