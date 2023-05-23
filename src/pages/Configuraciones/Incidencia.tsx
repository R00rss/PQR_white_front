import { useEffect, useState, ChangeEvent, useCallback } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import { Link, useNavigate } from "react-router-dom";
import icono_editar from "../../assets/icono_editar.png";
import icono_delete from "../../assets/icono_delete.png";
import useIncidence from "../../hooks/useIncidence";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { update_incidence } from "../../services/incidence";
import AgregarIncidencia from "../../components/Configuration/AgregarIncidencia";
const MySwal = withReactContent(Swal);

type incidence = {
  incidence_name: string;
  incidence_id: string;
  is_active: number;
  product: {
    product_name: string;
    product_id: string;
    is_active: number;
  };
};

export default function Incidencia() {
  const {
    incidences,
    setIncidences,
    error,
    loading,
    getData,
    getSelectedItem,
    selectedIncidence,
    setSelectedIncidece,
  } = useIncidence();

  const history = useNavigate();
  //const [incidence, setIncidence] = useState<incidences>([]);
  const [isActive, setIsActive] = useState(1);
  const [viewIncidence, setViewIncidence] = useState("");
  const [btnSelected, setBtnSelected] = useState("btnAgregar");
  const [showPopUp, setShowPopUp] = useState(false);
  const [search, setSearch] = useState("");
  let maxPage = Math.ceil(incidences.length / 7);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log(viewIncidence);
  }, [viewIncidence]);

  const filteredIncidence = useCallback((): incidence[] => {
    if (search.length == 0) {
      maxPage = Math.ceil(incidences.length / 7);
      return incidences.slice(currentPage, currentPage + 7);
    } else {
      //Si hay algo en la busqueda
      const filtered = incidences.filter(
        (incidencia) =>
          [incidencia.incidence_name, incidencia.product.product_name].some(
            (field) => field.toLowerCase().includes(search)
          )

        //incidencia.product.product_name.includes(search)
      );
      maxPage = Math.ceil(filtered.length / 7);
      return filtered.slice(currentPage, currentPage + 7);
    }
  }, [currentPage, incidences, search]);
  const nextPage = () => {
    if (
      incidences.length > currentPage + 7 &&
      incidences.filter((incidencia) => viewIncidence.includes(search)).length >
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
  async function editState(id: string) {
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const selectedProduct_ = getSelectedItem(id);
        if (!selectedProduct_) return;
        const new_staus_product = {
          ...selectedProduct_,
          is_active: selectedProduct_.is_active === 1 ? 0 : 1,
        };
        //console.log(new_staus_product);

        setSelectedIncidece(new_staus_product);

        console.log(selectedIncidence);

        const res = await update_incidence({
          incidence_id: new_staus_product.incidence_id,
          incidence_name: new_staus_product.incidence_name,
          product_id: new_staus_product.product.product_id,
          is_active: new_staus_product.is_active,
        });
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

  async function editFunc(id: string) {
    console.log(id);
    const selectedIncidence_ = getSelectedItem(id);
    setSelectedIncidece(selectedIncidence_);
    setBtnSelected("btnEditar");
    handleShowPopUp();
  }

  async function deleteFunc(id: string) {
    console.log(id);
    const selectedProduct_ = getSelectedItem(id);
    setSelectedIncidece(selectedProduct_);
    setBtnSelected("btnEliminar");
    handleShowPopUp();
  }
  async function addFunc() {
    setBtnSelected("btnAgregar");
    handleShowPopUp();
  }

  const handleShowPopUp = () => {
    setShowPopUp(true);
    //console.log(showPopUp);
  };
  const handleClosePopUp = () => setShowPopUp(false);

  return (
    <LayoutBar opcionSeleccionada="administracion">
      <AgregarIncidencia
        showPopUp={showPopUp}
        nameButton={btnSelected}
        onClosePopUp={handleClosePopUp}
        getData={getData}
        selectedIncidence={selectedIncidence}
      />
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-[95%] max-h-[500px] rounded-md shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] items-center">
          <div className=" flex flex-row">
            <div className="flex flex-row w-[50%] p-3">
              <p className="text-gris text-base my-auto m-2">Buscar</p>
              <input
                className="w-[70%] rounded-md border-gris-claro border focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                placeholder="buscar incidencia ..."
                type="text"
                value={search}
                onChange={onSearchChange}
              ></input>
            </div>
            <div className="flex w-[50%] justify-center  items-center text-sm font-medium text-morado ">
              <button
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
                onClick={addFunc}
              >
                Agregar
              </button>
              <button
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
                onClick={() => history("/administracion/configuraciones")}
              >
                Salir{" "}
              </button>
            </div>
          </div>

          <div className="flex flex-col w-[70%] justify-center">
            {/* Encabezado */}
            <div className="flex w-full  h-[10%] items-center justify-center rounded-t-md bg-azul text-blanco">
              {/* <p className="font-bold text-lg">Configurar Productos</p> */}

              <div className=" flex flex-row w-full h-[10%] text-xs font-medium justify-center items-center">
                <div className="pl-2 flex flex-row w-[35%] overflow-hidden overflow-ellipsis">
                  <p>Producto</p>
                </div>
                <div className="pl-2 flex flex-row w-[35%] overflow-hidden overflow-ellipsis">
                  <p>Incidencia</p>
                </div>
                <div className="pl-2 flex flex-row text-start w-[30%] overflow-hidden overflow-ellipsis">
                  <p>Estado</p>
                </div>
              </div>
            </div>
            {/* Contenedor Incidencias */}
            <div className="flex flex-col w-[100%] pt-2">
              {/* Cuerpo de tabla */}
              {filteredIncidence().map((incidencia, i) => (
                <div
                  key={incidencia.incidence_id}
                  className="flex flex-col w-full pt-2 pb-4"
                >
                  <div className="flex flex-row p-1">
                    {/* Nombre Area */}
                    {/* botones Editar y eliminar */}

                    {/* Nombre de producto */}
                    <div className="pl-2 flex justify-start w-[35%] text-xs text-start ">
                      <p>{incidencia.product.product_name}</p>
                    </div>
                    <div className="pl-2 flex justify-start w-[35%] text-xs text-start ">
                      <p>{incidencia.incidence_name}</p>
                    </div>
                    {/* Estado  */}
                    <div className="pl-2 flex justify-start w-[30%] text-sm items-center">
                      <div
                        className={`relative inline-block w-8 rounded-full items-center h-3 cursor-pointer transition-colors duration-300 ${
                          isActive === incidencia.is_active
                            ? "bg-green-700 justify-end "
                            : "bg-red-700 "
                        }`}
                        key={incidencia.incidence_id}
                        onClick={() => editState(incidencia.incidence_id)}
                      >
                        {incidencia.is_active == 1 ? (
                          <div className="transition-transform duration-300 transform translate-x-[22px] w-[25%] aspect-square rounded-full bg-white mr-[2px] translate-y-1/4"></div>
                        ) : (
                          <div className="transition-transform duration-300 transform translate-x-[0%] w-[25%] aspect-square rounded-full bg-white ml-[2px] translate-y-1/4"></div>
                        )}
                      </div>
                    </div>

                    {/* border */}
                  </div>
                  <div className="w-[100%]  border-gray-400 border-t-[1px] shadow-md"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row   items-center my-4">
            <button
              className="w-[85px] px-[5%] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado hover:scale-105 hover:duration-200"
              onClick={prevPage}
            >
              Atras
            </button>
            <button
              className=" w-[85px] px-[5%] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado hover:scale-105 hover:duration-200"
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </LayoutBar>
  );
}
