import React, { useState, useEffect, createContext, useContext } from "react";
import { ticket } from "../../../hooks/useTicket";
import icono_visto from "../../../assets/icono_doble-verificacion.png";
import foto_perfil from "../../../assets/foto_perfil.webp";
import icono_editar from "../../../assets/icono_editar.png";
interface EditTicketProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  getData: Function;
  selectedTicket: ticket;
}

export default function Comentario({
  showPopUp,
  onClosePopUp,
  getData,
  selectedTicket,
}: EditTicketProps) {
  const [mostrarComentarios, set_mostrarComentarios] = useState(true);
  const formatearFecha = (time: string) => {
    const date = new Date(time);

    const anio = date.getFullYear();
    const mes = date.getMonth();
    const dia = date.getDay();
    const hora = date.getHours();
    const minutes = date.getMinutes();

    const formatedMonth = mes.toString().padStart(2, "0");
    const formatedDay = dia.toString().padStart(2, "0");
    const formatedHour = dia.toString().padStart(2, "0");
    const formatedMinute = dia.toString().padStart(2, "0");

    const fecha = `${anio}/${formatedMonth}/${formatedDay} ${formatedHour}: ${formatedMinute}`;

    return fecha;
  };

  return (
    <div className="w-full rounded-b-lg pt-2 shadow-lg" onClick={onClosePopUp}>
      <div
        className="flex flex-wrap justify-center mt-5 mx-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`font-bold rounded my-2 mx-2 p-2 duration-500 hover:scale-[1.1] ${
            mostrarComentarios
              ? "border bg-azul border-azul text-blanco"
              : "border border-morado text-morado"
          }`}
          onClick={() => {
            set_mostrarComentarios(true);
          }}
        >
          Comentarios
        </button>
        <button
          className={`font-bold rounded my-2 mx-2 p-2 duration-500 hover:scale-[1.1]   ${
            mostrarComentarios
              ? "border border-morado text-morado"
              : "  border bg-azul border-azul text-blanco"
          }`}
          onClick={() => {
            set_mostrarComentarios(false);
          }}
        >
          Capturas
        </button>
      </div>
      {mostrarComentarios && (
        <div className="mx-14 justify-center overflow-y-scroll  h-[350px]">
          <div>
            {selectedTicket.comment.map((comment) => (
              <div key={comment.comment_id}>
                {/* Tarjeta */}
                <div className=" shadow-[0px_0px_10px_-3px_rgba(0,0,0,0.4)] rounded-xl mx-auto w-[90%] h-[100%] my-2">
                  <div className="flex flex-row w-[100%] h-[45%]">
                    {/* Nombre Cliente */}
                    <div className=" flex flex-row items-center w-[50%] h-[50px] ">
                      {/* Icono */}
                      <div className="rounded-full bg-slate-600 h-[80%] aspect-square mx-3 overflow-hidden">
                        <img src={foto_perfil} alt="" />
                      </div>
                      <div className="font-semibold text-azul">
                        <h1>{selectedTicket.user.fullname}</h1>
                      </div>
                    </div>
                    {/* Fecha Comentario */}
                    <div className=" flex flex-row items-center justify-end w-[50%] h-[50px]">
                      <p className="mx-6 font-light text-sm text-azul">
                        {formatearFecha(comment.created_at)}
                      </p>
                    </div>
                  </div>
                  {/*Contenido Comentario */}
                  <div className="h-[55%]">
                    <div className=" flex flex-col w-[100%] h-[100%]">
                      <div className="w-[100%] h-[80%]">
                        <p className="font-normal text-[10px] pt-0 px-2 pb-0 text-plomo">
                          {comment.comment_text}
                        </p>
                      </div>
                      <div className="flex  justify-end w-[100%] h-[20%]">
                        {/* Icono Visto */}
                        <div className="h-[20px] aspect-square mx-2">
                          <img src={icono_visto} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenedor Capturas */}
      {!mostrarComentarios && (
        <div className=" flex flex-row flex-wrap mx-14 justify-start overflow-y-scroll  h-[350px]">
          {selectedTicket.files.map((files) => (
            <div key={files.file_id}>
              {/* Tarjeta Capturas */}
              <div className="flex flex-col items-center flex-wrap m-3 w-[120px] h-[250px]">
                {/* Nombre Usuario */}
                <div className="flex flex-row text-start items-center w-[100%] h-[12%]">
                  <p className="text-azul font-semibold">
                    {selectedTicket.user.fullname}
                  </p>
                </div>
                {/* Imagen Captura */}
                <div className=" bg-plomo w-[100%] aspect-square">
                  <img src="" alt="" />
                </div>
                {/* Fecha Captura */}
                <div className="flex flex-row items-center justify-end w-[100%] h-[8%]">
                  <p className="font-light text-xs px-2">{files.file_name}</p>
                </div>
                {/* Comentario Captura */}
                <div className="w-[100%] h-[16%] overflow-hidden overflow-ellipsis">
                  <p className="text-xs font-light p-1">{files.file_path}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Parte boton */}

      <div className="flex justify-center pb-5">
        <button className=" border border-morado text-morado font-bold rounded my-2 duration-500 hover:scale-[1.1] hover:text-white hover:bg-morado">
          <p className="px-1 py-2 ">Descargar PDF</p>
        </button>
      </div>
    </div>
  );
}
