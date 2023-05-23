import { ChangeEvent, useContext, useEffect, useState, useMemo } from "react";
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
import { count_tickets, ticket_index } from "../../services/ticket";

const MySwal = withReactContent(Swal);

async function delay_ms(delay: number): Promise<any> {
  return new Promise((resolve, error) => {
    setTimeout(() => resolve(true), delay);
  });
}

export default function NewTicket() {
  const ticketHook = useTicket();

  const [nextIndex, setNextIndex] = useState("");
  //const { current_user } = useContext(JWTContext);

  async function getNextIndex() {
    const res = await ticket_index();
    if (res) {
      const estado: number = res.status;
      console.log("Estatus del pedido", estado);
      const data_ = await res.json();
      console.log("Datos :", data_);
      setNextIndex(data_);
    }
  }
  useEffect(() => {
    getNextIndex();
  }, []);

  const [ticket_create, setTicketCreate] = useState({
    status: "",
    amount: 0,
    client_id: "",
    catalog_id: "",
    user_id: "",
    canal_id: "",
    social_id: "",
    agencia_id: "string",
    is_new_client: false,
    new_identification: "",
  });
  /* Logica */

  const [seccionActual, setSeccionActual] = useState(1);

  const [form_data_files, set_form_data_files] = useState(new FormData());

  const handleNext = () => {
    setSeccionActual(seccionActual + 1);
  };

  const handleBack = () => {
    setSeccionActual(seccionActual - 1);
  };

  const handleCreate = () => {
    // Lógica para enviar el formulario completo
  };
  function print_dataForm(data_form: FormData) {
    console.log("print_data_form function");
    for (const pair of data_form.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  }
  useEffect(() => {
    console.log(ticket_create);
  }, [ticket_create]);

  return (
    <LayoutBar opcionSeleccionada="ticket">
      <div className="sm:w-[85%] lg:w-[65%] xl:w-[55%] md:w-[70%] 2xl:w-[45%] bg-white shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md w-[90%] flex flex-col items-center justify-center">
        <div className="flex flex-row ">
          <p className=" w-full text-black text-2xl font-bold p-3">
            Generar Nuevo Ticket
          </p>
        </div>
        <div className="bg-azul w-full">
          <p className="text-white text-2xl font-bold ">
            # {nextIndex.toString().padStart(7, "0")}
          </p>
        </div>
        {/* Padre*/}
        {/* TODO simplicar formularios (sin estado) */}
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
              form_data_files={form_data_files}
              set_form_data_files={set_form_data_files}
              onBack={handleBack}
              onCreate={handleCreate}
              setTicketInfo={setTicketCreate}
              ticketInfo={ticket_create}
            />
          )}
        </div>
        <button
          onClick={() => {
            print_dataForm(form_data_files);
          }}
        >
          print form data
        </button>
      </div>
    </LayoutBar>
  );
}
