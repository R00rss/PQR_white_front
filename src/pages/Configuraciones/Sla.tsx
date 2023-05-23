import { useState } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import { Link } from "react-router-dom";

export default function Sla() {
  const [isSelectedProducto, setIsSelectedProducto] = useState("");
  const [isSelectedTipo, setIsSelectedTipo] = useState("");
  const [isSelectedSubTipo, setIsSelectedSubTipo] = useState("");
  const [isSelectedSLA, setIsSelectedSLA] = useState("");

  const [isEmpty, setIsEmpty] = useState(true);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(event.target.value === "");
  };

  const handleSelectChangeProducto = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedProducto(event.target.value);
  };

  const handleSelectChangeTipo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedTipo(event.target.value);
  };

  const handleSelectChangeSubTipo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedSubTipo(event.target.value);
  };

  const handleSelectChangeSLA = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedSLA(event.target.value);
  };
  return (
    <LayoutBar opcionSeleccionada="administracion">
      <div className="flex flex-col w-[min(650px,90%)] rounded-md shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
        <div className="flex w-full bg-azul h-[35px] rounded-t-md items-center ">
          <p className="mx-auto text-white font-semibold text-xl">
            Configurar SLA
          </p>
        </div>
        <div className="flex flex-col w-[70%] h-full mx-auto">
          {/* Tipo */}
          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Tipo</p>
              {!isSelectedTipo ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
              onChange={handleSelectChangeTipo}
              value={isSelectedTipo}
            >
              <option value="" className="text-center"></option>
              <option value="1" className="text-center">
                Opción1
              </option>
            </select>
          </div>
          {/* Producto */}
          <div className=" flex flex-col w-full pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Producto</p>
              {!isSelectedProducto ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
              onChange={handleSelectChangeProducto}
              value={isSelectedProducto}
            >
              <option value="" className="text-center"></option>
              <option value="1" className="text-center">
                Atención al cliente
              </option>
              <option value="2" className="text-center">
                ATM
              </option>
            </select>
          </div>

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Incidencia</p>
              {!isSelectedSubTipo ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
              onChange={handleSelectChangeSubTipo}
              value={isSelectedSubTipo}
            >
              <option value="" className="text-center"></option>
              <option value="1" className="text-center">
                Opción1
              </option>
            </select>
          </div>

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">SLA actual</p>
            </div>
            <p className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] "></p>
          </div>
          <div className="flex flex-row gap-4">
            <div className=" flex flex-col w-full  pt-2 ">
              <div className="flex flex-row gap-1">
                <p className="text-left mb-1 text-gris">
                  Nuevo tipo tiempo SLA
                </p>
                {!isSelectedSLA ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <select
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
                onChange={handleSelectChangeSLA}
                value={isSelectedSLA}
              >
                <option value="" className="text-center"></option>
                <option value="1" className="text-center">
                  Opción1
                </option>
              </select>
            </div>

            <div className=" flex flex-col w-full  pt-2 ">
              <div className="flex flex-row gap-1">
                <p className="text-left mb-1 text-gris">Nuevo tiempo SLA</p>
                {isEmpty ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <input
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] px-2"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>

          <div className="flex flex-row h-9 w-[50%] mx-auto items-center justify-center gap-12 my-6">
            <button className="h-full w-[50%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado">
              Guardar
            </button>
            <Link
              to={"/administracion/configuraciones"}
              className="h-full w-[50%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado justify-center flex items-center"
            >
              Salir
            </Link>
          </div>
        </div>
      </div>
    </LayoutBar>
  );
}
