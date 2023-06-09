import icono_ticket from ".././assets/icono_ticket.png";
import icono_editar from "../../assets/icono_editar.png";
import { useEffect, useState } from "react";
import Edit from "./Edit";
import useUserType from "../../hooks/useUserType";
import useRol from "../../hooks/useRol";
import useArea from "../../hooks/useArea";
import useAgency from "../../hooks/useAgency";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { update_user } from "../../services/user";

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

interface UserData {
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

interface EditUserProps {
  showPopUp: boolean;
  onCLosePopUp: () => void;
  userData: UserData;
  getData: Function;
}
const DEFAULT_OPTION = "Ingrese una opción";

export default function EditUser({
  showPopUp,
  onCLosePopUp,
  userData,
  getData,
}: EditUserProps) {
  console.log(userData);
  const { userTypes } = useUserType();
  const { roles, getDataRole } = useRol();
  const { areas } = useArea();
  const { agencies } = useAgency();

  const [firstSelectValue, setFirstSelectValue] = useState<string>("");
  const [secondSelectValue, setSecondSelectValue] = useState<string>("");

  const [user_to_edit, set_user_to_edit] = useState({
    name: userData.fullname,
    username: userData.username,
    email: userData.mail,
    user_type_id: userData.user_type.user_type_id,
    profile_id: userData.user_role.user_role_id,
    area_id: userData.cargo.area.area_id,
    agency_id: userData.agencia.agencia_id,
    cargo_id: userData.cargo.cargo_id,
    is_active: 0,
  });
  function handle_undo(key: keyof UserData) {
    set_user_to_edit({
      ...user_to_edit,
      [key]: userData[key],
    });
  }

  const handleFirstSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // console.log(event.target.value);
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    // setIsSecondSelectDisabled(selectedValue !== "1");
    setSecondSelectValue("");
    set_user_to_edit({
      ...user_to_edit,
      user_type_id: selectedValue,
    });
  };

  console.log(userTypes);
  let perfil_options = userTypes.filter((userType) => {
    return userType.user_type_id === user_to_edit.user_type_id;
  });

  /* Función para transformar is_active a activo O inactivo  */
  function is_active_to_string(is_active: number) {
    if (is_active === 1) {
      return "Activo";
    } else {
      return "Inactivo";
    }
  }

  /* handleSelect */
  function handleSelectChangeUserType(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const new_user_type = event.target.value;
    console.log(new_user_type);
    set_user_to_edit({
      ...user_to_edit,
      user_type_id: new_user_type,
    });
  }

  function handleSelectChangeArea(event: React.ChangeEvent<HTMLSelectElement>) {
    const new_area = event.target.value;
    console.log(new_area);
    set_user_to_edit({
      ...user_to_edit,
      area_id: new_area,
    });
  }

  function handleSelectChangeAgency(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const new_agency = event.target.value;
    console.log(new_agency);
    set_user_to_edit({
      ...user_to_edit,
      agency_id: new_agency,
    });
  }

  function handleSelectChangeCargo(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const new_cargo = event.target.value;
    console.log(new_cargo);
    set_user_to_edit({
      ...user_to_edit,
      cargo_id: new_cargo,
    });
  }

  function handleSelectChangeProfile(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const new_profile = event.target.value;
    console.log(new_profile);
    set_user_to_edit({
      ...user_to_edit,
      profile_id: new_profile,
    });
  }

  let cargo_options = areas.filter((area) => {
    return area.area_id === user_to_edit.area_id;
  });

  function handle_submit(event: any) {
    event.preventDefault();
    console.log(user_to_edit);
    editUser(event);
  }

  useEffect(() => {
    console.log(user_to_edit);
  }, [user_to_edit]);

  useEffect(() => {
    console.log(user_to_edit, userData);
    if (userData)
      set_user_to_edit({
        name: userData.fullname,
        username: userData.username,
        email: userData.mail,
        user_type_id: userData.user_type.user_type_id,
        profile_id: userData.user_role.user_role_id,
        area_id: userData.cargo.area.area_id,
        agency_id: userData.agencia.agencia_id,
        cargo_id: userData.cargo.cargo_id,
        is_active: 0,
      });
  }, [userData]);

  useEffect(() => {
    console.log(firstSelectValue);
  }, [firstSelectValue]);

