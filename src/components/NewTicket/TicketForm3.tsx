import { createTicket } from "../../hooks/useTicket";

type FormularioTicket3Props = {
  onBack: () => void;
  onCreate: () => void;
  setTicketInfo: Function;
  ticketInfo: createTicket;
};

export default function TicketForm3({
  onBack,
  onCreate,
}: FormularioTicket3Props) {
  return (
    <div className="w-4/5 mx-auto mt-4">
      <div className="flex flex-col">
        <div className="w-full">
          <p className="w-full text-left font-bold">
            Cargar archivos o captura de pantalla
          </p>
          <p className="w-full text-left text-sm text-gris">
            (Max. 4 archivos / Max. 1.5Mb por archivo / Max. 4Mb en general )
          </p>
          <input className=" w-full border h-32 shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md bg-blanco mt-4"></input>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="w-full">
          <p className="text-left text-gris mt-2">Comentarios *</p>
          <textarea className="resize-none w-full h-32 mt-2 rounded border-black border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"></textarea>
        </div>
      </div>
      <div className="w-[70%] sm:w-3/5 flex flex-row mx-auto my-4 gap-6 md:gap-10">
        <div
          className="h-[35px] w-[50%] sm:w-[60%] border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex items-center justify-center"
          onClick={onBack}
        >
          <button>Regresar</button>
        </div>
        <div
          className="h-[35px] w-[50%] sm:w-[40%] border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex items-center justify-center"
          onClick={onCreate}
        >
          <button>Crear</button>
        </div>
      </div>
    </div>
  );
}
