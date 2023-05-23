import { useEffect, useState, useMemo } from "react";

import { ticket } from "../../../hooks/useTicket";
import {
  parse,
  addSeconds,
  getSeconds,
  getTime,
  getHours,
  addMinutes,
} from "date-fns";

interface TimeProps {
  selectedTicket: ticket;
}

export default function Times({ selectedTicket }: TimeProps) {
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
    //const currentTime = 100000000;
    const currentDays = Math.abs(Math.floor(currentTime / day));
    const modDay = currentTime % day;

    const currentHours = Math.abs(Math.floor(modDay / hour));
    const modHours = modDay % hour;
    const currentMinutes = Math.abs(Math.floor(modHours / minute));
    const modMinutes = modHours % minute;
    const currentSeconds = Math.abs(Math.floor(modMinutes / seconds));
    const formattedDays = currentDays.toString().padStart(2, "0");
    const formattedHour = currentHours.toString().padStart(2, "0");
    const formattedMinutes = currentMinutes.toString().padStart(2, "0");
    const formattedSeconds = currentSeconds.toString().padStart(2, "0");

    const currentFormatTime = `${formattedDays}:${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
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

  return (
    <>
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
    </>
  );
}