  ///////////////////// Update product /////////////////////////
  const editUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const res = await update_user({
        fullname: user_to_edit.name,
        mail: user_to_edit.email,
        username: user_to_edit.username,
        user_role_id: user_to_edit.profile_id,
        cargo_id: user_to_edit.cargo_id,
        agencia_id: user_to_edit.agency_id,
        user_type_id: user_to_edit.user_type_id,
        is_active: user_to_edit.is_active,
        user_id: userData.user_id,
      });
      if (res != undefined) {
        console.log("Estatus del pedido: ", res.status);
        const data_ = await res.json();

        console.log("Datos actualizados: ", data_);

        Swal.fire({
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
          onCLosePopUp();
          getData();
        });
      }
    }
  };
  //TODO cambiar el luigar de esta mamada
  const handle_change_edit_input = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_user_to_edit({
      ...user_to_edit,
      [event.target.name]: event.target.value,
    });
  };

  ////////////////////////////////////////////////////////////////////////

  if (!showPopUp) return <></>;
  return (
    <div className="flex fixed w-full h-full bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
      <form
        className="w-[40%] mb-32  bg-white rounded-md"
        onSubmit={handle_submit}
        noValidate
      >
        <div className="bg-azul h-[40px] rounded-t-md flex items-center justify-center text-2xl">
          <p className=" text-center text-white font-bold">Editar Usuario</p>
        </div>
        <div className="flex flex-row h-[100px] gap-4">
          <div className="flex w-[40%] justify-end my-auto">
            <div className="rounded-full bg-morado h-20 w-20"></div>
          </div>
          <div className="w-[60%] my-auto">
            <div className="flex flex-row gap-2">
              <label className="text-morado text-xl font-black pb-1">
                <Edit
                  text={user_to_edit.name}
                  name="name"
                  handle_change={handle_change_edit_input}
                />
              </label>
              <img
                src={icono_editar}
                alt="icono_editar"
                className="h-3 w-3 my-auto"
              />
            </div>
            <div className="flex flex-row gap-2">
              <label className="font-normal text-gris text-sm">
                <Edit
                  text={user_to_edit.username}
                  name="username"
                  handle_change={handle_change_edit_input}
                />
              </label>
              <img
                src={icono_editar}
                alt="icono_editar"
                className="h-3 w-3 my-auto"
              />
            </div>
            <div className="flex flex-row gap-2">
              <label className="font-normal text-gris text-sm">
                <Edit
                  text={user_to_edit.email}
                  name="email"
                  handle_change={handle_change_edit_input}
                />
              </label>
              <img
                src={icono_editar}
                alt="icono_editar"
                className="h-3 w-3 my-auto"
              />
            </div>
          </div>
        </div>

        <div className=" flex flex-row h-[130px] w-[85%] mx-auto mt-2 gap-10 items-center justify-center">
          <div className="w-1/3 flex flex-col gap-4">
            {/* Tipo */}
            <div className="flex flex-col">
              <p className="text-gris">Tipo de usuario</p>
              <select
                className="appearance-none rounded-md border text-center border-gris text-gris text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] cursor-pointer"
                value={user_to_edit.user_type_id}
                onChange={handleSelectChangeUserType}
              >
                {userTypes.map((userType) => (
                  <option
                    value={userType.user_type_id}
                    key={userType.user_type_id}
                  >
                    {userType.user_type}
                  </option>
                ))}
              </select>
            </div>

            {/* Perfil */}
            <div className="flex flex-col">
              <p>Perfil</p>
              <select
                className="appearance-none rounded-md border text-center border-gris text-gris text-sm  focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] cursor-pointer"
                onChange={handleSelectChangeProfile}
                value={user_to_edit.profile_id}
              >
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

          <div className="w-1/3 flex flex-col gap-4">
            {/* Area */}
            <div className="flex flex-col">
              <p>Area</p>
              <select
                className="appearance-none rounded-md border text-center border-gris text-gris text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] cursor-pointer"
                value={user_to_edit.area_id}
                onChange={handleSelectChangeArea}
              >
                {areas.map((area) => (
                  <option key={area.area_id} value={area.area_id}>
                    {area.area_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Cargo */}
            <div className="flex flex-col">
              <p>Cargo</p>
              <select
                className="appearance-none rounded-md border text-center border-gris text-gris text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] cursor-pointer"
                onChange={handleSelectChangeCargo}
                value={user_to_edit.cargo_id}
              >
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

          <div className="w-1/3 flex flex-col gap-4">
            {/* Agencia */}
            <div className="flex flex-col">
              <p className="text-gris">Agencia</p>
              <select
                className="appearance-none rounded-md border text-center border-gris text-gris text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] cursor-pointer"
                value={secondSelectValue}
                onChange={handleSelectChangeAgency}
              >
                {agencies.map((agencia) => (
                  <option key={agencia.agencia_id} value={agencia.agencia_id}>
                    {agencia.agencia_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado */}
            <div className="flex flex-col">
              <p>Estado</p>
              <select className="appearance-none rounded-md border text-center border-gris text-gris text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] cursor-pointer">
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-9 w-[40%] mx-auto items-center justify-center gap-12 my-6">
          <button
            className="h-full w-[30%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado"
            type="submit"
          >
            Guardar
          </button>
          <button
            className="h-full w-[30%] text-morado font-semibold border border-morado rounded-md hover:text-white hover:bg-morado"
            onClick={onCLosePopUp}
          >
            Salir
          </button>
        </div>
      </form>
    </div>
  );
}
