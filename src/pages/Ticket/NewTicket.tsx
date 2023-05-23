import { ChangeEvent, useEffect, useState, useMemo } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import useProducts from "../../hooks/useProducts";
import useAgency from "../../hooks/useAgency";
import useType from "../../hooks/useType";
import useIncidence from "../../hooks/useIncidence";
import useTicket from "../../hooks/useTicket";
import TicketForm1 from "../../components/NewTicket/TicketForm1";
import TicketForm2 from "../../components/NewTicket/TicketForm2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { product } from "../../hooks/useProducts";
import TicketForm3 from "../../components/NewTicket/TicketForm3";

const MySwal = withReactContent(Swal);

export default function Ticket() {
  const ticketHook = useTicket();

  const [ticket_create, setTicketCreate] = useState({
    status: "",
    amount: 0,
    client_id: "",
    catalog_id: "",
    user_id: "",
    canal_id: "",
    social_id: "",
  });
  /* Logica */

  const [seccionActual, setSeccionActual] = useState(1);

  const handleNext = () => {
    setSeccionActual(seccionActual + 1);
  };

  const handleBack = () => {
    setSeccionActual(seccionActual - 1);
  };

  const handleCreate = () => {
    // Lógica para enviar el formulario completo
  };

  return (
    <LayoutBar opcionSeleccionada="ticket">
      <div className="sm:w-[85%] lg:w-[65%] xl:w-[55%] md:w-[70%] 2xl:w-[45%] bg-white shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md w-[90%] flex flex-col items-center justify-center">
        <div className="flex flex-row ">
          <p className=" w-full text-black text-2xl font-bold p-3">
            Generar Nuevo Ticket
          </p>
        </div>
        <div className="bg-azul w-full">
          <p className="text-white text-2xl font-bold ">#0004578</p>
        </div>
        {/* Padre*/}
        <div className="w-10/12  mx-auto mt-1 ">
          {seccionActual === 1 && (
            <TicketForm1
              onNext={handleNext}
              setTicketInfo={setTicketCreate}
              ticketInfo={ticket_create}
            />
          )}
          {seccionActual === 2 && (
            <TicketForm2
              onBack={handleBack}
              onNext={handleNext}
              setTicketInfo={setTicketCreate}
              ticketInfo={ticket_create}
            />
          )}
          {seccionActual === 3 && (
            <TicketForm3
              onBack={handleBack}
              onCreate={handleCreate}
              setTicketInfo={setTicketCreate}
              ticketInfo={ticket_create}
            />
          )}
        </div>
      </div>
    </LayoutBar>
  );
}
