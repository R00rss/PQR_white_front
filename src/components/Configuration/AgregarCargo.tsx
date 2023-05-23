import React, { useState, useEffect, createContext, useContext } from "react";

import { parse, addSeconds, getSeconds, getTime, getHours } from "date-fns";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { delete_cargo, update_cargo } from "../../services/cargo";
import useArea from "../../hooks/useArea";
import { create_cargo } from "../../services/cargo";

const MySwal = withReactContent(Swal);

type cargo = {
  cargo_id: string;
  cargo_name: string;
  area: {
    area_name: string;
    area_id: string;
  };
};
type area = {
  area_id: string;
  area_name: string;
};

interface CargoProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  nameButton: string;
  getData: Function;
  selectedCargo: cargo;
}
interface PopUpAddProps {
  onClosePopUp: () => void;
  getData: Function;
}
interface PopUpEditProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedCargo: cargo;
}
interface PopUpDeleteProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedCargo: cargo;
}

export default function AgregarCargo({
  showPopUp,
  onClosePopUp,
  nameButton,
  getData,
  selectedCargo,
}: CargoProps) {
  const RenderComponent = () => {
    if (nameButton === "btnEditar") {
      return (
        <PopEditarCargo
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedCargo={selectedCargo}
        />
      );
    } else if (nameButton === "btnAgregar") {
      return <PopAgregarCargo onClosePopUp={onClosePopUp} getData={getData} />;
    } else if (nameButton === "btnEliminar") {
      return (
        <PopDeleteCargo
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedCargo={selectedCargo}
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

function PopEditarCargo({
  onClosePopUp,
  getData,
  selectedCargo,
}: PopUpEditProps) {
  const [cargo_info, setCargoInfo] = useState<cargo>(selectedCargo);
  const areaHook = useArea();
  const area_info = areaHook.areas;

  const editCargo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const res = await update_cargo(
        cargo_info.area.area_id,
        cargo_info.cargo_id,
        cargo_info.cargo_name
      );
      if (res != undefined) {
        console.log("Estatus del pedido: ", res.status);
        const data_ = await res.json();

        console.log("Datos actualizados: ", data_);

        MySwal.fire({
          title: "!Datos Cambiados Correctamente¡",
          //text: "No ha rellenado todos los campos",
          icon: "success",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        }).finally(() => {
          onClosePopUp();
          getData();
        });
      }
    }
  };

  function handle_select(e: any) {
    const area_founded = areaHook.getItemByName(e.target.value);
    if (area_founded) {
      setCargoInfo({
        ...cargo_info,
        area: {
          ...cargo_info.area,
          area_name: e.target.value,
          area_id: area_founded.area_id,
        },
      });
    }
  }

  return (
    <>
      <div className="flex flex-col items-center bg-blanco w-[600px] rounded-lg duration-200 transform ">
        <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
          <p>Editar Cargo</p>
        </div>

        <div className="w-[70%]">
          <form action="flex flex-col w-full" onSubmit={editCargo} noValidate>
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
                      setCargoInfo({
                        ...cargo_info,
                        cargo_name: event.target.value,
                      });
                    }}
                    value={cargo_info.cargo_name}
                    required
                    type="text"
                    className="pl-2 py-1 w-full text-sm font-light border border-azul rounded focus:border-red-500"
                  />
                </div>

                {/* Estado */}
              </div>
              <div className="flex flex-row pttstest-4 w-full">
                <div className="flex flex-row w-[100%]">
                  <p className="text-sm font-medium">Area del Cargo</p>
                  <span className="text-red-600">*</span>
                </div>
              </div>

              <div className="flex flex-row py-4 w-full">
                <div className="flex flex-row w-[100%]">
                  {/* {area_info && (
                    <SelectArea
                      onChange={handle_select}
                      value={cargo_info.area.area_name}
                      areas={area_info}
                    />
                  )} */}
                  <select
                    name=""
                    id=""
                    className="w-full border border-azul rounded "
                    onChange={handle_select}
                    value={cargo_info.area.area_name}
                  >
                    {area_info.map((area) => {
                      return (
                        <option key={area.area_id} value={area.area_name}>
                          {area.area_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
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

function SelectArea(onChange: any, value: string, areas: area[]) {
  console.log(areas);
  if (!areas) return <></>;
  if (areas.length === 0) return <></>;
  return (
    <select
      name=""
      id=""
      className="w-full border border-azul rounded "
      onChange={onChange}
      value={value}
    >
      {areas.map((area) => {
        return (
          <option key={area.area_id} value={area.area_name}>
            {area.area_name}
          </option>
        );
      })}
    </select>
  );
}

function PopAgregarCargo({ onClosePopUp, getData }: PopUpAddProps) {
  const areaHook = useArea();
  const area_info = areaHook.areas;

  const [cargo_info, setCargoInfo] = useState({
    cargo_name: "",
    area: {
      area_name: "",
      area_id: "",
    },
  });
  function handle_select(e: any) {
    const area_founded = areaHook.getItemByName(e.target.value);
    if (area_founded) {
      setCargoInfo({
        ...cargo_info,
        area: {
          ...cargo_info.area,
          area_name: e.target.value,
          area_id: area_founded.area_id,
        },
      });
    }
  }
  async function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const res = await create_cargo(
        cargo_info.area.area_id,
        cargo_info.cargo_name
      );
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
            title: "Cargo ingresado con exito!",
            // text: "Credenciales inválidas",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            // confirmButtonText: "Aceptar",
            // buttonsStyling: false,
            // customClass: {
            //   confirmButton:
            //     "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            //   popup: "bg-azul text-text rounded-3xl",
            // },
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
  }

  return (
    <>
      <form
        onSubmit={handle_submit}
        className="flex flex-col items-center bg-blanco w-[600px] rounded-lg h-[300px]"
      >
        <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
          <p>Agregar Cargo</p>
        </div>
        {/* Div Contenido */}
        <div className=" flex flex-col w-[70%] h-[85%]">
          {/* fila 1 */}onSubmit
          {/* fila 2 */}
          <div className="flex flex-row py-4">
            <p className="text-sm font-medium">Nuevo Cargo</p>
            <span className="text-red-600">*</span>
          </div>
          {/* fila 3 */}
          <div>
            <input
              value={cargo_info.cargo_name}
              onChange={(e) =>
                setCargoInfo({ ...cargo_info, cargo_name: e.target.value })
              }
              type="text"
              className="w-full border border-azul rounded focus:border-red-500"
            />
          </div>
          <div className="flex flex-row py-2">
            <p className="text-sm font-medium">Elegir Area</p>
            <span className="text-red-600">*</span>
          </div>
          <div className="flex flex-row py-2">
            <select
              name=""
              id=""
              className="w-full border border-azul rounded "
              onChange={handle_select}
              value={cargo_info.area.area_name}
            >
              {area_info.map((area) => {
                return (
                  <option key={area.area_id} value={area.area_name}>
                    {area.area_name}
                  </option>
                );
              })}
            </select>
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
    </>
  );
}

function PopDeleteCargo({
  onClosePopUp,
  selectedCargo,
  getData,
}: PopUpDeleteProps) {
  const [cargo_info] = useState<cargo>(selectedCargo);
  const deleteCargo = async () => {
    const res = await delete_cargo(cargo_info.cargo_id);
    if (res != undefined) {
      console.log("Estatus del pedido: ", res.status);
      const data_ = await res.json();

      console.log("Datos actualizados: ", data_);

      MySwal.fire({
        title: "¡ Cargo Eliminado correctamente !",
        //text: "No ha rellenado todos los campos",
        icon: "success",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-blanco text-text rounded-3xl",
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
          <p>Eliminar Cargo</p>
        </div>
        {/* Div Contenido */}
        <div className=" flex flex-col w-[70%] h-[85%]">
          {/* fila 1 */}

          {/* fila 2 */}
          <div className="flex flex-row py-4">
            <p className="text-2xl font-medium">
              Esta seguro que desea eliminar el Cargo ?
            </p>
          </div>

          {/* fila 3 */}

          <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
            <button
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-green-400 hover:text-blanco"
              onClick={() => {
                deleteCargo();
              }}
            >
              Confirmar
            </button>
            <button
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-red-400 hover:text-blanco"
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
