import PropTypes from "prop-types";
export default function InputText({ name, label, defaultValue, validation, register, errors }) {

  return (
    <div className="mb-4">
      {label && <label className="block text-lg mb-1">{label}</label>}
      <input
        className="w-full px-4 py-2 my-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-700 bg-neutral-800"
        type="text"
        {...register(name, validation)}
        defaultValue={defaultValue}
      />
      {errors[name] && (
        <span className="block text-sm text-red-500">
          {errors[name].message || "Oops! Algo salió mal"}
        </span>
      )}
    </div>
  );
}

InputText.propTypes = {
  name: PropTypes.string.isRequired, // Nombre del input, usado por react-hook-form
  label: PropTypes.string, // Etiqueta opcional
  defaultValue: PropTypes.string, // Valor inicial opcional
  validation: PropTypes.object, // Reglas de validación
  register: PropTypes.func.isRequired, // Reglas de validación
  errors: PropTypes.object.isRequired // Reglas de validación
};
