import React, { useState, ChangeEvent } from "react";
import AdministracionTickets from "../AdministracionTickets/AdministracionTicket";

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
      incidence_name: string;
      incidence_id: string;
      is_active: number;
      product_id: string;
    };
    product: {
      product_name: string;
      product_id: string;
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
    cargo: {
      cargo_id: string;
      cargo_name: string;
      area: {
        area_name: string;
        area_id: string;
      };
    };
    agencia: {
      agencia_name: string;
      agencia_city: string;
      agencia_id: string;
    };
    phone: string;
    is_active: number;
    user_role: {
      user_role_name: string;
      user_role_id: string;
    };
    profile_pic: string;
  };
  comment: [
    {
      comment_text: string;
      ticket_id: number;
      comment_id: string;
      created_at: string;
      user: {
        user_id: string;
        fullname: string;
        cargo: {
          cargo_id: string;
          cargo_name: string;
          area: {
            area_name: string;
            area_id: string;
          };
        };
        agencia: {
          agencia_name: string;
          agencia_city: string;
          agencia_id: string;
        };
        phone: string;
        is_active: number;
        user_role: {
          user_role_name: string;
          user_role_id: string;
        };
        profile_pic: string;
      };
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

interface TycketsDataProps {
  tickets: Array<ticket>;
  selectedTicket: ticket;
  getData: Function;
  getSelectedItem: Function;
  setSelectedTicket: Function;
}
export default function TicketsProceso({
  tickets,
  selectedTicket,
  getData,
  getSelectedItem,
  setSelectedTicket,
}: TycketsDataProps) {
  const [showPopUp, setShowPopUp] = useState(false);
  async function handleShowPopUp(id: number) {
    //console.log(id);
    const selectedProduct_ = getSelectedItem(id, "En Proceso");
    setSelectedTicket(selectedProduct_);
    setShowPopUp(true);
    console.log(getSelectedItem);
  }
  const handleClosePopUp = () => setShowPopUp(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  let maxPage = Math.ceil(tickets.length / 7);

  const filteredTickets = (): ticket[] => {
    if (search.length == 0) {
      maxPage = Math.ceil(tickets.length / 7);
      return tickets.slice(currentPage, currentPage + 7);
    } else {
      //Si hay algo en la busqueda
      const filtered = tickets.filter((ticket) =>
        [
          ticket.ticket_id,
          ticket.client.client_name,
          ticket.status,
          ticket.created_at,
        ].some((field) => search)
      );
      maxPage = Math.ceil(filtered.length / 7);
      return filtered.slice(currentPage, currentPage + 7);
    }
  };

  const nextPage = () => {
    if (
      tickets.length > currentPage + 7 &&
      tickets.filter((ticket) => ticket.user.fullname.includes(search)).length >
        currentPage + 7
    )
      setCurrentPage(currentPage + 7);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 7);
  };

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  const formatearFecha = (time: string) => {
    const date = new Date(time);

    if (date) {
      const anio = date.getFullYear();
      const mes = date.getMonth();
      const dia = date.getDay();
      const hora = date.getHours();
      const minutes = date.getMinutes();

      const formatedMonth = mes.toString().padStart(2, "0");
      const formatedDay = dia.toString().padStart(2, "0");
      const formatedHour = hora.toString().padStart(2, "0");
      const formatedMinute = minutes.toString().padStart(2, "0");

      const fecha = `${anio}-${formatedMonth}-${formatedDay} ${formatedHour}:${formatedMinute}`;

      return fecha;
    }
    return null;
  };

  return (
    <div>
      <AdministracionTickets
        showPopUp={showPopUp}
        onClosePopUp={handleClosePopUp}
        getData={getData}
        selectedTicket={selectedTicket}
      />
      <div className="w-[83%px] h-[429px] lg:h-[423px] rounded-lg border border-gris-claro mt-[-1px] cursor-pointer">
        <div className="flex flex-row bg-azul  h-[36px] rounded-t-lg justify-between text-white font-semibold ">
          <p className="w-2/6 my-auto pl-8 text-left  ">Nombres</p>
          <p className="w-1/6 my-auto ">Ticket</p>
          <p className=" w-1/6 my-auto pr-2 text-end ">Estado</p>
          <p className="w-2/6 my-auto text-center ">Fecha de cración</p>
        </div>
        {filteredTickets().map((ticket, i) => (
          <div
            key={i}
            className="w-full h-14 sm:h-14 lg:h-[55px] flex flex-row border border-b-gris-claro justify-between"
            onClick={() => {
              handleShowPopUp(ticket.ticket_id);
            }}
          >
            <p className="w-[40%] my-auto text-left pl-6 text-lg font-medium text-azul ">
              {ticket.user.fullname}
            </p>
            <p className="w-[20%] my-auto text-left ">
              #{ticket.ticket_id.toString().padStart(7, "0")}
            </p>
            <p className="w-[20%] my-auto text-start ">{ticket.status}</p>
            <p className="w-[20%] my-auto text-start ">
              {formatearFecha(ticket.created_at)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-end my-6">
        <div className="flex justify-start w-full ml-2 sm:ml-12 md:mx-auto">
          <div className="flex flex-row justify-center gap-8  md:mx-auto ">
            <button
              className="w-[85px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado duration-300"
              onClick={prevPage}
            >
              Atras
            </button>
            <button
              className=" w-[85px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado duration-300"
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
        </div>

        <div className="absolute mr-2">
          <div className="flex flex-row gap-2">
            <p>Página</p>
            <div className="w-7 text-center text-morado font-extrabold border border-morado rounded-md">
              {Math.floor((currentPage + 7) / 7)}
            </div>
            <p>de {maxPage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
