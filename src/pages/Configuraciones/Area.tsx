import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import { Link } from "react-router-dom";
import icono_editar_blanco from "../../assets/icono_editar_blanco.png";
import icono_borrar from "../../assets/icono_borrar.png";
import AgregarArea from "../../components/Configuration/AgregarArea";
import useArea from "../../hooks/useArea";

type area = {
  area_name: string;
  area_id: string;
};

export default function Area() {
  const [btnSelected, setBtnSelected] = useState("btnAgregar");
  const [showPopUp, setShowPopUp] = useState(false);
  const {
    areas,
    setAreas,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedArea,
    setSelectedArea,
  } = useArea();
  //Funciones para popup
  const handleShowPopUp = () => {
    setShowPopUp(true);
    console.log(showPopUp);
  };
  const handleClosePopUp = () => setShowPopUp(false);

  async function editFunc(id: string) {
    console.log(id);
    const selectedArea_ = getSelectedItem(id);
    setSelectedArea(selectedArea_);
    setBtnSelected("btnEditar");
    handleShowPopUp();
  }

  async function deleteFunc(id: string) {
    console.log(id);
    const selectedArea_ = getSelectedItem(id);
    setSelectedArea(selectedArea_);
    setBtnSelected("btnEliminar");
    handleShowPopUp();
  }
  async function addFunc() {
    setBtnSelected("btnAgregar");
    handleShowPopUp();
  }

  const history = useNavigate();
  return (
    <LayoutBar opcionSeleccionada="administracion">
      <AgregarArea
        showPopUp={showPopUp}
        onClosePopUp={handleClosePopUp}
        nameButton={btnSelected}
        getData={getData}
        selectedArea={selectedArea}
      />
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-[min(750px,90%)] max-h-[500px] rounded-md shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
          {/* Encabezado */}
          <div className="flex w-full h-[35px] items-center justify-center rounded-t-md bg-azul text-blanco">
            <p className="font-bold text-xl">Configurar Areas</p>
          </div>
          {/* Contenedor Areas */}
          <div className="flex flex-col items-center my-4 border border-slate-300 w-[min(650px,90%)] mx-auto rounded-md">
            {/* Encabezado tabla */}

            <div className="w-full h-[100%]">
              <div className=" flex flex-row w-full h-[35px] text-sm font-medium bg-slate-200">
                <div className="flex flex-row text-start w-[50%]">
                  <p className="text-lg pl-2 text-slate-800">Area</p>
                  {/* <span className="text-red-600">*</span> */}
                </div>

                <div className="flex flex-row w-[50%] items-center justify-center">
                  <p className="text-lg text-slate-800">Acciones</p>
                  {/* <span className="text-red-600">*</span> */}
                </div>
              </div>

              <div className="overflow-y-scroll w-[100%] max-h-[350px]">
                {/* Cuerpo de tabla */}
                {areas.map((area) => (
                  <div key={area.area_id} className="flex flex-col w-full">
                    <div className="flex flex-row p-1 border-b border-slate-300">
                      {/* Nombre Area */}
                      <div className="flex justify-start w-[50%] text-xs overflow-hidden overflow-ellipsis pl-2">
                        <p className="text-lg text-azul font-semibold">{area.area_name}</p>
                      </div>
                      <div className="w-[50%] items-center flex justify-center">
                        <div className="flex flex-row w-full justify-between gap-8">
                          <div className="w-[50%]  justify-end flex">
                            <button
                              className="flex bg-green-500 text-white rounded  w-[50px] h-[30px] items-center justify-center duration-100 hover:scale-105 hover:bg-green-300 shadow-md "
                              onClick={() => {
                                editFunc(area.area_id);
                              }}
                            >
                              <img
                                src={icono_editar_blanco}
                                className="w-[30%] aspect-square"
                                alt=""
                              />
                            </button>
                          </div>
                          <div className="w-[50%] ">
                            <button
                              className="flex bg-red-500 text-white rounded w-[50px] h-[30px] items-center justify-center duration-100 hover:scale-105 hover:bg-red-300 shadow-md "
                              onClick={() => {
                                deleteFunc(area.area_id);
                              }}
                            >
                              <img
                                src={icono_borrar}
                                className="w-[40%] aspect-square"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* border */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between mx-auto text-sm font-semibold text-morado mb-4 w-[35%] gap-8">
            <button
              className="w-[50%] h-[35px] border border-morado rounded-md duration-150 hover:bg-morado hover:text-blanco hover:text-bold text-base font-semibold"
              onClick={() => {
                addFunc();
              }}
            >
              Agregar
            </button>
            <button
              className="w-[50%] h-[35px] border border-morado rounded-md duration-150 hover:bg-morado hover:text-blanco hover:text-bold text-base font-semibold"
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
