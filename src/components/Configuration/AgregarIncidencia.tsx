import { useState } from "react";
import { Link } from "react-router-dom";
import useProducts, { product } from "../../hooks/useProducts";
import useType from "../../hooks/useType";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { create_incidence } from "../../services/incidence";
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
type producto = {
  product_name: string;
  is_active: number;
  product_id: string;
  incidences: [
    {
      incidence_name: string;
      incidence_id: string;
      is_active: 0;
    }
  ];
};

interface IncidenciaProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  nameButton: string;
  getData: Function;
  selectedIncidence: incidence;
}
interface PopUpAddProps {
  onClosePopUp: () => void;
  getData: Function;
}
interface PopUpEditProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedCargo: incidence;
}
interface PopUpDeleteProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedCargo: incidence;
}

export default function AgregarIncidencia({
  showPopUp,
  onClosePopUp,
  nameButton,
  getData,
  selectedIncidence,
}: IncidenciaProps) {
  const RenderComponent = () => {
    if (nameButton === "btnEditar") {
      return (
        <PopEditarIncidencia
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedCargo={selectedIncidence}
        />
      );
    } else if (nameButton === "btnAgregar") {
      return (
        <PopAgregarIncidencia onClosePopUp={onClosePopUp} getData={getData} />
      );
    } else if (nameButton === "btnEliminar") {
      return (
        <PopDeleteIncidencia
          onClosePopUp={onClosePopUp}
          getData={getData}
          selectedCargo={selectedIncidence}
        />
      );
    } else {
      return <></>;
    }
  };

  if (!showPopUp) return null;

  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center ">
      <RenderComponent />
    </div>
  );
}

function PopEditarIncidencia({ onClosePopUp, getData }: PopUpEditProps) {
  return <></>;
}

function PopDeleteIncidencia({ onClosePopUp, getData }: PopUpDeleteProps) {
  return <></>;
}
function PopAgregarIncidencia({ onClosePopUp, getData }: PopUpAddProps) {
  const productHook = useProducts();

  //const inci;

  const product_info = productHook.products;
  //const product_info: product[] = [];
  const [isSelectedProducto, setIsSelectedProducto] = useState("");
  const [isSelectedTipo, setIsSelectedTipo] = useState("");
  const [isSelectedIncidencia, setIsSelectedIncidencia] = useState("");
  const [isSelectedArea, setIsSelectedArea] = useState("");
  const [isSelectedTipoSla, setIsSelectedTipoSla] = useState("");
  const [isEmptyTime, setIsEmptyTime] = useState(true);

  // const handleSelectChangeProducto = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setIsSelectedProducto(event.target.value);
  // };

  // const handleSelectChangeTipo = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setIsSelectedTipo(event.target.value);
  // };

  // const handleSelectChangeIncidencia = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setIsSelectedIncidencia(event.target.value);
  // };

  // const handleSelectChangeArea = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setIsSelectedArea(event.target.value);
  // };

  // const handleSelectChangeTipoSla = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setIsSelectedTipoSla(event.target.value);
  // };

  // const handleInputChangeTime = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setIsEmptyTime(event.target.value === "");
  // };

  const [incidence_info, setIncidenceInfo] = useState({
    incidence_name: "",
    incidence_id: "",
    is_active: 0,
    product_id: "",
  });

  function handle_select(e: any) {
    setIncidenceInfo({
      ...incidence_info,
      product_id: e.target.value,
    });
  }

  const addIncidence = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(product);
    //console.log(product.product_name);
    console.log(incidence_info);

    if (event.currentTarget.checkValidity()) {
      const res = await create_incidence({
        incidence_name: incidence_info.incidence_name,
        product_id: incidence_info.product_id,
      });
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
            title: "¡Producto ingresado con exito!",
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
  };

  return (
    <>
      <form
        className="flex flex-col w-[40%]  bg-white rounded-md "
        onSubmit={addIncidence}
      >
        <div className="flex w-full bg-azul h-[8%] rounded-t-md items-center ">
          <p className="mx-auto text-white font-semibold text-xl">
            Agregar Incidencia
          </p>
        </div>
        <div className="flex flex-col w-[70%] h-full mx-auto mt-2">
          {product_info.length > 0 ? (
            <div className=" flex flex-col w-full pt-2 ">
              <div className="flex flex-row gap-1">
                <p className="text-left mb-1 text-gris">Producto</p>
                {!isSelectedProducto ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <div>
                <select
                  className="w-full h-[26px] text-slate-600 text-sm rounded border-gris border bg-transparent text-left pl-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
                  onChange={handle_select}
                  value={incidence_info.product_id}
                >
                  {/* POP PRODUCTO */}
                  {product_info.map((product) => {
                    return (
                      <option
                        className="text-sm text-slate-600 m-2 pl-2 "
                        key={product.product_id}
                        value={product.product_id}
                      >
                        {product.product_name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="my-2">
                <input
                  onChange={(event) => {
                    setIncidenceInfo({
                      ...incidence_info,
                      incidence_name: event.target.value,
                    });
                  }}
                  value={incidence_info.incidence_name}
                  required
                  type="text"
                  className="pl-2 py-1 w-full text-sm font-light border border-azul rounded focus:border-red-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className=" text-slate-600 text-lg font-medium">
                No se ha agregado un Producto
              </h2>
              {/* ///////////////////////////////////////////////////// */}
            </div>
          )}
          <div className="flex flex-row  h-9 w-[50%] mx-auto items-center justify-center gap-12 mt-[10px] mb-[10px]">
            <button className="h-full w-[50%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado">
              Guardar
            </button>
            <button
              type="button"
              className="h-full w-[50%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado justify-center flex items-center"
              onClick={onClosePopUp}
            >
              Salir
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

{
  /* <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">SLA actual</p>
            </div>
            <p className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] "></p>
          </div> */
}
