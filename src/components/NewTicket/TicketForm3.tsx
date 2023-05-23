import { useState } from "react";
import { createTicket } from "../../hooks/useTicket";
import InputFile from "../Inputs/InputFile";

type FormularioTicket3Props = {
  onBack: () => void;
  onCreate: () => void;
  setTicketInfo: Function;
  ticketInfo: createTicket;
  set_form_data_files: Function;
  form_data_files: FormData;
};

export default function TicketForm3({
  onBack,
  onCreate,
  ticketInfo,
  setTicketInfo,
  form_data_files,
  set_form_data_files,
}: FormularioTicket3Props) {
  console.log(form_data_files);
  // "status": "string",
  // "amount": 0,
  // "client_id": "string",
  // "catalog_id": "string",
  // "user_id": "string",
  // "canal_id": "string",
  // "social_id": "string",
  // "agencia_id": "string"
  return (
    <div className="w-4/5 mx-auto mt-4">
      <div className="flex flex-col">
        <div className="w-full">
          <p className="w-full text-left font-bold">
            Cargar archivos o captura de pantalla
          </p>
          <p className="w-full text-left text-sm text-gris">
            (Max. 4 archivos / Max. 1.5Mb por archivo / Max. 6Mb en general )
          </p>
          <InputFile
            set_form_data_files={set_form_data_files}
            form_data_files={form_data_files}
            required={false}
            valid_types={["image/png", "application/pdf"]}
          />
          {/*<input className=" w-full border h-32 shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md bg-blanco mt-4"></input>*/}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="w-full">
          <p className="text-left text-gris mt-2">Comentarios *</p>
          <textarea className="px-2 resize-none w-full h-32 mt-2 rounded border-black border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"></textarea>
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
