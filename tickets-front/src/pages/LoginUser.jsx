import { useNavigate } from "react-router-dom";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useForm } from "react-hook-form";
import { InputText } from "../components/ui";
import { loginUser } from "../api/user.fetch.js";

export function LoginUI() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data);

      if (response.usuario) {
        // Inicia sesión y redirige al usuario
        login(response.usuario);
        navigate("/welcome");
      } else {
        // Manejar errores del servidor
        if (response.campo && response.mensaje) {
          setError(response.campo, {
            type: "server",
            message: response.mensaje,
          });
        }
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center p-8 rounded-lg bg-neutral-950 min-w-96">
        <div className="flex items-center gap-4">
          <div className="gap-6 p-2 rounded-full bg-golden w-fit">
            <HiWrenchScrewdriver className="text-5xl text-black" />
          </div>
          <div className="flex items-end gap-1">
            <h1 className="text-6xl font-medium">TI</h1>
            <span className="text-4xl font-normal">go!</span>
          </div>
        </div>

        <div className="mt-4 w-full">
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
            <InputText
              name="claveUsuario"
              label="Contraseña"
              validation={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 25,
                  message: "La contraseña no puede tener más de 25 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Solo se permiten caracteres alfanuméricos",
                },
              }}
              register={register}
              errors={errors}
            />
            <button
              type="submit"
              className="relative self-center p-2 mt-4 overflow-hidden rounded-lg bg-neutral-700 group"
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
