import PropTypes from "prop-types";
export default function InputText({
  name,
  label,
  defaultValue,
  validation,
  register,
  errors,
  typeInput,
  placeholder,
  className
}) {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-lg mb-1">{label}</label>}
      <input
        className={`${className} w-full px-4 py-2 my-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-700 bg-neutral-800`}
        type={typeInput || "text"}
        {...register(name, validation)}
        defaultValue={defaultValue}
        placeholder={placeholder || ""}
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
  errors: PropTypes.object.isRequired, // Reglas de validación
  typeInput: PropTypes.string, // Tipo de input
  placeholder: PropTypes.string, // Etiqueta opcional
  className: PropTypes.string, // Clase opcional
};
