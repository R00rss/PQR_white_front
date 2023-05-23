import { ChangeEvent, useEffect, useState } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import AgregarCatalogo from "../../components/Configuration/AgregarCatalogo";
import useCatalogo from "../../hooks/useCatalogo";
import EditCatalog from "../../components/EditCatalog/EditCatalog";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { update_catalog_state } from "../../services/catalog";
import { Link } from "react-router-dom";
const MySwal = withReactContent(Swal);

interface ITypes {
  type_name: string;
  is_active: string;
  type_id: string;
}
interface IIncidence {
  incidence_name: string;
  incidence_id: string;
  is_active: number;
  product_id: string;
}

interface IProduct {
  product_name: string;
  product_id: string;
  is_active: number;
}
interface ICargos {}
interface IArea {
  area_name: string;
  area_id: string;
  cargos: ICargos;
}

interface Catalog {
  catalog_id: string;
  types: ITypes;
  incidence: IIncidence;
  product: IProduct;
  area: IArea;
  catalog_time: string;
  is_active: number;
}

const NUM_MAX_PAGES = 6;

export default function Catalogo() {
  // const [catalogInfo, setCatalogInfo] = useState<Catalog[]>([]);
  const {
    catalog,
    set_Selected_Catalog,
    getSelectedItemCatalog,
    getData,
    selected_Catalog,
  } = useCatalogo();

  /////////////////////////////////////////////
  // Funcion para cambiar estado
  async function editState(id: string) {
    console.log("id:", id);
    MySwal.fire({
      html: (
        <>
          <h1 className="text-2xl text-slate-700">
            Desea guardar los cambios?
          </h1>
        </>
      ),

      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-morado text-white rounded-2xl h-[40px] w-[140px] px-2 mr-1 border-2 border-morado hover:bg-transparent hover:text-morado duration-500",
        denyButton:
          "bg-red-400 text-white rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 duration-500",
        popup: "bg-azul text-text rounded-3xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selected_Catalog_ = getSelectedItemCatalog(id);
        console.log("variable", selected_Catalog_);
        if (!selected_Catalog_) return;
        const new_staus_catalog = {
          ...selected_Catalog_,
          is_active: selected_Catalog_.is_active === 1 ? 0 : 1,
        };

        set_Selected_Catalog(new_staus_catalog);

        const res = await update_catalog_state(new_staus_catalog); //service
        if (res != undefined) {
          console.log("Estatus del pedido: ", res.status);
          const data_ = await res.json();
          getData();
          console.log("Datos actualizados: ", data_);
        }
      } else if (result.isDenied) {
        MySwal.fire("Los Cambios no han sido guardados", "", "info");
      }
    });
  }
  /////////////////////////////////////////////

  console.log(catalog);
  // const [isActive, setIsActive] = useState(false);
  const [catalogoData, setcatalogoData] = useState<Catalog[]>([]);
  const [filter_catalog, set_filter_catalog] = useState<Catalog[] | null>(null);

  useEffect(() => {
    setcatalogoData(catalog);
  }, [catalog]);

  const handleClick = (id: string) => {
    console.log("Este es el id de entrada", id);
    const aux = catalogoData.map((catalog) => {
      console.log(catalog.catalog_id, id, catalog.catalog_id === id);
      if (catalog.catalog_id === id) {
        return { ...catalog, is_active: catalog.is_active === 1 ? 0 : 1 };
      } else {
        return catalog;
      }
    });
    console.log(aux);

    setcatalogoData(aux);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  let maxPage = Math.ceil(catalogoData.length / NUM_MAX_PAGES);

  function filteredData(): Catalog[] {
    if (search.length == 0) {
      maxPage = Math.ceil(catalogoData.length / NUM_MAX_PAGES);
      console.log(catalogoData);
      console.log(catalogoData.slice(currentPage, currentPage + NUM_MAX_PAGES));
      return catalogoData.slice(currentPage, currentPage + NUM_MAX_PAGES);
    } else {
      const filteredData = catalogoData.filter((catalogo) => {
        return [
          catalogo.product.product_name,
          catalogo.area.area_name,
          catalogo.incidence.incidence_name,
          catalogo.types.type_name,
        ].some((field) => field.toLowerCase().includes(search.toLowerCase()));
      });
      maxPage = Math.ceil(filteredData.length / NUM_MAX_PAGES);
      return filteredData.slice(currentPage, currentPage + NUM_MAX_PAGES);
    }
  }
  useEffect(() => {
    const aux_data = filteredData();
    set_filter_catalog(aux_data);
  }, [catalogoData, currentPage, search]);

  useState;
  const nextPage = () => {
    if (
      catalogoData.length > currentPage + NUM_MAX_PAGES &&
      catalogoData.filter((catalogo) =>
        catalogo.product.product_name.includes(search)
      ).length >
        currentPage + NUM_MAX_PAGES
    )
      setCurrentPage(currentPage + 6);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - NUM_MAX_PAGES);
  };

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  useEffect(() => {
    console.log(filter_catalog);
  }, [filter_catalog]);

  useEffect(() => {
    console.log(catalogoData);
  }, [catalogoData]);

  /* Popup */
  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => setShowPopUp(true);
  const handleClosePopUp = () => setShowPopUp(false);

  /* PopUp EditCatalog */
  const [showPopUpEditCatalog, setShowPopUpEditCatalog] = useState(false);
  const handleShowPopUpEditCatalog = () => setShowPopUpEditCatalog(true);
  const handleClosePopUpEditCatalog = () => setShowPopUpEditCatalog(false);
  const [selectedCatalog, setSelectedCatalog] = useState<null | Catalog>(null);

  function handleClickCatalog(catalog: Catalog) {
    handleShowPopUpEditCatalog();
    setSelectedCatalog(catalog);
  }

  function formatTime(time: string): string {
    const minutes = parseInt(time, 10);

    if (minutes < 60) {
      return `${minutes} minutos`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (remainingMinutes === 0) {
        return `${hours} hora${hours > 1 ? "s" : ""}`;
      } else {
        return `${hours} hora${
          hours > 1 ? "s" : ""
        } y ${remainingMinutes} minutos`;
      }
    } else {
      const days = Math.floor(minutes / 1440);
      const remainingMinutes = minutes % 1440;
      const hours = Math.floor(remainingMinutes / 60);
      const finalMinutes = remainingMinutes % 60;

      if (hours === 0 && finalMinutes === 0) {
        return `${days} día${days > 1 ? "s" : ""}`;
      } else if (hours === 0) {
        return `${days} día${days > 1 ? "s" : ""} y ${finalMinutes} minutos`;
      } else if (finalMinutes === 0) {
        return `${days} día${days > 1 ? "s" : ""}, ${hours} hora${
          hours > 1 ? "s" : ""
        }`;
      } else {
        return `${days} día${days > 1 ? "s" : ""}, ${hours} hora${
          hours > 1 ? "s" : ""
        }, y ${finalMinutes} minutos`;
      }
    }
  }

  return (
    <LayoutBar opcionSeleccionada="administracion">
      <div className="flex flex-col  h-[520px] w-[min(1000px,90%)]">
        <div className="flex flex-row h-[10%]">
          <div className="w-1/2 text-morado text-sm font-semibold  text-start pl-2">
            <button onClick={handleShowPopUp}>Agregar nuevo catalogo</button>
            <AgregarCatalogo
              showPopUp={showPopUp}
              onCLosePopUp={handleClosePopUp}
              getData={getData}
            />
          </div>
          <div className=" flex flex-row w-1/2  my-auto gap-2 justify-end pr-2">
            <p className="text-gris">Buscar</p>
            <input
              className="px-2 my-auto w-[60%] h-[50%] rounded-md border border-gris  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              placeholder="Buscar ...."
              type="text"
              value={search}
              onChange={onSearchChange}
            ></input>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex flex-col w-full  border-l border-r border-b border-slate-300  mx-auto rounded-md">
            <div className="flex flex-row w-full h-[50px] bg-azul rounded-t-md items-center">
              <div className="w-[20%]  ">
                <p className="text-white font-semibold text-start pl-4">Tipo</p>
              </div>

              <div className="w-[20%] ">
                <p className="text-white font-semibold text-start pl-4">
                  Producto
                </p>
              </div>
              <div className="w-[20%] ">
                <p className="text-white font-semibold text-start pl-4">
                  Incidencia
                </p>
              </div>

              <div className="w-[15%] ">
                <p className="text-white font-semibold text-start pl-4">Área</p>
              </div>

              <div className="w-[14%] ">
                <p className="text-white text-sm font-semibold text-start">
                  Tiempo de respuesta
                </p>
              </div>

              <div className="w-[11%] ">
                <p className="text-white text-sm font-semibold text-center pr-4">
                  Estado
                </p>
              </div>
            </div>
            {selectedCatalog && (
              <EditCatalog
                showPopUp={showPopUpEditCatalog}
                onCLosePopUp={handleClosePopUpEditCatalog}
                catalogData={selectedCatalog}
                getData={getData}
              />
            )}

            {filter_catalog &&
              filter_catalog.map((catalog) => (
                <div
                  className="flex flex-row  w-full border-b border-slate-400 cursor-pointer"
                  key={catalog.catalog_id}
                  onClick={() => handleClickCatalog(catalog)}
                >
                  <div className=" flex w-[20%] items-center">
                    <p className="pl-4 text-azul font-medium">
                      {catalog.types.type_name}
                    </p>
                  </div>
                  <div className="w-[20%] ">
                    <p className=" text-start p-4">
                      {catalog.product.product_name}
                    </p>
                  </div>
                  <div className="flex w-[20%] text-sm ">
                    <p className="text-start p-4 h-full">
                      {catalog.incidence.incidence_name}
                    </p>
                  </div>
                  <div className="w-[15%] ">
                    <p className="text-start p-4">{catalog.area.area_name}</p>
                  </div>
                  <div className="w-[14%] flex items-center justify-start">
                    <p className="text-start ">
                      {formatTime(catalog.catalog_time)}
                    </p>
                  </div>
                  {/* <div className="w-[14%] border border-black overflow-hidden flex items-center justify-center">
                    <p className="text-start hidden hover:block hover:overflow-auto hover:p-5 hover:bg-red-500 hover:shadow-md">
                      {formatTime(catalog.catalog_time)}
                    </p>
                  </div> */}
                  {/* <div className="w-[14%] border border-black overflow-hidden flex items-center justify-center">
                    <p className="text-start hidden">
                      {formatTime(catalog.catalog_time)}
                    </p>
                    <p className="text-start hidden group-hover:block group-hover:overflow-auto group-hover:p-5 group-hover:bg-red-500 group-hover:shadow-md hover:text-red-500">
                      {formatTime(catalog.catalog_time)}
                    </p>
                  </div> */}

                  <div className=" flex w-[11%] items-center justify-center">
                    <div
                      className={`relative inline-block w-10 rounded-full items-center justify-center h-4 cursor-pointer transition-colors duration-300 ${
                        catalog.is_active === 1
                          ? "bg-green-700 justify-end "
                          : "bg-red-700 "
                      }`}
                      // key={catalog.catalog_id}
                      // onClick={() => handleClick(catalog.catalog_id)}
                      onClick={(e) => {
                        editState(catalog.catalog_id);
                        e.stopPropagation();
                      }}
                    >
                      {catalog.is_active == 1 ? (
                        <div className="transition-transform duration-300 transform translate-x-[27px] w-[25%] aspect-square rounded-full bg-white mr-[1px] translate-y-1/4"></div>
                      ) : (
                        <div className="transition-transform duration-300 transform translate-x-[0%] w-[25%] aspect-square rounded-full bg-white ml-[3px] translate-y-1/4"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex flex-row justify-end my-4">
            <div className="flex items-center justify-start ml-6 text-center">
              <Link
                to={"/administracion/configuraciones"}
                className="w-[95px] border border-morado rounded-md h-[35px] text-morado font-semibold hover:bg-morado hover:text-white duration-200 flex items-center justify-center"
              >
                Salir
              </Link>
            </div>

            <div className="flex flex-row justify-center gap-8 mx-auto">
              <button
                className="w-[100px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado duration-300"
                onClick={prevPage}
              >
                Atras
              </button>
              <button
                className=" w-[100px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado duration-300"
                onClick={nextPage}
              >
                Siguiente
              </button>
            </div>

            <div className="absolute mr-2">
              <div className="flex flex-row gap-2">
                <p>Página</p>
                <div className="w-7 text-center text-morado font-extrabold border border-morado rounded-md">
                  {Math.floor((currentPage + NUM_MAX_PAGES) / NUM_MAX_PAGES)}
                </div>
                <p>de {maxPage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutBar>
  );
}
