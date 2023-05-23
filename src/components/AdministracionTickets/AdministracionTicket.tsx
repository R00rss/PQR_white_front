import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Times from "./GestionProps/Times";

const MySwal = withReactContent(Swal);
import Incidencias from "./GestionProps/Incidencias";
import { ticket } from "../../hooks/useTicket";
import DatosPersonales from "./GestionProps/DatosPersonales";
import Comentario from "./GestionProps/Comentario";
import GestionarTicket from "./GestionProps/GestionarTicket";

interface EditTicketProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  getData: Function;
  selectedTicket: ticket;
}

export default function AdministracionTickets({
  showPopUp,
  onClosePopUp,
  getData,
  selectedTicket,
}: EditTicketProps) {
  const [selectedButton, setSelectedButton] = useState("button1");

  const closeFunction = () => {
    // Restaura los valores por defecto

    setSelectedButton("button1");
    onClosePopUp();
  };

  //use state de barra de progreso del ticket

  const handleButtonClick = (buttonId: React.SetStateAction<string>) => {
    setSelectedButton(buttonId);
  };

  const RenderComponent = () => {
    if (selectedButton === "button1") {
      return (
        <DatosPersonales
          showPopUp={showPopUp}
          onClosePopUp={closeFunction}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    } else if (selectedButton === "button2") {
      return <Incidencias selectedTicket={selectedTicket} />;
    } else if (selectedButton === "button3") {
      return (
        <Comentario
          showPopUp={showPopUp}
          onClosePopUp={closeFunction}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    } else if (selectedButton === "button4") {
      return (
        <GestionarTicket
          showPopUp={showPopUp}
          onClosePopUp={closeFunction}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    } else {
      return <></>;
    }
  };

  if (!showPopUp) return null;
  return (
    <div
      className="flex fixed w-full h-full duration-100 bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center"
      onClick={closeFunction}
    >
      <div
        className="bg-blanco w-[600px] rounded-lg "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Barra de tiempos */}
        <Times selectedTicket={selectedTicket} />

        {/* +++++++++++++++ */}

        {/* Barra de botones */}
        <div className="w-full">
          <div className="w-[97%] h-[30px] mx-auto flex flex-row text-base font-semibold gap-4">
            <button
              className={`w-1/4 rounded-b-md bg-gris-claro hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black hover:text-base duration-300 ${
                selectedButton === "button1" &&
                "bg-white border border-gris-claro text-morado font-black text-base"
              }`}
              onClick={() => handleButtonClick("button1")}
            >
              Datos Personales
            </button>
            <button
              className={`w-1/4 rounded-b-md bg-gris-claro hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black hover:text-base duration-300 ${
                selectedButton === "button2"
                  ? "bg-white border border-gris-claro text-morado font-black text-base"
                  : " bg-gris-claro"
              }`}
              onClick={() => handleButtonClick("button2")}
            >
              Incidencias
            </button>
            <button
              className={`w-1/4 rounded-b-md bg-gris-claro hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black hover:text-base duration-300 ${
                selectedButton === "button3"
                  ? "bg-white border border-gris-claro text-morado font-black text-base"
                  : " bg-gris-claro"
              }`}
              onClick={() => handleButtonClick("button3")}
            >
              Respaldo
            </button>
            <button
              className={`w-1/4 rounded-b-md bg-gris-claro hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black hover:text-base duration-300 ${
                selectedButton === "button4"
                  ? "bg-white border border-gris-claro text-morado font-black text-base"
                  : " bg-gris-claro"
              }`}
              onClick={() => handleButtonClick("button4")}
            >
              Gestionar ticket
            </button>
          </div>
          <RenderComponent />
        </div>

        {/* +++++++++++++++ */}
      </div>

      {/* TARJETAS */}
    </div>
  );
}
/* Componente  */
