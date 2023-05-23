import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../Layout/JWT";
import { count_tickets } from "../../services/ticket";

interface ViewUser {
  showPopUp: boolean;
  onCLosePopUp: () => void;
}

export default function ViewUser({ showPopUp, onCLosePopUp }: ViewUser) {
  const [userTickets, setUserTickets] = useState({
    in_progress_tickets: 0,
    closed_tickets: 0,
    comments_count: 0,
  });

  const { user_info } = useContext(JWTContext);

  async function getDataTickets() {
    const res = await count_tickets();
    if (res != undefined) {
      console.log("Estatus del pedido: ", res.status);
      const data_ = await res.json();
      console.log("Datos actualizados: ", data_);
      setUserTickets(data_);
    }
  }

  useEffect(() => {
    getDataTickets();
  }, []);
  if (!showPopUp) return null;
  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
      <div className="w-[min(450px,80%)] mb-32  bg-white rounded-md">
        <div className="bg-azul h-8 rounded-t-md">
          <p className=" text-center text-lg text-white font-bold">
            Datos de usuario
          </p>
        </div>
        <div className="flex flex-row my-4 h-[27%] gap-3">
          <div className="flex w-[40%] justify-end my-auto">
            <div className="rounded-full bg-morado h-20 w-20"></div>
          </div>
          <div className="w-[60%] my-auto">
            <div className="flex flex-row gap-2">
              <p className="text-morado text-3xl font-black pb-1">
                {user_info?.fullname}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-normal text-gris text-base">
                {user_info?.username}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold text-gris text-xs">{user_info?.mail}</p>
            </div>
          </div>
        </div>
        <div className="h-[70px] flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col w-[40%] gap-1">
            <p className="text-center text-morado text-sm font-bold">
              Tipo de Usuario
            </p>
            <p className="rounded-md h-6 border text-center border-gris text-gris text-sm font-semibold">
              {user_info?.user_type}
            </p>
          </div>

          <div className="flex flex-col w-[40%] ">
            <p className="text-center text-morado text-base font-bold">Perfil</p>
            <p className="rounded-md border h-6 text-center border-gris text-gris text-sm ">
              {user_info?.user_role}
            </p>
          </div>
        </div>

        <div className="h-[70px] flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col w-[40%] gap-1">
            <p className="text-center text-morado text-base font-bold">Area</p>
            <p className=" rounded-md border h-6 text-center border-gris text-gris text-sm">
              {user_info?.area}
            </p>
          </div>

          <div className="flex flex-col w-[40%] gap-1">
            <p className="text-center text-morado text-base font-bold">Cargo</p>
            <p className="rounded-md border h-6 text-center border-gris text-gris text-sm ">
              {user_info?.cargo}
            </p>
          </div>
        </div>

        <div className="flex flex-row w-[90%] mx-auto my-4 text-center justify-between">
          <div className="flex flex-col w-[35%]">
            <p className="text-4xl  font-bold text-morado">
              {userTickets.in_progress_tickets}
            </p>
            <p className="text-gris text-xs">Tickets en proceso</p>
          </div>

          <div className="flex flex-col w-[35%] ">
            <p className="text-4xl  font-bold text-morado">
              {userTickets.closed_tickets}
            </p>
            <p className="text-gris text-xs">Tickets finalizados</p>
          </div>

          <div className="flex flex-col w-[30%] ">
            <p className="text-4xl  font-bold text-morado">
              {userTickets.comments_count}
            </p>
            <p className="text-gris text-xs">Comentarios</p>
          </div>
        </div>

        <div className="flex flex-row h-9 w-[60%] mx-auto items-center justify-center my-6">
          <button
            className="h-full w-[30%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado"
            onClick={onCLosePopUp}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
