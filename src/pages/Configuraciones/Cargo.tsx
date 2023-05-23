import { useEffect, useState } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import { Link } from "react-router-dom";
import icono_editar from "../../assets/icono_editar.png";
import icono_delete from "../../assets/icono_delete.png";
import { useNavigate } from "react-router-dom";
import AgregarCargo from "../../components/Configuration/AgregarCargo";
import { get_position } from "../../services/cargo";
import useArea from "../../hooks/useArea";
import useCargo from "../../hooks/useCargo";

type cargo = {
  cargo_id: string;
  cargo_name: string;
  area: {
    area_name: string;
    area_id: string;
  };
};

export default function Cargo() {
  const [positions, setPositions] = useState<cargo[]>([]);
  const [btnSelected, setBtnSelected] = useState("btnAgregar");
  const history = useNavigate();

  const {
    cargos,
    setCargos,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedCargo,
    setSelectedCargo,
  } = useCargo();

  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => {
    setShowPopUp(true);
    console.log(showPopUp);
  };
  const handleClosePopUp = () => setShowPopUp(false);
  useEffect(() => {
    get_position()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: cargo[]) => {
        if (data) {
          setPositions(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  async function editFunc(id: string) {
    console.log(id);
    const selectedArea_ = getSelectedItem(id);
    setSelectedCargo(selectedArea_);
    setBtnSelected("btnEditar");
    handleShowPopUp();
  }

  async function deleteFunc(id: string) {
    console.log(id);
    const selectedProduct_ = getSelectedItem(id);
    setSelectedCargo(selectedProduct_);
    setBtnSelected("btnEliminar");
    handleShowPopUp();
  }
  async function addFunc() {
    setBtnSelected("btnAgregar");
    handleShowPopUp();
  }

  return (
    <LayoutBar opcionSeleccionada="administracion">
      <AgregarCargo
        showPopUp={showPopUp}
        nameButton={btnSelected}
        onClosePopUp={handleClosePopUp}
        getData={getData}
        selectedCargo={selectedCargo}
      />
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-[70%] max-h-[500px] rounded-md shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
          {/* Encabezado */}
          <div className="flex w-full  h-[7%] items-center justify-center rounded-t-md bg-azul text-blanco">
            <p className="font-bold text-lg">Configurar Cargos</p>
          </div>
          {/* Contenedor Areas */}
          <div className="flex flex-col items-center pl-[8%] py-5  w-[100%] h-[80%]">
            {/* Encabezado tabla */}

            <div className="w-[80%] h-[100%]">
              <div className=" flex flex-row w-full h-[8%] text-sm font-medium ">
                <div className="flex flex-row text-start w-[35%] overflow-hidden overflow-ellipsis">
                  <p>Area</p>
                  <span className="text-red-600">*</span>
                </div>
                <div className="flex flex-row text-start w-[35%] overflow-hidden overflow-ellipsis">
                  <p>Cargo</p>
                  <span className="text-red-600">*</span>
                </div>

                <div className="flex flex-row w-[30%] overflow-hidden overflow-ellipsis">
                  <p>Acciones</p>
                  <span className="text-red-600">*</span>
                </div>
              </div>

              <div className="overflow-y-scroll w-[100%] max-h-[350px]">
                {/* Cuerpo de tabla */}
                {cargos.map((cargo) => (
                  <div key={cargo.cargo_id} className="flex flex-col w-ful l">
                    <div className="flex flex-row p-1">
                      {/* Nombre Area */}
                      <div className="flex justify-start w-[35%] text-xs text-start overflow-hidden overflow-ellipsis">
                        <p>{cargo.area.area_name}</p>
                      </div>
                      <div className="flex justify-start w-[35%] text-xs text-start overflow-hidden overflow-ellipsis">
                        <p>{cargo.cargo_name}</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="flex flex-row">
                          <div className="w-[50%]">
                            <button
                              className="flex bg-green-400 text-white rounded  w-[50px] h-[30px] items-center justify-center duration-100 hover:scale-105 hover:bg-green-300 shadow-md "
                              onClick={() => {
                                editFunc(cargo.cargo_id);
                              }}
                            >
                              <img
                                src={icono_editar}
                                className="w-[30%] aspect-square"
                                alt=""
                              />
                            </button>
                          </div>
                          <div className="w-[50%]">
                            <button
                              className="flex bg-red-400 text-white rounded w-[50px] h-[30px] items-center justify-center duration-100 hover:scale-105 hover:bg-red-300 shadow-md "
                              onClick={() => {
                                deleteFunc(cargo.cargo_id);
                              }}
                            >
                              <img
                                src={icono_delete}
                                className="w-[40%] aspect-square"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* border */}
                    </div>
                    <div className="w-[92%]  border-morado border-t-[1px] shadow-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex  justify-center text-sm font-medium text-morado mb-10 mt-2s">
            <button
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
              onClick={() => {
                addFunc();
              }}
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
      </div>
    </LayoutBar>
  );
}
