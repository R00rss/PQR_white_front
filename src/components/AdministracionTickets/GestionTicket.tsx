import React, { useState, useEffect, createContext, useContext } from "react";

import {
  parse,
  addSeconds,
  getSeconds,
  getTime,
  getHours,
  addMinutes,
} from "date-fns";

import icono_visto from "../../assets/icono_doble-verificacion.png";
import foto_perfil from "../../assets/foto_perfil.webp";
import icono_editar from "../../assets/icono_editar.png";

type ticket = {
  status: string;
  amount: number;
  ticket_id: number;
  client: {
    client_id: string;
    client_identification: string;
    client_name: string;
    client_mail: string;
    client_phone: string;
    created_at: string;
  };
  catalog: {
    catalog_id: string;
    types: {
      type_name: string;
      is_active: number;
      type_id: string;
    };
    incidence: {
      product_id: string;
      incidence_name: string;
      incidence_id: string;
      is_active: number;
    };
    area: {
      area_name: string;
      area_id: string;
    };
    catalog_time: number;
    is_active: number;
  };
  user: {
    user_id: string;
    fullname: string;
    cargo_id: string;
    agencia_id: string;
    phone: string;
    is_active: number;
    user_role_id: string;
    profile_pic: string;
  };
  comment: [
    {
      comment_text: string;
      ticket_id: string;
      comment_id: string;
      created_at: string;
    }
  ];
  files: [
    {
      file_name: string;
      file_path: string;
      ticket_id: string;
      file_id: string;
    }
  ];
  canal: {
    canal_name: string;
    canal_id: string;
  };
  social: {
    social_name: string;
    social_id: string;
  };
  created_at: string;
};

interface EditTicketProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  getData: Function;
  selectedTicket: ticket;
}
interface gestionTicketProp {}
const EditTicket = createContext(null);

