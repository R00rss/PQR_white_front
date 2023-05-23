import { ticket } from "../../../hooks/useTicket";
import icono_editar from "../../../assets/icono_editar.png";

interface EditTicketProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  getData: Function;
  selectedTicket: ticket;
}

export default function DatosPersonales({
  showPopUp,
  onClosePopUp,
  getData,
  selectedTicket,
}: EditTicketProps) {
  return (
    <div className="w-full h-[330px] pt-2 rounded-b-md shadow-lg">
      <div className="flex flex-col mt-2">
        <div className="flex flex-row  text-lg font-semibold mx-auto">
          <p>Nombre</p>
          <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" />
        </div>
        <div className="text-center mx-auto ">
          <p className="font-medium">{selectedTicket.client.client_name}</p>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row  text-lg font-semibold mx-auto">
          <p>Cedula</p>
          <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" />
        </div>
        <div className="text-center mx-auto ">
          <p className="font-medium">
            {selectedTicket.client.client_identification}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row  text-lg font-semibold mx-auto">
          <p>Correo</p>
          <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" />
        </div>
        <div className="text-center mx-auto ">
          <p className="font-medium">{selectedTicket.client.client_mail}</p>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row  text-lg font-semibold mx-auto">
          <p>Telefono</p>
          <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" />
        </div>
        <div className="text-center mx-auto ">
          <p className="font-medium">{selectedTicket.client.client_phone}</p>
        </div>
      </div>

      <button className="border border-morado p-1 mt-4 rounded-md text-base my-auto font-bold text-morado hover:bg-morado hover:text-white hover:scale-105 duration-200">
        Descargar PDF
      </button>
    </div>
  );
}
