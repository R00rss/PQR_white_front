import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useType from "../../hooks/useType";
import useProduct from "../../hooks/useProduct";
import useIncidence from "../../hooks/useIncidence";
import useArea from "../../hooks/useArea";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
import withReactContent from "sweetalert2-react-content";
import { create_catalog } from "../../services/catalog";
import { get_user_by_area } from "../../services/user";

interface AñadirCatalogoProps {
  showPopUp: boolean;
  onCLosePopUp: () => void;
  getData: Function;
}
enum TypeTime {
  Opcion1 = "Inmediato",
  Opcion2 = "Minuto",
  Opcion3 = "Hora",
  Opcion4 = "Dia",
  Opcion5 = "Semana",
}
interface IArea {
  area_name: string;
  area_id: string;
}
interface ICargo {
  cargo_id: string;
  cargo_name: string;
  area: IArea;
}
interface IAgencia {
  agencia_name: string;
  agencia_city: string;
  agencia_id: string;
}
interface IUserType {
  user_type: string;
  user_type_id: string;
}
interface IUserRole {
  user_role_name: string;
  user_role_id: string;
}

interface user {
  user_id: string;
  fullname: string;
  cargo: ICargo;
  agencia: IAgencia;
  phone: string;
  is_active: number;
  user_role: IUserRole;
  profile_pic: string;
  user_type: IUserType;
  mail: string;
  username: string;
}

const DEFAULT_OPTION = "Ingrese una opción";

