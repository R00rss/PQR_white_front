import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_kmb from "../../assets/logo_kmb.png";
import icono_reportes from "../../assets/icono_reportes.png";
import icono_cerrar_sesion from "../../assets/icono_cerrar_sesion.png";
import ViewUser from "../ViewUser/ViewUser";
import { JWTContext } from "../Layout/JWT";
import { remove_token, set_token } from "../../services/globals";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IButtonOptions {
  [key: string]: {
    name: string;
    imageURL: string;
    path: string;
    options: Array<{
      id: string;
      path: string;
      name: string;
    }>;
  };
}
type SidebarProps = {
  boptions: IButtonOptions;
};

export default function Sidebar({ boptions }: SidebarProps) {
  const history = useNavigate();
  const { user_info } = useContext(JWTContext);
  console.log(user_info);
  console.log(boptions);
  /* Popup */
  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => setShowPopUp(true);
  const handleClosePopUp = () => setShowPopUp(false);

  function logout() {
    remove_token();

    MySwal.fire({
      title: "!Sesion cerrada con exito¡",
      text: "Hasta pronto....",
      icon: "success",
      timer: 2000,
      confirmButtonText: "Aceptar",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
        popup: "bg-azul text-text rounded-3xl",
      },
    }).finally(() => {
      history("/");
    });
  }

  /* Botones */

  useEffect(() => {
    const items_navbar = document.querySelectorAll("[data-set-href]");
    const selected_page = location.pathname;
    if (items_navbar && items_navbar.length > 0) {
      for (let i = 0; i < items_navbar.length; i++) {
        const item = items_navbar[i];
        const data_set_href = item.getAttribute("data-set-href");
        if (data_set_href) {
          console.log(data_set_href);
          if (data_set_href.includes(",")) {
            console.log("array");
            const data_set_href_array = data_set_href.split(",");
            if (data_set_href_array.includes(selected_page)) {
              item.classList.add("text-morado");
              item.classList.add("font-semibold");
            } else {
              item.classList.remove("text-morado");
              item.classList.remove("font-semibold");
            }
          } else if (data_set_href === selected_page) {
            console.log("no array");

            item.classList.add("text-morado");
            item.classList.add("font-semibold");
          } else {
            console.log("undefined");

            item.classList.remove("text-morado");
            item.classList.remove("font-semibold");
          }
        }
      }
    }
  }, []);

  return (
    <>
      {user_info && (
        <div className="flex flex-col justify-start h-[600px] p-3 bg-white w-64 rounded-2xl gap-1 mx-[10%] mt-5 relative shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-center">
            <img src={logo_kmb} className="w-20 h-16" />
          </div>
          <img
            src={icono_reportes}
            alt=""
            className="rounded-full bg-gris h-20 w-20 mt-6 mx-auto"
            onClick={handleShowPopUp}
          />
          <ViewUser showPopUp={showPopUp} onCLosePopUp={handleClosePopUp} />
          <p className="mx-auto text-sm">Bienvenido de vuelta</p>
          <p className="mx-auto text-sm font-semibold">{user_info.fullname}</p>
          <div className="flex flex-col my-16 justify-center">
            <ul>
              {boptions &&
                Object.keys(boptions).map((key) => {
                  const { name, imageURL, path } = boptions[key];
                  return (
                    <li
                      data-set-href={`${path}`}
                      className="rounded-lg  text-base hover:scale-105 duration-500"
                      key={key}
                    >
                      <Link
                        to={path}
                        className="flex items-center gap-2 p-2 ml-[20%]"
                      >
                        <div className="flex flex-row w-[80%]">
                          <div className="flex items-center w-[20%]">
                            <img
                              src={imageURL}
                              alt={`image_${name}`}
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="w-[80%]">
                            <span className="">{name}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <ul className="flex  items-center gap-2  mt-20 font-semibold cursor-pointer hover:scale-105 duration-200  hover:font-bold">
              <li className="flex w-[80%] flex-row text-sm text-gris  ml-[20%]">
                <div className="flex justify-center items-center w-[20%] aspect-square ">
                  <img
                    src={icono_cerrar_sesion}
                    className="w-4 aspect-square"
                  />
                </div>
                <div className="flex items-center w-[80%] ">
                  <span
                    className=" hover:text-morado hover:font-extrabold"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col my-16">
            <ul className="pt-2 pb-4 space-y-1 "></ul>
          </div>
        </div>
      )}
    </>
  );
}
