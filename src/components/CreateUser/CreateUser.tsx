import { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import useRole from "../../hooks/useRol";
import useUserType from "../../hooks/useUserType";
import useArea from "../../hooks/useArea";
import useAgency from "../../hooks/useAgency";
import useCargo from "../../hooks/useCargo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { create_user } from "../../services/user";
const MySwal = withReactContent(Swal);

interface CreateUserProps {
  showPopup: boolean;
  onClosePopup: () => void;
  getData: Function;
}

interface user_info {
  fullname: string;
  phone: string;
  mail: string;
  is_active: number;
  profile_pic: string;
  username: string;
  is_default: number;
  user_role_id: string;
  cargo_id: string;
  agencia_id: string;
  user_type_id: string;
}

const DEFAULT_OPTION = "Ingrese una opción";

export default function CreateUser({
  showPopup,
  onClosePopup,
  getData,
}: CreateUserProps) {
  const [show_second_select, set_show_second_select] = useState(false);
  const { roles } = useRole();
  DEFAULT_OPTION;
  const { userTypes } = useUserType();
  const { areas } = useArea();
  const { agencies } = useAgency();
  const { cargos } = useCargo();

  console.log(roles);
  if (roles.length > 0) console.log(roles[0].user_role_name);

  const [user_to_send, set_user_to_send] = useState({
    name: "",
    username: "",
    email: "",
    user_type: DEFAULT_OPTION,
    profile: DEFAULT_OPTION,
    area: DEFAULT_OPTION,
    agency: DEFAULT_OPTION,
    cargo: DEFAULT_OPTION,
  });

  let perfil_options = userTypes.filter((userType) => {
    return userType.user_type_id === user_to_send.user_type;
  });

  console.log("Perfil options:", perfil_options);

  let cargo_options = areas.filter((area) => {
    return area.area_name === user_to_send.area;
  });
  console.log("Area options:", cargo_options);

  /* Handle functions */

  function handleSelectUserAgency(event: React.ChangeEvent<HTMLSelectElement>) {
    const new_agency = event.target.value;
    console.log(new_agency);
    set_user_to_send({
      ...user_to_send,
      agency: new_agency,
    });
    // setShowSecondSelect(false);
  }

  function handleSelectUserArea(event: React.ChangeEvent<HTMLSelectElement>) {
    const new_area = event.target.value;
    console.log(new_area);
    set_user_to_send({
      ...user_to_send,
      area: new_area,
    });
    // setShowSecondSelect(false);
  }

  function handleSelectUserType(event: React.ChangeEvent<HTMLSelectElement>) {
    const new_type = event.target.value;
    console.log(new_type);
    set_user_to_send({
      ...user_to_send,
      user_type: new_type,
    });
    // setShowSecondSelect(false);
  }

  function handleSelectChangeProfile(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const new_profile = event.target.value;
    console.log(new_profile);

    set_user_to_send({
      ...user_to_send,
      profile: new_profile,
    });
    if (
      new_profile === DEFAULT_OPTION ||
      new_profile === "5f504edd-fcd1-4cfa-895f-376b2bd42e08"
    ) {
      set_show_second_select(false);
    } else {
      set_show_second_select(true);
    }
  }

  function handleSelectChangePosition(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const new_position = event.target.value;
    console.log(new_position);
    set_user_to_send({
      ...user_to_send,
      cargo: new_position,
    });
  }

  function handle_submit(event: any) {
    event.preventDefault();
    console.log("submit");
    addUser(event);
  }

  useEffect(() => {
    console.log(user_to_send);
  }, [user_to_send]);

  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      const res = await create_user({
        fullname: user_to_send.name,
        mail: user_to_send.email,
        username: user_to_send.username,
        user_role_id: user_to_send.profile,
        cargo_id: user_to_send.cargo,
        agencia_id: user_to_send.agency,
        user_type_id: user_to_send.user_type,
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
            title: "¡Usuario ingresado con exito!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "bg-azul text-text rounded-3xl text-white",
            },
          }).finally(() => {
            onClosePopup();
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

  if (!showPopup) return <Fragment></Fragment>;
  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
      <form
        onSubmit={handle_submit}
        noValidate
        className="w-[min(550px,90%)] bg-white rounded-md flex flex-col mb-1"
      >
        <div className="flex w-full bg-azul h-[40px] rounded-t-md items-center justify-center">
          <p className="text-white font-bold text-2xl">Crear usuario</p>
        </div>

        <div className="flex flex-col w-[75%] mx-auto mt-2 gap-1">
          <div className="flex flex-col text-gris font-semibold text-base text-left ">
            <p className="">Nombre y apellido</p>
            <input
              required
              onChange={(e) => {
                set_user_to_send({ ...user_to_send, name: e.target.value });
              }}
              className="px-2 border border-gris rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] mt-1"
            />
          </div>
          <div className="flex flex-col text-gris font-semibold text-base text-left ">
            <p className="">Nombre de usuario</p>
            <input
              required
              onChange={(e) => {
                set_user_to_send({ ...user_to_send, username: e.target.value });
              }}
              className="px-2 border border-gris rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] mt-1"
            />
          </div>
          <div className="flex flex-col text-gris font-semibold text-base text-left ">
            <p className="">Correo</p>
            <input
              onChange={(e) => {
                set_user_to_send({ ...user_to_send, email: e.target.value });
              }}
              required
              className="px-2 border border-gris rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] mt-1"
            />
          </div>

          <div className="flex flex-row w-full gap-4">
            {/* Tipo de Usuario (userType) */}
            <div className="flex flex-col text-gris font-semibold text-base text-left w-1/2">
              <p className="">Tipo de usuario</p>
              <select
                onChange={handleSelectUserType}
                value={user_to_send.user_type}
                className="appearance-none bg-transparent border border-gris rounded-md mt-1 px-2"
              >
                <option value={DEFAULT_OPTION}>{DEFAULT_OPTION}</option>
                {userTypes.map((userType) => (
                  <option
                    key={userType.user_type_id}
                    value={userType.user_type_id}
                  >
                    {userType.user_type}
                  </option>
                ))}
              </select>
            </div>
            {/* Perfil de usuario (user_role) */}
            <div className="flex flex-col text-gris font-semibold text-base text-left w-1/2">
              <p className=""> Perfil</p>
              <select
                className="appearance-none bg-transparent border border-gris rounded-md mt-1 px-2"
                onChange={handleSelectChangeProfile}
                value={user_to_send.profile}
              >
                <option value={DEFAULT_OPTION}>{DEFAULT_OPTION}</option>
                {perfil_options.length > 0 &&
                  perfil_options[0].user_roles.map((user_rol) => {
                    console.log(user_rol);
                    return (
                      <option
                        key={user_rol.user_role_id}
                        value={user_rol.user_role_id}
                      >
                        {user_rol.user_role_name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          {show_second_select && (
            <div>
              <div className="flex flex-row gap-4">
                {/* Area */}
                <div className="flex flex-col text-gris font-semibold text-base text-left w-1/2">
                  <p className="">Área</p>
                  <select
                    onChange={handleSelectUserArea}
                    value={user_to_send.area}
                    className="appearance-none bg-transparent border border-gris rounded-md mt-1 px-2"
                  >
                    <option value={DEFAULT_OPTION}>{DEFAULT_OPTION}</option>
                    {areas.map((area) => (
                      <option key={area.area_id} value={area.area_name}>
                        {area.area_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cargo */}
                <div className="flex flex-col text-gris font-semibold text-base text-left w-1/2">
                  <p className="">Cargo</p>
                  <select
                    onChange={handleSelectChangePosition}
                    value={user_to_send.cargo}
                    // value={user_to_send.area}

                    className="appearance-none bg-transparent border border-gris rounded-md mt-1 px-2"
                  >
                    <option value={DEFAULT_OPTION}>{DEFAULT_OPTION}</option>
                    {cargo_options.length > 0 &&
                      cargo_options[0].cargos.map((cargo) => {
                        console.log(cargo);
                        return (
                          <option key={cargo.cargo_id} value={cargo.cargo_id}>
                            {cargo.cargo_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              {/* /////////// */}
              <div className="flex flex-row gap-4">
                {/* Agencia */}
                <div className="flex flex-col text-gris font-semibold text-base text-left w-1/2">
                  <p className="">Agencia</p>
                  <select
                    onChange={handleSelectUserAgency}
                    value={user_to_send.agency}
                    className="appearance-none bg-transparent border border-gris rounded-md mt-1 px-2"
                  >
                    <option value={DEFAULT_OPTION}>{DEFAULT_OPTION}</option>
                    {agencies.map((agency) => (
                      <option key={agency.agencia_id} value={agency.agencia_id}>
                        {agency.agencia_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className=" flex flex-row justify-between w-[40%] mx-auto my-4 text-morado font-semibold h-[35px]">
          <button
            type="submit"
            className="border border-morado rounded-md w-[40%] hover:text-white  hover:bg-morado duration-200"
          >
            Crear
          </button>
          <button
            className="border border-morado rounded-md w-[40%] hover:text-white  hover:bg-morado duration-200"
            onClick={onClosePopup}
          >
            Salir
          </button>
        </div>
      </form>
    </div>
  );
}
