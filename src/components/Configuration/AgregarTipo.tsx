import React, { useState, useEffect, createContext, useContext } from "react";
import { create_area, delete_area, update_area } from "../../services/area";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { create_type, delete_type, update_type } from "../../services/type";

const MySwal = withReactContent(Swal);

type type = {
  type_name: string;
  is_active: number;
  type_id: string;
};

interface TypeProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  nameButton: string;
  getData: Function;
  selectedType: type;
}

interface PopUpAddTypeProps {
  onClosePopUp: () => void;
  getData: Function;
}
interface PopUpEditTypeProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedType: type;
}
interface PopUpDeleteTypeProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedType: type;
}

export default function AgregarTipo({
  showPopUp,
  onClosePopUp,
  nameButton,
  getData,
  selectedType,
}: TypeProps) {
  //const nameButton = "btnEditar";

  const RenderComponent = () => {
    if (nameButton === "btnEditar") {
      return (
        <PopEditarTipo
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedType={selectedType}
        />
      );
    } else if (nameButton === "btnAgregar") {
      return <PopAgregarTipo onClosePopUp={onClosePopUp} getData={getData} />;
    } else if (nameButton === "btnEliminar") {
      return (
        <PopDeleteTipo
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedType={selectedType}
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

function PopEditarTipo({
  onClosePopUp,
  getData,
  selectedType,
}: PopUpEditTypeProps) {
  const [type_info, setTypeInfo] = useState<type>(selectedType);

  const editType = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const res = await update_type(type_info);
      if (res != undefined) {
        console.log("Estatus del pedido: ", res.status);
        const data_ = await res.json();

        console.log("Datos actualizados: ", data_);

        MySwal.fire({
          title: "!Tipo actualizado correctamente¡",
          //text: "No ha rellenado todos los campos",
          icon: "success",
          // confirmButtonText: "Aceptar",
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul rounded-3xl text-white",
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
          <p>Editar Tipo</p>
        </div>

        <div className="w-[70%] h-[100%]">
          <form action="flex flex-col w-full" onSubmit={editType} noValidate>
            <div className="flex flex-col w-full">
              {/* fila 1 */}

              {/* fila 2 */}
              <div className="flex flex-row py-4 w-full">
                <div className="flex flex-row w-[100%]">
                  <p className="text-base font-semibold text-morado">
                    Nombre Tipo
                  </p>
                  {/* <span className="text-red-600">*</span> */}
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-[100%]">
                  <input
                    onChange={(event) => {
                      setTypeInfo({
                        ...type_info,
                        type_name: event.target.value,
                      });
                    }}
                    value={type_info.type_name}
                    required
                    type="text"
                    className="pl-2 py-1 w-full text-sm font-light border border-azul rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
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

function PopAgregarTipo({ onClosePopUp, getData }: PopUpAddTypeProps) {
  const [type_info, setTypeInfo] = useState<type>({
    type_name: "",
    type_id: "",
    is_active: 0,
  });

  const addType = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(product);
    //console.log(product.product_name);
    const field: string = type_info.type_name;

    if (event.currentTarget.checkValidity()) {
      const res = await create_type(field);
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
            title: "¡Tipo ingresado con éxito!",
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
          <p>Agregar Tipo</p>
        </div>

        <form
          onSubmit={addType}
          noValidate
          className="flex flex-col w-[70%] h-[85%]"
        >
          {/* Div Contenido */}
          <div className="">
            {/* fila 1 */}

            {/* fila 2 */}
            <div className="flex flex-row py-4">
              <p className="text-base font-semibold text-morado">Nuevo Tipo</p>
              {/* <span className="text-red-600">*</span> */}
            </div>
            {/* fila 3 */}
            <div>
              <input
                onChange={(event) => {
                  setTypeInfo({
                    ...type_info,
                    type_name: event.target.value,
                  });
                }}
                required
                value={type_info.type_name}
                type="text"
                className="w-full border border-azul rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] px-2"
              />
            </div>
            <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
              <button
                type="submit"
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco text-base font-semibold"
              >
                Agregar
              </button>
              <button
                type="button"
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco text-base font-semibold"
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
function PopDeleteTipo({
  onClosePopUp,
  getData,
  selectedType,
}: PopUpDeleteTypeProps) {
  const [type_info, setTypeInfo] = useState<type>(selectedType);
  const deleteArea = async () => {
    const res = await delete_type(type_info.type_id);
    if (res != undefined) {
      console.log("Estatus del pedido: ", res.status);
      const data_ = await res.json();

      console.log("Datos actualizados: ", data_);

      MySwal.fire({
        title: "¡Tipo Eliminado correctamente !",
        //text: "No ha rellenado todos los campos",
        icon: "success",
        // confirmButtonText: "Aceptar",
        buttonsStyling: false,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-white rounded-3xl",
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
          <p>Eliminar Tipo</p>
        </div>
        {/* Div Contenido */}
        <div className=" flex flex-col w-[70%] h-[85%]">
          {/* fila 1 */}

          {/* fila 2 */}
          <div className="flex flex-row py-4">
            <p className="text-2xl font-medium">
              Esta seguro que desea eliminar el Tipo ?
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
