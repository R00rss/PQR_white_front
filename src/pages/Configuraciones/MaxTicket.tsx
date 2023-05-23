import { Link } from "react-router-dom";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import { useState } from "react";

export default function MaxTicket() {
  const [isEmptyMaxTicket, setIsEmptyMaxTicket] = useState(true);

  const handleInputChangeMaxTicket = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyMaxTicket(event.target.value === "");
  };

  return (
    <LayoutBar opcionSeleccionada="administracion">
      <div className="flex flex-col w-[80%] sm:w-[70%] md:[60%] lg:w-[50%] h-1/2 rounded-md shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
        <div className="flex  w-full bg-azul h-[15%] rounded-t-md items-center ">
          <p className="mx-auto text-white font-semibold text-xl">
            Configurar máximo de archivos por ticket
          </p>
        </div>
        <div className="flex flex-row h-[55%] w-1/2  mx-auto">
          <div className="flex flex-col w-[25%] my-auto mx-auto pl-4">
            <p className="text-morado text-5xl font-bold text-start">4</p>
            <p className="text-start text-gris text-sm">Cantidad actual</p>
          </div>
          <div className="flex flex-col w-[35%] h-1/2  my-auto mx-auto ml-2">
            <div className="flex flex-row gap-1 mx-auto">
              <p className="text-sm font-bold text-start">Nueva Cantidad</p>
              {isEmptyMaxTicket ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <input
              type=""
              min="0"
              className="appearance-none border border-black rounded-[4px]  h-[40%] text-center mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleInputChangeMaxTicket}
            />
          </div>
        </div>

        <div className="flex flex-row  h-9 w-[40%] mx-auto items-center justify-center gap-12 mt-4">
          <button className="h-full w-[30%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado">
            Guardar
          </button>
          <Link
            to={"/administracion/configuraciones"}
            className="h-full w-[30%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado justify-center flex items-center"
          >
            Salir
          </Link>
        </div>
      </div>
    </LayoutBar>
  );
}