export default function AdministracionTickets({
  showPopUp,
  onClosePopUp,
  getData,
  selectedTicket,
}: EditTicketProps) {
  const [statePopup, onCLosePopUp] = useState(showPopUp);

  const [ticket_info, setTicketInfo] = useState<ticket>(selectedTicket);

  const ticket_inicio = new Date(ticket_info.created_at);
  const ticket_time = ticket_info.catalog.catalog_time;
  //const tiempo_fin = parse(ticket_actual.maxtime, "DD:HH:mm:ss", new Date());
  //const segundos =
  const tiempoMax = addMinutes(ticket_inicio, ticket_time);
  //tiempo_fin.getSeconds() +
  //tiempo_fin.getMinutes() * 60 +
  //tiempo_fin.getHours() * 3600 +
  //tiempo_fin.getDay() * 3600 * 24 ;

  //const ticket_max = new Date(ticket_actual.maxtime);
  //const actualdate: Date = new Date();
  const [comments, setComments] = useState(ticket_info.comment);
  const [hora, setHora] = useState("");
  const [timeRest, setTimeRest] = useState("");
  const [timeInit, setTimeInit] = useState("");
  const [timeFinal, setTimeFinal] = useState("");
  const [timeExcess, setTimeExcess] = useState("");
  const [progressWidth, set_ProgressWidth] = useState<number>(0);
  const maxProgressWidth: number = 100;

  const formatRange = (dateInit: Date, dateEnd: Date) => {
    // constantes necesarias

    const seconds = 1000;
    const minute = seconds * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const inicioSeconds = dateInit.getTime();
    const finSeconds = dateEnd.getTime();
    const currentTime = finSeconds - inicioSeconds;

    const currentDays = Math.abs(Math.round(currentTime / day));
    const modDay = currentTime % day;

    const currentHours = Math.abs(Math.round(modDay / hour));
    const modHours = currentTime % hour;
    const currentMinutes = Math.abs(Math.round(modHours / minute));
    const modMinutes = modHours % minute;
    const currentSeconds = Math.abs(Math.round(modMinutes / seconds));
    const formatedDays = currentDays.toString().padStart(2, "0");
    const formattedHour = currentHours.toString().padStart(2, "0");
    const formattedMinutes = currentMinutes.toString().padStart(2, "0");
    const formattedSeconds = currentSeconds.toString().padStart(2, "0");

    const currentFormatTime = `${formatedDays}:${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
    return currentFormatTime;
  };

  const formatearTiempo = (time: Date) => {
    const horas = time.getHours();
    const minutos = time.getMinutes();
    const segundos = time.getSeconds();
    const horaActual = `${horas}:${minutos}:${segundos}`;

    return horaActual;
  };
  // UseEffect para hora

  useEffect(() => {
    // Función para actualizar la hora cada segundo
    const actualizarHora = () => {
      // Hora actual
      const fecha = new Date();

      // seteo del formato de horas
      const horas = fecha.getHours();
      const minutos = fecha.getMinutes();
      const segundos = fecha.getSeconds();

      const totalRangePercent = tiempoMax.getTime() - ticket_inicio.getTime();
      const currentRangePercent = fecha.getTime() - ticket_inicio.getTime();
      const increment = (currentRangePercent / totalRangePercent) * 100;

      const horaActual = `${horas}:${minutos}:${segundos}`;
      const currentRange = formatRange(ticket_inicio, fecha);
      const restRange = formatRange(fecha, tiempoMax);
      const totalRange = formatRange(ticket_inicio, tiempoMax);

      setHora(horaActual);
      setTimeInit(currentRange);
      setTimeFinal(totalRange);

      if (currentRangePercent < totalRangePercent) {
        set_ProgressWidth(increment);
        setTimeRest(restRange);
        setTimeExcess("00:00:00:00");
      } else {
        setTimeRest("00:00:00:00");

        set_ProgressWidth(100);
        setTimeExcess(restRange);
      }
    };

    // Actualizar la hora cada segundo
    const intervalo = setInterval(actualizarHora, 1000);

    // Limpieza del intervalo
    return () => clearInterval(intervalo);
  }, []);

  const [selectedButton, setSelectedButton] = useState("button1");

  //use state de barra de progreso del ticket

  const handleButtonClick = (buttonId: React.SetStateAction<string>) => {
    setSelectedButton(buttonId);
  };

  const renderComponent = () => {
    if (selectedButton === "button1") {
      return (
        <DatosPersonales
          showPopUp={showPopUp}
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    } else if (selectedButton === "button2") {
      return (
        <Incidencias
          showPopUp={showPopUp}
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    } else if (selectedButton === "button3") {
      return (
        <Comentario
          showPopUp={showPopUp}
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    } else if (selectedButton === "button4") {
      return (
        <GestionarTicket
          showPopUp={showPopUp}
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedTicket={selectedTicket}
        />
      );
    }
  };

  if (!showPopUp) return null;
  return (
    <div className="flex fixed w-full h-full duration-100 bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
      <div className="bg-blanco w-[600px] rounded-lg ">
        <div className="flex flex-row w-[100%] h-[40px] text-xs font-light rounded-t-md  bg-blanco shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
          <div className="text-sm font-semibold  w-1/4 text-end pr-6 my-auto ">
            <p>Tiempos </p>
          </div>
          {/* Maximo */}
          <div className="w-[15%] text-start my-auto">
            <p className="font-semibold">Maximo</p>
            <time>{timeFinal}</time>
          </div>
          {/* Total */}
          <div className="w-[15%] text-start my-auto">
            <p className="font-semibold">Actual</p>
            {/* el tiempo que se ha demorado hasta el momento la gestion  */}
            <time>{timeInit}</time>
          </div>
          {/* Restante */}
          <div className="w-[15%] text-start my-auto">
            <p className="font-semibold">Restante</p>
            {/* tiempo total menos el actual */}
            <time>{timeRest}</time>
          </div>
          {/* Excedido */}
          <div className="w-[15%] text-start my-auto">
            <p className="font-semibold">Excedido</p>
            <time>{timeExcess}</time>
          </div>

          {/* {Time.map((time) => (
          <div className="w-[15%] text-start my-auto">
            <p className="font-semibold">{time.name}</p>
            <time>{time.time = hora}</time>
          </div>
        ))} */}
        </div>

        <div className="bg-cyan-500 h-2">
          <div
            className={` h-[100%] duration-100  ${
              progressWidth === maxProgressWidth ? "bg-red-500" : "bg-green-400"
            }`}
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="bg-azul h-[35px] text-white text-2xl font-bold text-center">
          <p>#{ticket_info.ticket_id.toString().padStart(5, "0")}</p>
        </div>

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
          <div>{renderComponent()}</div>
        </div>

        {/* +++++++++++++++ */}
      </div>
      {/* TARJETAS */}
    </div>
  );
}
/* Componente  */

function Incidencias({
  showPopUp,
  onClosePopUp,
  getData,
  selectedTicket,
}: EditTicketProps) {
  return (
    <div className="w-full rounded-b-lg shadow-lg pt-2">
      <div className="flex flex-wrap mt-5 mx-20 ">
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Creado por</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.user.fullname}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Agente Asignado</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.user.fullname}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Tipo</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.types.type_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Incidencia</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.incidence.incidence_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Producto</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.incidence.product_id}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Area</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.area.area_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Canal</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.canal.canal_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Agencia</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.user.agencia_id}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Red Social</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.social.social_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Monto</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.amount}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Tiempo de Respuesta</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.catalog_time}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Primer Comentario</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.comment[0].comment_text}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <button className="border border-morado text-morado font-bold rounded my-4 duration-500 hover:scale-[1.1] hover:text-white hover:bg-morado">
          <p className="px-1 py-2 ">Descargar PDF</p>
        </button>
      </div>
    </div>
  );
}

function Comentario({
  showPopUp,
  onClosePopUp,
  getData,
  selectedTicket,
}: EditTicketProps) {
  const [mostrarComentarios, set_mostrarComentarios] = useState(true);

  return (
    <div className="w-full rounded-b-lg pt-2 shadow-lg">
      <div className="flex flex-wrap justify-center mt-5 mx-14">
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
              <div>
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
                        {comment.created_at}
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
            <div>
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
                  <p className="font-light text-xs px-2">
                    Error {files.file_name}
                  </p>
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

function DatosPersonales({
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

function GestionarTicket({ showPopUp, onClosePopUp }: EditTicketProps) {
  interface ticket_info {
    state: string;
    scale: string;
    comment: string;
  }

  const [ticket_info, set_ticket_info] = useState<ticket_info>({
    state: "",
    scale: "",
    comment: "",
  });

  const [isCommented, set_isComented] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedScale, setSelectedScale] = useState("");

  const submit_ticket = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(ticket_info);

    if (event.currentTarget.checkValidity()) {
      console.log("Valido");
      console.log(ticket_info);
    } else {
      console.log("No valido");
    }
  };

  return (
    <form action="" onSubmit={submit_ticket}>
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
                value={selectedState}
                className="border border-morado h-[50%] w-[65%] mx-1 rounded text-morado bg-blanco"
                onChange={(event) => {
                  set_ticket_info({
                    ...ticket_info,
                    state: event.target.value,
                  });
                  setSelectedState(event.target.value);
                }}
                required
              >
                <option value=""></option>
                <option value="Escalado">Escalado</option>
                <option value="Inicializado">Inicializado</option>
              </select>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center w-[50%] h-[100%]">
              <p className="text-black text-sm font-medium mx-1">Escalar a</p>

              <select
                value={selectedScale}
                className="border border-morado h-[50%] w-[65%] mx-1 rounded text-morado bg-blanco"
                onChange={(event) => {
                  set_ticket_info({
                    ...ticket_info,
                    scale: event.target.value,
                  });
                  setSelectedScale(event.target.value);
                }}
                required
              >
                <option value=""></option>
                <option value="Samir Zurita">Samir Zurita</option>
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
              className="appearance-none w-full h-full bg-slate-200 rounded-lg resize-none"
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
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="border border-morado p-1 m-4 rounded-md text-base my-auto font-bold text-morado hover:bg-morado hover:text-white hover:scale-105 duration-200"
            >
              Guardar
            </button>
            <button
              type="button"
              className="border border-morado p-1 mt-4 rounded-md text-base my-auto font-bold bg-morado text-blanco hover:bg-blanco hover:text-morado hover:scale-105 duration-200"
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
