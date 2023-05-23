import React, { useState, ChangeEvent } from "react";

type TycketsData = {
  name: string;
  mail: string;
  type: string;
  state: string;
  user: string;
};
/* Arreglo de 15 tickets */
const ticketsData = [
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Samir Fernando Zurita Mera",
    mail: "ejecutivos2",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  {
    name: "Garzon Flores Mónica Paulina",
    mail: "ejecutivos2@kimobill.com",
    type: "Ingresador",
    state: "Activo",
    user: "paola.yanez",
  },
  
];

export default function AdministracionUsuarios() {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  let maxPage = Math.ceil(ticketsData.length / 7);

  const filteredTickets = (): TycketsData[] => {
    if (search.length == 0) {
      maxPage = Math.ceil(ticketsData.length / 7);
      return ticketsData.slice(currentPage, currentPage + 7);
    } else {
      //Si hay algo en la busqueda
      const filtered = ticketsData.filter((ticket) =>
        ticket.name.toLowerCase().includes(search.toLowerCase())
      );
      maxPage = Math.ceil(filtered.length / 7);
      return filtered.slice(currentPage, currentPage + 7);
    }
  };

  const nextPage = () => {
    if (
      ticketsData.length > currentPage + 7 &&
      ticketsData.filter((ticket) => ticket.name.includes(search)).length >
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

  return (
    <div className="w-[920px]">
      {/* Hijo 1 */}
      <div className="flex flex-row gap-4">
        <p className="text-gris text-base my-auto">Buscar</p>
        <input
          className="w-1/2 rounded-md border-gris-claro border focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
          placeholder="buscar ticket .."
          type="text"
          value={search}
          onChange={onSearchChange}
        ></input>
      </div>

      

      {/* Hijo 3 */}

      <div className="w-[940px] h-[372px] rounded-lg border border-gris-claro mt-4 cursor-pointer">
        <div className="flex flex-row bg-azul  h-[36px] rounded-t-lg justify-between text-white font-semibold ">
          <p className="w-2/6 my-auto pl-8 text-left  ">Nombres</p>
          <p className="w-1/6 my-auto ">Correo</p>
          <p className=" w-2/6 my-auto pr-2 text-end ">Tipo de Usuario</p>
          <p className="w-1/6 my-auto pl-8 ">Estado</p>
          <p className="w-1/6 my-auto text-center ">User ID</p>
        </div>
        {filteredTickets().map((ticket) => (
          <div className=" w-full h-12 flex flex-row border border-b-gris-claro">
            <p className="w-[31%] my-auto pl-6 text-left text-base font-medium text-azul  ">
              {ticket.name}
            </p>
            <p className="w-[27%] my-auto text-start ">{ticket.mail}</p>
            <p className="w-[17%] my-auto text-start ">{ticket.type}</p>
            <p className="w-[12%] my-auto">{ticket.state}</p>
            <p className="w-[13%] my-auto">{ticket.user}</p>
          </div>
        ))}
      </div>

      {/* Hijo4 */}
      <div className="flex flex-row justify-end mt-6">
        <div className="flex flex-row justify-center gap-8 mx-auto">
          <button
            className="w-[85px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado hover:scale-105 hover:duration-200"
            onClick={prevPage}
          >
            Atras
          </button>
          <button
            className=" w-[85px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado hover:scale-105 hover:duration-200"
            onClick={nextPage}
          >
            Siguiente
          </button>
        </div>

        <div className="absolute mr-2">
          <div className="flex flex-row gap-2">
            <p>Página</p>
            <input
              className="w-7 text-center text-morado font-extrabold border border-morado rounded-md"
              placeholder=""
              type="text"
              value={Math.floor((currentPage + 7) / 7)}
            ></input>
            <p>de {maxPage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
