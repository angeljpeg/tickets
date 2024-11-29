import { useNavigate } from "react-router-dom";

export function NotFoundPageUI() {
  const navigate = useNavigate();
  const handleRedirection = () => {
    navigate("/welcome");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <h1 className="font-semibold text-8xl text-golden">404</h1>
        <h2 className="text-5xl font-semibold">Página no encontrada :c</h2>
        <button
          onClick={handleRedirection}
          className="relative p-2 mt-6 overflow-hidden rounded-lg bg-neutral-600 group"
        >
          <span className="relative z-10 font-medium transition-all duration-300 group-hover:text-neutral-700">
            Regresar
          </span>
          <span className="absolute inset-0 h-full transition-all duration-300 origin-center transform scale-x-0 bg-golden group-hover:scale-x-100 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  );
}
