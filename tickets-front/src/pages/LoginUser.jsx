import { useNavigate } from "react-router-dom";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useForm } from "react-hook-form";
import { InputText } from "../components/ui";

export function LoginUI() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const handleLogin = () => {
    console.log(getValues());
    navigate("/welcome");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center p-8 rounded-lg bg-neutral-950">
        <div className="flex items-center gap-4">
          <div className="gap-6 p-2 rounded-full bg-golden w-fit">
            <HiWrenchScrewdriver className="text-5xl text-black" />
          </div>
          <div className="flex items-end gap-1">
            <h1 className="text-6xl font-medium">TI</h1>
            <span className="text-4xl font-normal">go!</span>
          </div>
        </div>

        <div className="mt-4">
          <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <InputText
              name="correoUsuario"
              label="Correo"
              validation={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo válido",
                },
              }}
              register={register}
              errors={errors}
            />
            <div className="mb-4">
              <p className="text-lg">Contraseña</p>
              <input
                className="p-4 my-2 py-2 transition-all duration-300 ease-in-out rounded-lg outline-none hover:bg-neutral-700 bg-neutral-800"
                type="password"
              />
              <span className="block text-sm text-red-500">
                Oops! Algo Salio Mal
              </span>
            </div>
            <button
              type="submit"
              className="relative self-center p-2 overflow-hidden rounded-lg bg-neutral-700 group"
            >
              <span className="relative z-10 font-medium transition-all duration-300 group-hover:text-black">
                Ingresar
              </span>
              <span className="absolute inset-0 h-full transition-all duration-300 origin-center transform scale-x-0 bg-golden group-hover:scale-x-100 group-hover:w-full"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
