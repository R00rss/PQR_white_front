import { useState } from "react";
import icono_descargar from "../../assets/icono_descargar.png";
import icono_csv from "../../assets/icono_csv.png";
import icono_pdf from "../../assets/icono_pdf.png";
import icono_excel from "../../assets/icono_excel.png";
interface BusquedaCatalogoProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
}

type CatalogData = {
  id_type: string;
  id: string;
  name: string;
  mail: string;
  phone: string;
  prodcut: string;
  type: string;
  incidence: string;
  area: string;
  channel: string;
  agency: string;
  date: string;
  state: string;
};

const catalogData = [
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "mg@mg.com",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "samir2304.zurita2304@gmail.com",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
  {
    id_type: "Cédula",
    id: "123456789",
    name: "Garzon Flores Mónica Paulina",
    mail: "",
    phone: "0987654321",
    prodcut: "Cuenta de ahorros",
    type: "Consulta",
    incidence: "Consulta de saldo",
    area: "Banca personal",
    channel: "Agencia",
    agency: "Agencia 1",
    date: "01/01/2021",
    state: "Abierto",
  },
];

export default function BusquedaCatalogo({
  showPopUp,
  onClosePopUp,
}: BusquedaCatalogoProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  let maxPage = Math.ceil(catalogData.length / 10);

  const filteredCatalogData = (): CatalogData[] => {
    if (search.length === 0) {
      maxPage = Math.ceil(catalogData.length / 10);
      return catalogData.slice(currentPage, currentPage + 10);
    } else {
      const filtered = catalogData.filter((item) =>
        [
          item.id_type,
          item.id,
          item.name,
          item.mail,
          item.phone,
          item.prodcut,
          item.type,
          item.incidence,
          item.area,
          item.channel,
          item.agency,
          item.date,
          item.state,
        ].some((value) => value.toLowerCase().includes(search.toLowerCase()))
      );
      maxPage = Math.ceil(filtered.length / 10);
      return filtered.slice(currentPage, currentPage + 10);
    }
  };

  const NextPage = () => {
    if (
      catalogData.length > currentPage + 10 &&
      catalogData.filter((catalog) => catalog.name.includes(search)).length >
        currentPage + 10
    )
      setCurrentPage(currentPage + 10);
  };

  const PrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 10);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };
  if (!showPopUp) return null;

  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
      <div className="w-[90%] mx-auto my-auto bg-white rounded-md">
        <div className="flex flex-row w-full rounded-t-md h-[60px]">
          <div className="flex flex-row w-1/3 h-full gap-4 items-center justify-center">
            <p className="text-slate-700 pl-2">Buscar</p>
            <input
              className=" w-full h-[40%] border border-slate-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={onSearchChange}
              placeholder=" Buscar...."
            />
            {/* <img src={icono_descargar} className="h-[35%] w-[5%]" /> */}
          </div>
          {/* <img src={icono_descargar} className="h-[35%] w-[5%]" /> */}
          <div className="w-1/3 flex flex-row gap-4 items-center pl-2">
            <img src={icono_csv} className="w-[5%] h-[30px] cursor-pointer"/>
            <img src={icono_excel} className="w-[5%] h-[30px] cursor-pointer"/>
            <img src={icono_pdf} className="w-[5%] h-[30px] cursor-pointer"/>
          </div>
          <div className="flex items-center justify-end w-1/3 pr-2">
            <button
              className="rounded-md border border-morado text-morado w-[20%] h-[60%] hover:text-white hover:bg-morado hover:font-bold duration-200"
              onClick={onClosePopUp}
            >
              cerrar
            </button>
          </div>
        </div>
        <div className="h-[65%] overflow-x-auto">
          <div className="bg-azul w-[3250px] h-[12%] grid grid-cols-[repeat(13,250px)] items-center">
            <div className="text-white">
              <p>Tipo de identificación</p>
            </div>
            <div className="text-white">
              <p>Identificación</p>
            </div>
            <div className="text-white">
              <p>Nombre Cliente</p>
            </div>
            <div className="text-white">
              <p>Correo cliente</p>
            </div>
            <div className="text-white">
              <p>Teléfono cliente</p>
            </div>
            <div className="text-white">
              <p>Producto</p>
            </div>
            <div className="text-white">
              <p>Tipo</p>
            </div>
            <div className="text-white">
              <p>Incidencia</p>
            </div>
            <div className="text-white">
              <p>Área</p>
            </div>
            <div className="text-white">
              <p>Canal</p>
            </div>
            <div className="text-white">
              <p>Agencia</p>
            </div>
            <div className="text-white">
              <p>Fecha de apertura</p>
            </div>
            <div className="text-white">
              <p>Estado</p>
            </div>
          </div>
          {filteredCatalogData().map((catalog, i) => (
            <div
              className="grid grid-cols-[repeat(13,250px)] items-center"
              key={i}
            >
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.id_type}</p>
              </div>
              <div className="text-black border-b border-slate-300 h-full">
                <p>{catalog.id}</p>
              </div>
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.name}</p>
              </div>
              <div className="text-black border-b border-slate-300 h-full">
                <p>{catalog.mail}</p>
              </div>
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.phone}</p>
              </div>
              <div className="text-black border-b border-slate-300 h-full">
                <p>{catalog.prodcut}</p>
              </div>
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.type}</p>
              </div>
              <div className="text-black border-b border-slate-300 h-full">
                <p>{catalog.incidence}</p>
              </div>
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.area}</p>
              </div>
              <div className="text-black border-b border-slate-300 h-full">
                <p>{catalog.channel}</p>
              </div>
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.agency}</p>
              </div>
              <div className="text-black border-b border-slate-300 h-full">
                <p>{catalog.date}</p>
              </div>
              <div className="text-black border-b border-slate-300 bg-neutral-200 h-full">
                <p>{catalog.state}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-end my-6">
          <div className="flex flex-row justify-center gap-8 mx-auto w-[20%]">
            <button
              className="w-[40%] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado duration-200"
              onClick={PrevPage}
            >
              Atras
            </button>
            <button
              className=" w-[40%] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado duration-200"
              onClick={NextPage}
            >
              Siguiente
            </button>
          </div>

          <div className="absolute mr-4">
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
    </div>

    // <div className="overflow-x-auto w-[1000px] h-screen absolute bg-black top-0 z-20 ">
    //   <div className="grid grid-cols-[repeat(10,250px)] ">
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //     <div className="border-2 text-slate-100">item</div>
    //   </div>
    // </div>
  );
}

{
  /* <div className="grid grid-cols-[repeat(13,250px)] items-center">
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Tipo de identificación</p>
</div>
<div className="text-black border-b border-slate-300">
  <p>Identificación</p>
</div>
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Nombre Cliente</p>
</div>
<div className="text-black border-b border-slate-300">
  <p>Correo cliente</p>
</div>
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Teléfono cliente</p>
</div>
<div className="text-black border-b border-slate-300">
  <p>Producto</p>
</div>
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Tipo</p>
</div>
<div className="text-black border-b border-slate-300">
  <p>Incidencia</p>
</div>
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Área</p>
</div>
<div className="text-black border-b border-slate-300 ">
  <p>Canal</p>
</div>
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Agencia</p>
</div>
<div className="text-black border-b border-slate-300">
  <p>Fecha de apertura</p>
</div>
<div className="text-black border-b border-slate-300 bg-neutral-200">
  <p>Estado</p>
</div>
</div> */
}