export default function AgregarCatalogo({
  showPopUp,
  onCLosePopUp,
  getData,
}: AñadirCatalogoProps) {
  /* Hook */
  const { types } = useType();
  const { products } = useProduct();
  const { incidences } = useIncidence();
  const { areas } = useArea();
  const [users_by_area, set_users_by_area] = useState<user[]>([]);
  // const [setloading] = useState(false);
  // const [seterror] = useState(null);
  /* check validate  */
  const [isSelectedProducto, setIsSelectedProducto] = useState("");
  const [isSelectedTipo, setIsSelectedTipo] = useState("");
  const [isSelectedIncidencia, setIsSelectedIncidencia] = useState("");
  const [isSelectedArea, setIsSelectedArea] = useState("");
  const [isSelectedTipoSla, setIsSelectedTipoSla] = useState("");
  const [isEmptyTime, setIsEmptyTime] = useState(true);
  const [isSelectedUSer, setIsSelectedUSer] = useState("");

  const [catalog_add, setCatalog_add] = useState({
    type_id: DEFAULT_OPTION,
    incidence_id: DEFAULT_OPTION,
    area_id: DEFAULT_OPTION,
    time_type: DEFAULT_OPTION,
    product_id: DEFAULT_OPTION,
    orq_id: DEFAULT_OPTION,
    time: 0,
  });

  /* Flags */

  const flag_users_by_area = users_by_area.length > 0;
  const flag_types = isSelectedTipo !== DEFAULT_OPTION;
  const flag_products = isSelectedProducto !== DEFAULT_OPTION;
  const flag_incidences = isSelectedIncidencia !== DEFAULT_OPTION;
  const flag_type_time = isSelectedTipoSla !== DEFAULT_OPTION;

  let incidence_option = products.filter((product) => {
    console.log(
      "asdasdas",
      product.product_id,
      "asdasda",
      catalog_add.product_id
    );
    return product.product_id === catalog_add.product_id;
  });
  console.log(products);
  console.log("incidence_option", incidence_option);

  /* Manejar las selecciones */

  /* Tipo */
  function handleSelectChangeTipo(event: React.ChangeEvent<HTMLSelectElement>) {
    setIsSelectedTipo(event.target.value);
    const new_type = event.target.value;
    setCatalog_add({ ...catalog_add, type_id: new_type });
  }
  /* Producto */
  function handleSelectChangeProducto(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setIsSelectedProducto(event.target.value);
    const new_product = event.target.value;
    setCatalog_add({ ...catalog_add, product_id: new_product });
  }

  function handleSelectChangeArea(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("event.target.value", event.target.value);
    setIsSelectedArea(event.target.value);
    const new_area = event.target.value;
    setCatalog_add({ ...catalog_add, area_id: new_area });
  }

  const handleSelectChangeIncidencia = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedIncidencia(event.target.value);
    setCatalog_add({ ...catalog_add, incidence_id: event.target.value });
  };

  const handleSelectChangeTipoSla = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tipo_tiempo = event.target.value;
    setIsSelectedTipoSla(tipo_tiempo);
    setCatalog_add({ ...catalog_add, time_type: tipo_tiempo });
  };

  const handleSelectChangeOrquestador = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const orquestador = event.target.value;
    setIsSelectedUSer(orquestador);
    setCatalog_add({ ...catalog_add, orq_id: orquestador });
  };

  const handleInputChangeTime = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyTime(event.target.value === "");
    const time_number = parseInt(event.target.value);
    setCatalog_add({ ...catalog_add, time: time_number });
  };

  function handle_submit(event: any) {
    event.preventDefault();
    console.log("submit");
    addCatalog(event);
  }
  ///////////////////////// Add Catalog /////////////////////////
  async function addCatalog(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.currentTarget.reportValidity();
      return;
    }
    if (!flag_users_by_area) {
      MySwal.fire({
        title: "Alerta!",
        text: "No hay orquestadores en el area seleccionada",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton:
            "bg-azul text-white font-bold rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-lg rounded-3xl text-white font-bold ",
          icon: "rounded-full p-1",
        },
      });
      return;
    }
    if (!flag_types) {
      MySwal.fire({
        title: "Alerta!",
        text: "No hay un tipo seleccionado",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton:
            "bg-azul text-white font-bold rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-lg rounded-3xl text-white font-bold ",
          icon: "rounded-full p-1",
        },
      });
      return;
    }

    if (!flag_products) {
      MySwal.fire({
        title: "Alerta!",
        text: "No hay un producto seleccionado",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton:
            "bg-azul text-white font-bold rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-lg rounded-3xl text-white font-bold ",
          icon: "rounded-full p-1",
        },
      });
      return;
    }
    if (!flag_incidences) {
      MySwal.fire({
        title: "Alerta!",
        text: "No hay una incidencia seleccionada",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton:
            "bg-azul text-white font-bold rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-lg rounded-3xl text-white font-bold ",
          icon: "rounded-full p-1",
        },
      });
      return;
    }
    if (!flag_type_time) {
      MySwal.fire({
        title: "Alerta!",
        text: "No hay un tipo de tiempo seleccionado",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton:
            "bg-azul text-white font-bold rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-lg rounded-3xl text-white font-bold ",
          icon: "rounded-full p-1",
        },
      });
      return;
    }

    if (
      catalog_add.type_id === DEFAULT_OPTION ||
      catalog_add.incidence_id === DEFAULT_OPTION ||
      catalog_add.area_id === DEFAULT_OPTION ||
      catalog_add.time_type === DEFAULT_OPTION ||
      catalog_add.orq_id === DEFAULT_OPTION ||
      catalog_add.time === 0
    ) {
      MySwal.fire({
        title: "Alerta!",
        text: "Debe completar todos los campos",
        icon: "warning",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      });
    }

    const catalog_to_send = {
      type_id: catalog_add.type_id,
      incidence_id: catalog_add.incidence_id,
      area_id: catalog_add.area_id,
      time_type: catalog_add.time_type,
      time: catalog_add.time,
      orq_id: catalog_add.orq_id,
    };
    console.log("catalog_to_send", catalog_to_send);
    // return;

    const res = await create_catalog(catalog_to_send);
    console.log(res);

    if (!res) {
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
      return;
    }

    if (res.status != 200) {
      MySwal.fire({
        title: "¡Error!",
        //text: estado,
        icon: "error",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      });
      return;
    }

    const data_ = await res.json();
    console.log("Datos :", data_);
    MySwal.fire({
      title: "¡Producto ingresado con éxito!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).finally(() => {
      onCLosePopUp(); //TODO REFACTORIZAR ESTO
      getData();
    });
  }
  ////////////////////////////////////////////////////////////////////////////////

  function get_user_by_area_function() {
    get_user_by_area(isSelectedArea)
      .then((response) => {
        if (response) {
          return response;
        } else {
          return null;
        }
      })
      .then((data: user[]) => {
        if (data) {
          set_users_by_area(data);
        } else {
          set_users_by_area([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (isSelectedArea !== "") {
      get_user_by_area_function();
    }
  }, [isSelectedArea]);

  useEffect(() => {
    console.log(catalog_add);
  }, [catalog_add]);

  if (!showPopUp) return <></>;

  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center ">
      <form
        className="flex flex-col w-[min(450px,95%)] bg-white rounded-md"
        onSubmit={handle_submit}
      >
        <div className="flex w-full bg-azul h-12 rounded-t-md items-center ">
          <p className="mx-auto text-white font-semibold text-xl">
            Agregar Catalogo
          </p>
        </div>
        <div className="flex flex-col w-[70%] h-full mx-auto mt-2">
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
              value={catalog_add.type_id}
            >
              <option className="text-center" value={DEFAULT_OPTION}>
                {DEFAULT_OPTION}
              </option>
              {types.map((type) => (
                <option
                  key={type.type_id}
                  value={type.type_id}
                  className="text-center"
                >
                  {type.type_name}
                </option>
              ))}
            </select>
          </div>
          {/*  */}
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
            >
              <option className="text-center" value={DEFAULT_OPTION}>
                {DEFAULT_OPTION}
              </option>
              {products.map((product) => (
                <option
                  key={product.product_id}
                  value={product.product_id}
                  className="text-center"
                >
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
          {/*  */}

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Incidencia</p>
              {!isSelectedIncidencia ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
              onChange={handleSelectChangeIncidencia}
              value={isSelectedIncidencia}
            >
              <option className="" value={DEFAULT_OPTION}>
                {DEFAULT_OPTION}
              </option>
              {incidence_option.length > 0 &&
                incidence_option[0].incidences.map((incidence) => {
                  return (
                    <option
                      key={incidence.incidence_id}
                      value={incidence.incidence_id}
                    >
                      {incidence.incidence_name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Área</p>
              {!isSelectedArea ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
              onChange={handleSelectChangeArea}
              value={isSelectedArea}
            >
              <option className="text-center" value={DEFAULT_OPTION}>
                {DEFAULT_OPTION}
              </option>

              {areas.map((area) => (
                <option
                  key={area.area_id}
                  value={area.area_id}
                  className="text-center"
                >
                  {area.area_name}
                </option>
              ))}
            </select>
          </div>

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Orquestador</p>
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
              onChange={handleSelectChangeOrquestador}
              value={isSelectedUSer}
            >
              <option className="text-center" value={DEFAULT_OPTION}>
                {DEFAULT_OPTION}
              </option>
              {users_by_area.map((user) => (
                <option
                  key={user.user_id}
                  value={user.user_id}
                  className="text-center"
                >
                  {user.fullname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row gap-2 w-full mt-1">
            <div className="flex flex-col w-1/2">
              <div className="flex flex-row gap-1">
                <p className="text-left mb-1 text-gris">Tipo tiempo SLA</p>
                {!isSelectedTipoSla ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <select
                className="w-full h-[26px] rounded border-gris border bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
                onChange={handleSelectChangeTipoSla}
                value={isSelectedTipoSla}
              >
                <option className="text-center" value={DEFAULT_OPTION}>
                  {DEFAULT_OPTION}
                </option>
                {Object.values(TypeTime).map((option, i) => (
                  <option value={option} key={i} className="text-center">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <div className="flex flex-row gap-1">
                <p className="text-left mb-1 text-gris">Tiempo SLA</p>
                {isEmptyTime ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <input
                className="w-full h-[26px] rounded border-gris border bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] px-2 "
                required
                type="number"
                onChange={handleInputChangeTime}
              ></input>
            </div>
          </div>

          <div className="flex flex-row h-9 w-[70%] mx-auto items-center justify-center gap-6 my-6">
            <button
              className="h-full w-[50%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado"
              type="submit"
            >
              Guardar
            </button>
            <button
              className="h-full w-[50%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado justify-center flex items-center"
              onClick={onCLosePopUp}
            >
              Salir
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
