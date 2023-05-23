import React, { useState, ChangeEvent, useEffect } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import EditUser from "../../components/EditUsers/EditUser";
import CreateUser from "../../components/CreateUser/CreateUser";
import { get_users } from "../../services/userAdministration";
import useUser from "../../hooks/useUser";

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

interface Users {
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

export default function UserAdministration() {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const {
    users,
    setUsers,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedUser,
    setSelectedUser,
    // getItemByName,
    getItemByArea,
  } = useUser();

  let maxPage = Math.ceil(users.length / 7);

  const filteredUsers = (): Users[] => {
    if (search.length == 0) {
      maxPage = Math.ceil(users.length / 7);
      return users.slice(currentPage, currentPage + 7);
    } else {
      //Si hay algo en la busqueda
      const filtered = users.filter((user) =>
        [
          user.fullname,
          user.mail,
          user.user_role.user_role_name,
          user.username,
        ].some((field) => field.toLowerCase().includes(search.toLowerCase()))
      );
      maxPage = Math.ceil(filtered.length / 7);
      return filtered.slice(currentPage, currentPage + 7);
    }
  };

  const nextPage = () => {
    if (
      users.length > currentPage + 7 &&
      users.filter((user) => user.fullname.includes(search)).length >
        currentPage + 7
    )
      setCurrentPage(currentPage + 7);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 7);
  };

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  /* Popup */
  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => setShowPopUp(true);
  const handleClosePopUp = () => setShowPopUp(false);

  function handleClick(user: Users) {
    handleShowPopUp();
    console.log(user);
    setSelectedUser(user);
  }

  /* PopUp Crear usuario */
  const [showPopUpCreateUser, setShowPopUpCreateUser] = useState(false);
  const handleShowPopUpCreateUser = () => setShowPopUpCreateUser(true);
  const handleClosePopUpCreateUser = () => setShowPopUpCreateUser(false);

  return (
    <LayoutBar opcionSeleccionada="administracion">
      {selectedUser && (
        <EditUser
          showPopUp={showPopUp}
          onCLosePopUp={handleClosePopUp}
          userData={selectedUser}
          getData={getData}
        />
      )}
      <div className="w-[90%]">
        {/* Hijo 1 */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4 w-[80%]">
            <p className="text-gris text-base my-auto pl-4">Buscar</p>
            <input
              className="w-1/2 rounded-md border-gris-claro border focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] px-2"
              placeholder="Buscar usuario"
              type="text"
              value={search}
              onChange={onSearchChange}
            ></input>
          </div>
          <button
            className="text-azul font-bold"
            onClick={handleShowPopUpCreateUser}
          >
            Crear usuario
          </button>
          <CreateUser
            showPopup={showPopUpCreateUser}
            onClosePopup={handleClosePopUpCreateUser}
            getData={getData}
          />
        </div>

        <div className="w-full h-[372px] rounded-lg border border-gris-claro mt-4 cursor-pointer">
          <div className="flex flex-row bg-azul sm:h-[36px] rounded-t-lg justify-between text-white font-semibold ">
            <p className="w-[31%] my-auto pl-8 text-left  ">Nombres</p>
            <p className="w-[27%] my-auto">Correo</p>
            <p className="w-[15%] my-auto text-end text-sm">
              Perfil de Usuario
            </p>
            <p className="w-[9%] my-auto">Estado</p>
            <p className="w-[18%] my-auto text-center">User ID</p>
          </div>
          {filteredUsers().map((user) => (
            <div
              className=" w-full h-12 flex flex-row border border-b-gris-claro"
              key={user.user_id}
              onClick={() => {
                console.log(user);
                handleClick(user);
              }}
            >
              <p className="w-[31%] my-auto pl-6 text-left text-base font-medium text-azul  ">
                {user.fullname}
              </p>
              <p className="w-[27%] my-auto text-start">{user.mail}</p>
              <p className="w-[15%] my-auto text-start pl-6">
                {user.user_role.user_role_name}
              </p>
              <p className="w-[9%] my-auto pl-2">
                {user.is_active == 1
                  ? "Activo"
                  : user.is_active == 0
                  ? "Inactivo"
                  : null}
              </p>
              <p className="w-[18%] my-auto text-sm">{user.username}</p>
            </div>
          ))}
        </div>

        {/* Hijo4 */}
        <div className="flex flex-row justify-end my-6">
          <div className="flex justify-start w-full ml-2 sm:ml-12 md:mx-auto">
            <div className="flex flex-row justify-center gap-8  md:mx-auto ">
              <button
                className="w-[100px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado hover:scale-105 hover:duration-200"
                onClick={prevPage}
              >
                Atras
              </button>
              <button
                className=" w-[100px] h-[35px] text-morado font-semibold rounded-md border border-morado hover:text-white hover:bg-morado hover:scale-105 hover:duration-200"
                onClick={nextPage}
              >
                Siguiente
              </button>
            </div>
          </div>

          <div className="absolute mr-2">
            <div className="flex flex-row gap-2">
              <p>Página</p>
              <div className="w-7 text-center text-morado font-extrabold border border-morado rounded-md">
                {Math.floor((currentPage + 7) / 7)}
              </div>
              <p>de {maxPage}</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutBar>
  );
}
