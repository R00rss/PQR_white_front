import React, { useState, useEffect, createContext, useContext } from "react";
import useUser from "../../../hooks/useUser";
import { ticket } from "../../../hooks/useTicket";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

interface EditTicketProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  getData: Function;
  selectedTicket: ticket;
}

export default function GestionarTicket({
  onClosePopUp,
  selectedTicket,
}: EditTicketProps) {
  interface ticket_info {
    state: string;
    scale: string;
    image: string;
    comment: string;
  }
  const usersHook = useUser();

  const users_info = usersHook.users;

  const [ticket_info, set_ticket_info] = useState<ticket_info>({
    state: selectedTicket.status,
    scale: selectedTicket.user.fullname,
    image: "",
    comment: "",
  });

  const [isCommented, set_isComented] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedScale, setSelectedScale] = useState("");

  const submit_ticket = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(ticket_info);

    if (event.currentTarget.checkValidity()) {
      console.log("Valido");
      console.log(ticket_info);
      MySwal.fire({
        title: "!Datos Cargados Correctamente¡",
        //text: "No ha rellenado todos los campos",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,

        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      });
    } else {
      console.log("No valido");

      MySwal.fire({
        title: "!Error¡",
        text: "No ha rellenado todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 3000,

        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      }).finally(() => {
        set_ticket_info({ state: "", scale: "", image: "", comment: "" });
      });
    }
  };

  return (
    <form onSubmit={submit_ticket} noValidate>
      <div className="w-full h-[450px] rounded-b-lg pt-2 shadow-lg">
        <div className="flex flex-wrap flex-col h-[100%] mb-4  mx-20">
          {/* Titulo */}
          <div className="flex flex-col w-[100%] h-[5%] items-center justify-center">
            <p className=" text-lg font-bold text-azul">Gestion de ticket</p>
          </div>
          {/*Checkbox Opciones */}
          <div className="flex flex-row w-[100%] h-[8%]">
            <div className="flex flex-row flex-wrap items-center justify-center w-[50%] h-[100%]">
              <p className="text-black text-sm font-medium mx-1">Estado</p>

              <select
                value={ticket_info.state}
                className="border border-morado h-[62%] w-[65%] mx-1 rounded text-morado bg-blanco"
                onChange={(event) => {
                  set_ticket_info({
                    ...ticket_info,
                    state: event.target.value,
                  });
                }}
                required
              >
                <option value=""></option>
                <option value="Abierto">Abierto</option>
                <option value="En progreso">En progreso</option>
                <option value="Escalado">Escalado</option>
                <option value="Cerrado">Finalizado</option>
              </select>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center w-[50%] h-[100%]">
              <p className="text-black text-sm font-medium mx-1">Escalar a</p>

              <select
                value={ticket_info.scale}
                className="border border-morado h-[62%] w-[65%] mx-1 rounded text-morado bg-blanco"
                onChange={(event) => {
                  set_ticket_info({
                    ...ticket_info,
                    scale: event.target.value,
                  });
                }}
                required
              >
                <option value=""></option>
                {users_info.map((user) => {
                  return (
                    <option key={user.user_id} value={user.fullname}>
                      {user.fullname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* Especificaciones de archivo */}

          <div className="flex flex-col items-center w-[100%] h-[8%]">
            <div className="w-[100%] h-[50%] justify-start">
              <h1 className="font-semibold text-sm">
                Cargar archivos o capturas de pantalla
              </h1>
            </div>
            <div className="w-[100%] h-[50%] justify-start">
              <p className="font-light text-xs">
                (Max. 4 archivos / Max. 1.5Mb por archivo / Max. 4Mb en general)
              </p>
            </div>
          </div>
          {/* Input Imagen */}
          <div className="flex relative items-center justify-center">
            <input
              type="file"
              onChange={(event) => {
                set_ticket_info({
                  ...ticket_info,
                  image: event.target.value,
                });
              }}
              className=" w-full border h-24 shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md bg-slate-200 mt-4"
              required
            ></input>

            <div className="absolute">
              <p className="text-xs text-gris">
                Arrastre archivos aqui pegue, o
              </p>
              <a href="" className="text-xs text-morado">
                busque en su equipo
              </a>
            </div>
          </div>

          {/* Comentarios */}

          <div className="flex flex-col items-center  w-full h-[6%]">
            <div className="flex flex-row items-center w-full h-full">
              <p className="text-start text-sm">Comentario</p>
              {!isCommented && <span className="text-red-600">*</span>}
            </div>
          </div>

          <div className="w-full h-24">
            <textarea
              name=""
              id=""
              value={ticket_info.comment}
              className="appearance-none w-full h-full bg-slate-200 rounded-lg "
              onChange={(event) => {
                set_ticket_info({
                  ...ticket_info,
                  comment: event.target.value,
                });
              }}
              required
            ></textarea>
          </div>

          {/* Botones */}
          <div className="flex justify-evenly h-auto">
            <button
              type="submit"
              className="border border-morado p-1 m-4 rounded-md text-base my-auto font-bold text-morado hover:bg-morado hover:text-white hover:scale-105 duration-200"
            >
              Guardar
            </button>
            <button
              type="button"
              className="border border-morado p-1 m-4 rounded-md text-base my-auto font-bold bg-morado text-blanco hover:bg-blanco hover:text-morado hover:scale-105 duration-200"
              onClick={onClosePopUp}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
