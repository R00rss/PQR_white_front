import React, { useState, ChangeEvent, createContext } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import icono_alerta from "../../assets/icono_alerta.png";
import TicketsPendientes from "../../components/SearchTicket/TicketsPendientes";
import TicketsProceso from "../../components/SearchTicket/TicketsProceso";
import TicketsFinalizados from "../../components/SearchTicket/TicketsFinalizados";
import useTicket from "../../hooks/useTicket";

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

/* Arreglo de 15 tickets */

export const ContextoSearch = createContext({ search_text: "" });
export default function SearchTicket() {
  const {
    openTickets,
    inProcessTickets,
    closedTickets,
    setOpenTickets,
    setInProcessTickets,
    setClosedTickets,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedTicket,
    setSelectedTicket,
  } = useTicket();
  /* Botones */
  const [selectedButton, setSelectedButton] = useState("button1");
  const [search_text, set_search_text] = useState("");
  const handleButtonClick = (buttonId: React.SetStateAction<string>) => {
    setSelectedButton(buttonId);
  };

  const RenderComponent = () => {
    if (selectedButton === "button1") {
      return (
        <TicketsPendientes
          tickets={openTickets}
          selectedTicket={selectedTicket}
          getData={getData}
          getSelectedItem={getSelectedItem}
          setSelectedTicket={setSelectedTicket}
        />
      );
    } else if (selectedButton === "button2") {
      return (
        <TicketsProceso
          tickets={inProcessTickets}
          selectedTicket={selectedTicket}
          getData={getData}
          getSelectedItem={getSelectedItem}
          setSelectedTicket={setSelectedTicket}
        />
      );
    } else if (selectedButton === "button3") {
      return (
        <TicketsFinalizados
          tickets={closedTickets}
          selectedTicket={selectedTicket}
          getData={getData}
          getSelectedItem={getSelectedItem}
          setSelectedTicket={setSelectedTicket}
        />
      );
    }
    return <></>;
  };

  return (
    <LayoutBar opcionSeleccionada="ticket">
      <div className="w-[90%] lg:w-[83%]">
        <div className="flex flex-row gap-4">
          <p className="text-gris text-base my-auto">Buscar</p>
          <input
            className="w-1/2 rounded-md border-gris-claro border focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
            placeholder=" buscar ticket .."
            type="text"
            value={search_text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              set_search_text(e.target.value)
            }
          ></input>
          <span className="flex flex-row gap-2">
            <img
              src={icono_alerta}
              alt="icono alerta"
              className="h-4 w-4 my-auto font-semibold hover:scale-110 duration-300"
            />
            <p className="text-gris text-sm my-auto font-semibold">
              {openTickets.length} tickets sin gestionar
            </p>
          </span>
        </div>

        <div className="flex flex-row gap-3 w-[95%] mx-auto mt-4">
          <span
            className="flex flex-row cursor-pointer w-1/3"
            onClick={() => handleButtonClick("button1")}
          >
            <div
              className={`flex flex-row text-sm w-full h-[25px] justify-between bg-gris-claro rounded-t-lg px-2 hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black duration-300 ${
                selectedButton === "button1" &&
                "bg-white border border-gris-claro text-morado font-black text-base"
              }`}
            >
              <p className="my-auto font-semibold pl-4">Pendientes</p>
              <p className="my-auto font-semibold">{openTickets.length}</p>
            </div>
          </span>

          <span
            className="flex flex-row cursor-pointer w-1/3"
            onClick={() => handleButtonClick("button2")}
          >
            <div
              className={`flex flex-row text-sm w-full h-[25px] justify-between bg-gris-claro rounded-t-lg px-2 hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black duration-300 ${
                selectedButton === "button2" &&
                "bg-white border border-gris-claro text-morado font-bold text-base"
              }`}
            >
              <p className="my-auto font-semiRenderComponentold ">En proceso</p>
              <p className="my-auto font-semibold">{inProcessTickets.length}</p>
            </div>
          </span>

          <span
            className="flex flex-row cursor-pointer w-1/3"
            onClick={() => handleButtonClick("button3")}
          >
            <div
              className={`flex flex-row text-sm w-full h-[25px] justify-between bg-gris-claro rounded-t-lg px-2 hover:bg-white hover:border hover:border-gris-claro hover:text-morado hover:font-black duration-300 ${
                selectedButton === "button3" &&
                "bg-white border border-gris-claro text-morado font-black text-base"
              }`}
            >
              <p className="my-auto font-semibold">Finalizado</p>
              <p className="my-auto font-semibold">{closedTickets.length}</p>
            </div>
          </span>
        </div>

        <div>
          <ContextoSearch.Provider value={{ search_text }}>
            <RenderComponent />
          </ContextoSearch.Provider>
        </div>
      </div>
    </LayoutBar>
  );
}
