import { useEffect, useState } from "react";
import useArea from "../../hooks/useArea";
import { get_user_by_area } from "../../services/user";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
import withReactContent from "sweetalert2-react-content";
import { update_catalog } from "../../services/catalog";

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

interface EditCatalogProps {
  showPopUp: boolean;
  onCLosePopUp: () => void;
  catalogData: Catalog;
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

export default function EditCatalog({
  showPopUp,
  onCLosePopUp,
  catalogData,
  getData,
}: EditCatalogProps) {
  const [isSelectedArea, setIsSelectedArea] = useState("");
  const [isSelectedTipoSla, setIsSelectedTipoSla] = useState("");
  const [isEmptyTime, setIsEmptyTime] = useState(true);
  const [users_by_area, set_users_by_area] = useState<user[]>([]);
  const { areas } = useArea();
  const [isSelectedUSer, setIsSelectedUSer] = useState("");

  const [catalog_update, set_catalog_update] = useState({
    is_active: catalogData.is_active,
    type_id: catalogData.types.type_id,
    incidence_id: catalogData.incidence.incidence_id,
    area_id: DEFAULT_OPTION,
    time_type: DEFAULT_OPTION,
    time: 0,
    orq_id: DEFAULT_OPTION,
    catalog_id: catalogData.catalog_id,
  });

  /* Flags */
  const flag_users_by_area = users_by_area.length > 0;
  const flag_isSelectedArea = isSelectedArea !== DEFAULT_OPTION;
  const flag_isSelectedTipoSla = isSelectedTipoSla !== DEFAULT_OPTION;

  function handleSelectChangeArea(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("event.target.value", event.target.value);
    setIsSelectedArea(event.target.value);
    const new_area = event.target.value;
    set_catalog_update({ ...catalog_update, area_id: new_area });
  }

  const handleSelectChangeOrquestador = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const orquestador = event.target.value;
    setIsSelectedUSer(orquestador);
    set_catalog_update({ ...catalog_update, orq_id: orquestador });
  };

  const handleSelectChangeTipoSla = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tipo_tiempo = event.target.value;
    setIsSelectedTipoSla(tipo_tiempo);
    set_catalog_update({ ...catalog_update, time_type: tipo_tiempo });
  };

  const handleInputChangeTime = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyTime(event.target.value === "");
    const time_number = parseInt(event.target.value);
    set_catalog_update({ ...catalog_update, time: time_number });
  };

  function handle_submit(event: any) {
    event.preventDefault();
    console.log("submit");
    editCatalog(event);
  }

  /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (isSelectedArea !== "") {
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
  }, [isSelectedArea]);
  /////////////////////////////////////////////////////////////////////////

  //////////////////////////////// Edit Catalog ///////////////////////////
  async function editCatalog(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.currentTarget.reportValidity();
      return;
    }
    if (!flag_users_by_area) {
      MySwal.fire({
        title: "Alerta!",
        text: "No hay orquestadores disponibles",
        icon: "warning",
        // confirmButtonText: "Aceptar",
        showConfirmButton: false,
        buttonsStyling: false,
        timer: 1500,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl text-white",
        },
      });
      return;
    }
    if (!flag_isSelectedArea) {
      MySwal.fire({
        title: "Alerta!",
        text: "Debe seleccionar un área",
        icon: "warning",
        // confirmButtonText: "Aceptar",
        buttonsStyling: false,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl text-white",
        },
      });
      return;
    }
    if (!flag_isSelectedTipoSla) {
      MySwal.fire({
        title: "Alerta!",
        text: "Debe seleccionar un tipo de tiempo",
        icon: "warning",
        // confirmButtonText: "Aceptar",
        buttonsStyling: false,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl text-white",
        },
      });
      return;
    }

    if (
      catalog_update.area_id === DEFAULT_OPTION ||
      catalog_update.orq_id === DEFAULT_OPTION ||
      catalog_update.time_type === DEFAULT_OPTION ||
      catalog_update.time === 0
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

    const catalog_to_update = {
      is_active: catalog_update.is_active,
      type_id: catalog_update.type_id,
      incidence_id: catalog_update.incidence_id,
      area_id: catalog_update.area_id,
      time_type: catalog_update.time_type,
      time: catalog_update.time,
      orq_id: catalog_update.orq_id,
      catalog_id: catalog_update.catalog_id,
    };
    console.log("catalog_update", catalog_update);

    const res = await update_catalog(catalog_to_update);
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

  useEffect(() => {
    console.log(catalog_update);
  }, [catalog_update]);

  /////////////////////////////////////////////////////////////////////////

  if (!showPopUp) return <></>;
  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center ">
      <form
        className="flex flex-col w-[min(450px,95%)] bg-white rounded-md"
        onSubmit={handle_submit}
      >
        <div className="flex w-full bg-azul h-10 rounded-t-md items-center ">
          <p className="mx-auto text-white font-semibold text-xl">
            Editar Catalogo
          </p>
        </div>
        <div className="flex flex-col w-[70%] h-full mx-auto mt-2">
          <div className=" flex flex-col w-full pt-2">
            <div className="flex flex-row gap-1">
              <p className="text-center mb-1 text-gris">Tipo</p>
            </div>
            <p className="w-full h-[26px] rounded border-gris border bg-transparent text-center text-morado focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none px-2 cursor-not-allowed">
              {catalogData.types.type_name}
            </p>
          </div>
          {/*  */}
          <div className=" flex flex-col w-full pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Producto</p>
            </div>
            <p className="w-full h-[26px] rounded border-gris border bg-transparent  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none px-2 text-center text-morado cursor-not-allowed">
              {catalogData.product.product_name}
            </p>
          </div>
          {/*  */}

          <div className=" flex flex-col w-full pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Incidencia</p>
            </div>
            <p className="w-full h-[26px] rounded border-gris border bg-transparent text-center text-morado focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none px-2 cursor-not-allowed">
              {catalogData.incidence.incidence_name}
            </p>
          </div>

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris">Área</p>
              {!isSelectedArea ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-center text-morado focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
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
              className="w-full h-[26px] rounded border-gris border bg-transparent text-center text-morado focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
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
                className="w-full h-[26px] rounded border-gris border bg-transparent text-center text-morado focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none"
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
                className="w-full h-[26px] rounded border-gris border bg-transparent text-center text-morado focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                onChange={handleInputChangeTime}
                type="number"
                required
              ></input>
            </div>
          </div>

          <div className="flex flex-row h-9 w-[80%] mx-auto items-center justify-center gap-10 my-6">
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
