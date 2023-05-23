import React, { useState, useEffect, createContext, useContext } from "react";
import { create_area, delete_area, update_area } from "../../services/area";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type area = {
  area_id: string;
  area_name: string;
};

interface AreaProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  nameButton: string;
  getData: Function;
  selectedArea: area;
}

interface PopUpAddProps {
  onClosePopUp: () => void;
  getData: Function;
}
interface PopUpEditProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedArea: area;
}
interface PopUpDeleteProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedArea: area;
}

export default function AgregarArea({
  showPopUp,
  onClosePopUp,
  nameButton,
  getData,
  selectedArea,
}: AreaProps) {
  //const nameButton = "btnEditar";

  const RenderComponent = () => {
    if (nameButton === "btnEditar") {
      return (
        <PopEditarArea
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedArea={selectedArea}
        />
      );
    } else if (nameButton === "btnAgregar") {
      return <PopAgregarArea onClosePopUp={onClosePopUp} getData={getData} />;
    } else if (nameButton === "btnEliminar") {
      return (
        <PopDeleteArea
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedArea={selectedArea}
        />
      );
    } else {
      return <></>;
    }
  };

  if (!showPopUp) return null;
  return (
    <div>
      <div className="flex fixed w-full h-full duration-100 bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
        <RenderComponent />
      </div>
    </div>
  );
}

function PopEditarArea({
  onClosePopUp,
  getData,
  selectedArea,
}: PopUpEditProps) {
  const [area_info, setAreaInfo] = useState<area>(selectedArea);

  const editArea = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const res = await update_area(area_info);
      if (res != undefined) {
        console.log("Estatus del pedido: ", res.status);
        const data_ = await res.json();

        console.log("Datos actualizados: ", data_);

        MySwal.fire({
          title: "!Area actualizada correctamente¡",
          //text: "No ha rellenado todos los campos",
          icon: "success",
          // confirmButtonText: "Aceptar",
          showConfirmButton: false,
          buttonsStyling: false,
          timer: 1500,
          customClass: {
            confirmButton:
              "bg-azul text-white rounded-2xl h-[40px] w-[100px] text-white",
            popup: "bg-azul text-text rounded-3xl text-white",
          },
        }).finally(() => {
          onClosePopUp();
          getData();
        });
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center bg-blanco w-[600px] rounded-lg h-[200px] duration-200 transform ">
        <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
          <p>Editar Area</p>
        </div>

        <div className="w-[70%] h-[100%]">
          <form action="flex flex-col w-full" onSubmit={editArea} noValidate>
            <div className="flex flex-col w-full">
              {/* fila 1 */}

              {/* fila 2 */}
              <div className="flex flex-row py-4 w-full">
                <div className="flex flex-row w-[100%]">
                  <p className="text-sm font-medium">Nombre Producto</p>
                  <span className="text-red-600">*</span>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-[100%]">
                  <input
                    onChange={(event) => {
                      setAreaInfo({
                        ...area_info,
                        area_name: event.target.value,
                      });
                    }}
                    value={area_info.area_name}
                    required
                    type="text"
                    className="pl-2 py-1 w-full text-sm font-light border border-azul rounded px-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* Estado */}
              </div>

              <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
                <button
                  type="submit"
                  className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
                  onClick={onClosePopUp}
                >
                  Cancelar
                </button>
              </div>
            </div>

            {/* fila 3 */}
          </form>
        </div>

        {/* Div Contenido */}
      </div>
    </>
  );
}
interface area_info {
  area_name: string;
}
function PopAgregarArea({ onClosePopUp, getData }: PopUpAddProps) {
  const [area_info, setAreaInfo] = useState<area_info>({ area_name: "" });

  const addArea = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(product);
    //console.log(product.product_name);

    if (event.currentTarget.checkValidity()) {
      const res = await create_area(area_info.area_name);
      console.log(res);
      if (res) {
        const estado: number = res.status;
        console.log("Estatus del Pedido: ", estado);

        const data_ = await res?.json();
        console.log("Datos :", data_);

        if (res.status != 200) {
          MySwal.fire({
            title: "¡Error!",
            //text: estado,
            icon: "error",
            confirmButtonText: "Aceptar",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
              popup: "bg-azul text-text rounded-3xl",
            },
          });
        } else {
          MySwal.fire({
            title: "¡Area ingresado con exito!",
            // text: "Credenciales inválidas",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            // confirmButtonText: "Aceptar",
            // buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
              popup: "bg-azul text-text rounded-3xl text-white",
            },
          }).finally(() => {
            onClosePopUp();
            getData();
          });
        }
      } else {
        MySwal.fire({
          title: "¡Error!",
          text: "Undefined",
          icon: "error",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        });
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center bg-blanco w-[600px] rounded-lg h-[200px]">
        <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
          <p>Agregar area</p>
        </div>

        <form
          onSubmit={addArea}
          noValidate
          className="flex flex-col w-[70%] h-[85%]"
        >
          {/* Div Contenido */}
          <div className="">
            {/* fila 1 */}

            {/* fila 2 */}
            <div className="flex flex-row py-4">
              <p className="text-base font-medium">Nueva Área</p>
              {/* <span className="text-red-600">*</span> */}
            </div>
            {/* fila 3 */}
            <div>
              <input
                onChange={(event) => {
                  setAreaInfo({
                    ...area_info,
                    area_name: event.target.value,
                  });
                }}
                value={area_info.area_name}
                type="text"
                className="w-full border border-azul rounded px-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              />
            </div>
            <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
              <button
                type="submit"
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
              >
                Agregar
              </button>
              <button
                type="button"
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
                onClick={onClosePopUp}
              >
                Salir{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
function PopDeleteArea({
  onClosePopUp,
  getData,
  selectedArea,
}: PopUpDeleteProps) {
  const [area_info, setAreaInfo] = useState<area>(selectedArea);
  const deleteArea = async () => {
    const res = await delete_area(area_info.area_id);
    if (res != undefined) {
      console.log("Estatus del pedido: ", res.status);
      const data_ = await res.json();

      console.log("Datos actualizados: ", data_);

      MySwal.fire({
        title: "¡Area eliminada correctamente !",
        //text: "No ha rellenado todos los campos",
        icon: "success",
        // confirmButtonText: "Aceptar",
        showConfirmButton: false,
        buttonsStyling: false,
        timer: 1500,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl text-white",
        },
      }).finally(() => {
        onClosePopUp();
        getData();
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-blanco w-[600px] rounded-lg h-[200px]">
        <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
          <p>Eliminar Area</p>
        </div>
        {/* Div Contenido */}
        <div className=" flex flex-col w-[70%] h-[85%]">
          {/* fila 1 */}

          {/* fila 2 */}
          <div className="flex flex-row py-4">
            <p className="text-2xl font-medium">
              Esta seguro que desea eliminar el Area ?
            </p>
          </div>

          {/* fila 3 */}

          <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
            <button
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-green-400 hover:text-morado hover:border-green-400 hover:font-bold hover:text-base"
              onClick={() => {
                deleteArea();
              }}
            >
              Confirmar
            </button>
            <button
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-red-400 hover:text-morado hover:border-red-400 hover:font-bold hover:text-base"
              onClick={onClosePopUp}
            >
              Cancelar{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
