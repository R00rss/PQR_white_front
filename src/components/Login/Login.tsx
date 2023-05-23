import React, { useState } from "react";
import icono_email from "../../assets/icono_email.png";

import icono_password from "../../assets/icono_password.png";
import icono_eye from "../../assets/icono_eye.png";
import icono_eye_neg from "../../assets/icono_eye_neg.png";
import "./Login.css";
import { change_password, send_credentials } from "../../services/user";

import { get_token, remove_token } from "../../services/globals";
import { set_token } from "../../services/globals";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);



interface user_info {
  username: string;
  password: string;
}
interface new_password {
  password_one: string;
  password_verify: string;
}

function popupSuccessAdvice(title: string, text: string, ico: string) {
  var icon = "success";
  MySwal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: "Aceptar",
    buttonsStyling: false,
    customClass: {
      confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
      popup: "bg-azul text-text rounded-3xl",
    },
  });
}

function Login() {

  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [passOneShow, setPassOneShow] = useState(false);
  const [passVerifyShow, setPassVerifyShow] = useState(false);
  const [user_info, set_user_info] = useState<user_info>({
    username: "",
    password: "",
  });
  const [new_password, set_new_password] = useState<new_password>({
    password_one: "",
    password_verify: "",
  });
  const [defaultPass, set_defaultPass] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };
  // ############## funcion para Validar las contraseñas al solicitar contraseña nueva

  const password_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      event.currentTarget.checkValidity() &&
      new_password.password_one == new_password.password_verify
    ) {
      MySwal.fire({
        title: "¡Contraseña ingresada con exito!",
        // text: "Credenciales inválidas",
        icon: "success",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      }).finally(() => {
        set_new_password({
          password_one: "",
          password_verify: "",
        });
        handleClick();
      });
      /*
        Aqui se implementa la llamada al backend 
      */
     
      const res = await change_password(get_token(), new_password.password_one)
      console.log( "Estatus del pedido : ", res?.status);
      const data_ = await res?.json();
      console.log("Datos : ",data_);
      remove_token;



    } else {
      MySwal.fire({
        title: "¡Error!",
        text: "las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      }).finally(() => {
        set_new_password({
          password_one: "",
          password_verify: "",
        });
      });
    }

    // Popup
  };
  // ######################funcion para validacion y envio de parametros

  const handle_sumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      console.log("Valido");
      const data = user_info;
      //console.log(user_info);
      const res = await send_credentials(user_info);
      console.log(res.status);
      const data_ = await res.json();
      console.log(data_);

      set_token(data_.token);

      console.log(get_token());

      if (res.status == 200) {
        if (data_.is_default == 1) {
          MySwal.fire({
            title: "¡Atención! Primera Sesión",
            text: "Tiene que actualizar su contraseña",
            icon: "info",
            confirmButtonText: "Aceptar",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
              popup: "bg-azul text-text rounded-3xl",
            },
          }).finally(() => {
            set_user_info({ username: "", password: "" });
            handleClick();
          });
        } else {
          MySwal.fire({
            title: "¡Bienvenido!",
            //text: "Tiene que actualizar su contraseña",
            icon: "success",
            confirmButtonText: "Aceptar",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
              popup: "bg-azul text-text rounded-3xl",
            },
          }).finally(()=>{
            
            history("/dashboard/integral")

          });

          
        }
        //handleClick();
      } else if (res.status == 404) {
        MySwal.fire({
          title: "!Error¡",
          text: "El usuario no existe",
          icon: "error",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        });

        set_user_info({ ...user_info, username: "", password: "" });
      } else if (res.status == 409) {
        MySwal.fire({
          title: "!Error¡",
          text: "Credenciales Incorrectas",
          icon: "error",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        });

        set_user_info({ ...user_info, username: "", password: "" });
      } else if (res.status == 500) {
        MySwal.fire({
          title: "!Error¡",
          text: "No hay conexion con el servidor ",
          icon: "error",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        });
      }
    } else {
      MySwal.fire({
        title: "!Error¡",
        text: "No ha rellenado todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl",
        },
      });

      console.log("No valido");
    }
  };

  return (
    <div className=" flex justify-center items-center w-full h-[100vh] content-center bg-fondoazul">
      {/* contenedor general */}
      <div className="w-full max-w-[370px] h-[400px] content-center ">
        <div className="scene scene--card">
          {/* Contenedor Tarjetas */}
          <div className={`card  ${isFlipped ? " is-flipped" : ""}`}>
            {/*Inicio tarjeta Frente */}
            <div className="card__face">
              <form
                onSubmit={handle_sumbit}
                action=""
                className="bg-azul text-white shadow-md rounded-[20px] px-8 pt-10 pb-12 mb-4 opacity-90  mx-auto ty-1"
                noValidate
              >
                <h1 className="text-2xl  pt-4 font-semibold ">
                  Bienvenido de Vuelta!
                </h1>
                <p className="text-sm font-light mb-2">Ingresa tus datos</p>
                <label htmlFor="Username" className="ps-2 text-sm font-light">
                  Usuario{" "}
                </label>

                <div
                  className="flex justify-between place-items-center
items-center
rounded-2xl h-[40px] duration-500 hover:scale-[1.02] "
                >
                  <input
                    onChange={(event) => {
                      set_user_info({
                        ...user_info,
                        username: event.target.value,
                      });
                    }}
                    value={user_info.username}
                    type="text"
                    className="shadow appearance-none border border-transparent bg-plomo rounded w-full my-1 py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline
    indent-5 autofill: color-white"
                    placeholder="user.name"
                    required
                  />
                  <img
                    src={icono_email}
                    alt="mail"
                    className="h-[13px] ml-3 absolute "
                  />
                </div>

                <label htmlFor="Password" className="ps-2 text-sm font-light">
                  Contraseña
                </label>

                <div
                  className="flex 
relative
justify-between place-items-center
items-center 
rounded-2xl h-[40px] mb-5 duration-500 hover:scale-[1.02]"
                >
                  <input
                    onChange={(event) => {
                      set_user_info({
                        ...user_info,
                        password: event.target.value,
                      });
                    }}
                    value={user_info.password}
                    required
                    className="shadow appearance-none border border-transparent bg-[#6883ae] rounded w-full py-1 px-3 text-white mt-1 mb-1 leading-tight focus:outline-none focus:shadow-outline
    indent-5 autofill:bg-inherit autofill: color-white"
                    type={passShow ? "text" : "password"}
                    placeholder="***********"
                  />
                  <img
                    src={icono_password}
                    alt="password"
                    className="h-[14px] absolute ml-3 "
                  />
                  <img
                    src={passShow ? icono_eye : icono_eye_neg}
                    alt="eye"
                    className="h-[14px] 
    ml-[90%]
    absolute"
                    onMouseDown={() => {
                      setPassShow((prev) => true);
                    }}
                    onMouseUp={() => {
                      setPassShow((prev) => false);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#157afe] hover:bg-white hover:text-[#157afe] duration-500 text-white my-4 py-1 px-3 w-full rounded focus:outline-none focus:shadow-outline hover:scale-[1.02]"
                >
                  Ingresar
                </button>
                <div className="w-full border-white border-t-[1px] my-3"></div>
              </form>
            </div>

            {/* Tarjeta parte Trasera */}
            <div className="card__face card__face--back">
              <div className="bg-azul text-white shadow-md rounded-[20px] px-8 pt-10 pb-12 mb-4 opacity-90  mx-auto ty-1 h-[400px]">
                <h1 className="pb-5 text-center font-semibold text-2xl">
                  Ingrese su contraseña!
                </h1>

                <form action="" onSubmit={password_submit}>
                  <label htmlFor="Password" className="ps-2 text-sm font-light">
                    Ingrese su Nueva Contraseña
                  </label>

                  <div
                    className="flex 
relative
justify-between place-items-center
items-center 
rounded-2xl h-[40px] mb-5 duration-500 hover:scale-[1.02]"
                  >
                    <input
                      onChange={(event) => {
                        set_new_password({
                          ...new_password,
                          password_one: event.target.value,
                        });
                      }}
                      value={new_password.password_one}
                      required
                      className="shadow appearance-none border border-transparent bg-[#6883ae] rounded w-full py-1 px-3 text-white mt-1 mb-1 leading-tight focus:outline-none focus:shadow-outline
    indent-5 autofill:bg-inherit autofill: color-white"
                      type={passOneShow ? "text" : "password"}
                      placeholder="***********"
                    />
                    <img
                      src={icono_password}
                      alt="password"
                      className="h-[14px] absolute ml-3 "
                    />
                    <img
                      src={passOneShow ? icono_eye : icono_eye_neg}
                      alt="eye"
                      className="h-[14px] 
    ml-[90%]
    absolute"
                      onMouseDown={() => {
                        setPassOneShow((prev) => true);
                      }}
                      onMouseUp={() => {
                        setPassOneShow((prev) => false);
                      }}
                    />
                  </div>

                  <label htmlFor="Password" className="ps-2 text-sm font-light">
                    Vuelva a ingresar la Contraseña
                  </label>

                  <div
                    className="flex 
relative
justify-between place-items-center
items-center 
rounded-2xl h-[40px] mb-5 duration-500 hover:scale-[1.02]"
                  >
                    <input
                      onChange={(event) => {
                        set_new_password({
                          ...new_password,
                          password_verify: event.target.value,
                        });
                      }}
                      value={new_password.password_verify}
                      required
                      className="shadow appearance-none border border-transparent bg-[#6883ae] rounded w-full py-1 px-3 text-white mt-1 mb-1 leading-tight focus:outline-none focus:shadow-outline
    indent-5 autofill:bg-inherit autofill: color-white"
                      type={passVerifyShow ? "text" : "password"}
                      placeholder="***********"
                    />
                    <img
                      src={icono_password}
                      alt="password"
                      className="h-[14px] absolute ml-3 "
                    />
                    <img
                      src={passVerifyShow ? icono_eye : icono_eye_neg}
                      alt="eye"
                      className="h-[14px] 
    ml-[90%]
    absolute"
                      onMouseDown={() => {
                        setPassVerifyShow((prev) => true);
                      }}
                      onMouseUp={() => {
                        setPassVerifyShow((prev) => false);
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#157afe] hover:bg-white hover:text-[#157afe] duration-500 text-white my-4 py-1 px-3 w-full rounded focus:outline-none focus:shadow-outline hover:scale-[1.02]"
                  >
                    Actualizar Contraseña
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fin contenedor general */}
    </div>
  );
}
export default Login;
