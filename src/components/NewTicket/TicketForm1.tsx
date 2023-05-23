import useClient from "../../hooks/useClient";
import { useEffect, useState, useMemo } from "react";
import { createTicket } from "../../hooks/useTicket";
import {
  validarcedula,
  validarRUC,
  validarPass,
  validarName,
  validarCorreo,
  validarTelefono,
} from "../../services/validators/id_Validator";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

type FormularioTicket1Props = {
  onNext: () => void;
  setTicketInfo: Function;
  ticketInfo: createTicket;
};

export default function TicketForm1({
  onNext,
  setTicketInfo,
  ticketInfo,
}: FormularioTicket1Props) {
  const { client, identification, set_identification, is_new_client } =
    useClient("");
  const [is_Valid, setIsValid] = useState({
    identification: true,
    client_name: true,
    client_mail: true,
    client_phone: true,
  });
  const [data_received_ticket, set_data_received_ticket] = useState({
    client_id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [validators, setValidators] = useState({
    pattern: "",
    maxLenght: 0,
    type: "",
  });
  const [data_to_send, set_data_to_send] = useState({
    tipo: "",
    valor: "",
  });
  useEffect(() => {
    if (data_to_send.tipo == "0") {
      console.log("Verificacion Erronea");
    } else if (data_to_send.tipo == "1") {
      setIsValid({
        ...is_Valid,
        identification: validarcedula(data_to_send.valor),
        client_name: validarName(data_received_ticket.name),
        client_mail: validarCorreo(data_received_ticket.email),
        client_phone: validarTelefono(data_received_ticket.phone),
      });

      console.log("Verificacion por medio de cedula");
      if (
        is_Valid.identification &&
        is_Valid.client_name &&
        is_Valid.client_mail &&
        is_Valid.client_phone
      ) {
        console.log("Verificacion Correcta");
      } else {
        console.log("Verificacion incorrecta");
      }
    } else if (data_to_send.tipo == "2") {
      setIsValid({
        ...is_Valid,
        identification: validarRUC(data_to_send.valor),
        client_name: validarName(data_received_ticket.name),
        client_mail: validarCorreo(data_received_ticket.email),
        client_phone: validarTelefono(data_received_ticket.phone),
      });

      console.log("Verificacion por medio de Ruc");
      if (
        is_Valid.identification &&
        is_Valid.client_name &&
        is_Valid.client_mail &&
        is_Valid.client_phone
      ) {
        console.log("Verificacion Correcta");
      } else {
        console.log("Verificacion incorrecta");
      }
    } else if (data_to_send.tipo == "3") {
      setIsValid({
        ...is_Valid,
        identification: validarPass(data_to_send.valor),
        client_name: validarName(data_received_ticket.name),
        client_mail: validarCorreo(data_received_ticket.email),
        client_phone: validarTelefono(data_received_ticket.phone),
      });

      console.log("Verificacion por medio de pasaporte");
      if (
        is_Valid.identification &&
        is_Valid.client_name &&
        is_Valid.client_mail &&
        is_Valid.client_phone
      ) {
        console.log("Verificacion Correcta");
      } else {
        console.log("Verificacion incorrecta");
      }
    }
  }, [data_received_ticket, data_to_send]);

  function nextFunc() {
    //verificacion que estan validados todos los campos
    console.log("informacion Enviada: ", data_received_ticket, data_to_send);

    if (
      (data_to_send.tipo,
      data_to_send.valor,
      data_received_ticket.name,
      data_received_ticket.phone,
      data_received_ticket.email != undefined)
    ) {
      if (
        (is_Valid.identification,
        is_Valid.client_name,
        is_Valid.client_mail,
        is_Valid.client_phone === true)
      ) {
        // Valida que es nuevo cliente por medio de si existe una cedula recibida o no
        if (data_received_ticket.client_id != "") {
          // en el caso de que exista el cliente en la base de datos
          console.log("El Cliente Existe en la base de datos ");
          setTicketInfo({
            ...ticketInfo,
            client_id: data_received_ticket.client_id,
            is_new_client: is_new_client,
          });
          console.log("Informacion de cliente en la base de datos", ticketInfo);
          onNext();
        } else {
          // En el caso que se tenga que crear un cliente para este ticket

          console.log("Es Cliente nuevo: ");

          //console.log(is_Valid);
          console.log(data_received_ticket);
          setTicketInfo({
            ...ticketInfo,

            new_identification: data_to_send.valor,
            client_id: data_received_ticket.client_id,
            is_new_client: is_new_client,
          });

          onNext();
        }
      } else {
        MySwal.fire({
          html: (
            <>
              <h1 className="text-2xl text-slate-700">
                La informacion no es valida!:
              </h1>
            </>
          ),
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Entendido",
          buttonsStyling: false,

          customClass: {
            confirmButton:
              "bg-morado text-white rounded-2xl h-[40px] w-[140px] px-2 mr-1 border-2 border-morado hover:bg-transparent hover:text-morado duration-500",
            denyButton:
              "bg-red-400 text-white rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 duration-500",
            popup: "bg-azul text-text rounded-3xl",
          },
        });
      }
    } else {
      MySwal.fire({
        html: (
          <>
            <h1 className="text-2xl text-slate-700">
              No se ha llenado todos los campos!:
            </h1>
          </>
        ),
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Entendido",
        buttonsStyling: false,

        customClass: {
          confirmButton:
            "bg-morado text-white rounded-2xl h-[40px] w-[140px] px-2 mr-1 border-2 border-morado hover:bg-transparent hover:text-morado duration-500",
          denyButton:
            "bg-red-400 text-white rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 duration-500",
          popup: "bg-azul text-text rounded-3xl",
        },
      });
    }
  }
  const isEmptyIdentificacion = useMemo(
    () => data_to_send.valor === "",
    [data_to_send.valor]
  );
  async function handleSelectChangeTipoIdentificacion(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    set_data_to_send({ ...data_to_send, tipo: event.target.value, valor: "" });

    //console.log("Valor del evento", event.target.value);

    //
  }
  useEffect(() => {
    if (data_to_send.tipo == "0") {
      setValidators({
        ...validators,
        pattern: "",
        maxLenght: 0,
        type: "number",
      });
    } else if (data_to_send.tipo == "1") {
      setValidators({
        ...validators,
        pattern: "[0-9]{1,10}",
        maxLenght: 10,
        type: "number",
      });
    } else if (data_to_send.tipo == "2") {
      setValidators({
        ...validators,
        pattern: "^[0-9]{1,13}$",
        maxLenght: 13,
        type: "number",
      });
    } else if (data_to_send.tipo == "3") {
      setValidators({
        ...validators,
        pattern: "[0-9a-A]{1,12}$",
        maxLenght: 12,
        type: "text",
      });
    }
    console.log("valor del data tu send", data_to_send.tipo);
  }, [data_to_send.tipo]);

  useEffect(() => {
    console.log(validators);
  }, [validators]);
  /////////////////////////////////////////////////
  const handleInputChangeIdentificacion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // con esta funcion se limita la cantidad de caracteres
    const maxLength = validators.maxLenght;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
    //seteo de los valores en data_to_send
    set_data_to_send({ ...data_to_send, valor: event.target.value });
    console.log(data_to_send);
  };

  function handle_click_search() {
    if (data_to_send.tipo == "") {
      MySwal.fire({
        html: (
          <>
            <h1 className="text-2xl text-slate-700">
              No ha elegido un tipo de identificacion
            </h1>
          </>
        ),
        timer: 2000,
        icon: "error",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-morado text-white rounded-2xl h-[40px] w-[140px] px-2 mr-1 border-2 border-morado hover:bg-transparent hover:text-morado duration-500",
          denyButton:
            "bg-red-400 text-white rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 duration-500",
          popup: "bg-azul text-text rounded-3xl",
        },
      });
    } else {
      if (is_Valid.identification) {
        set_identification(data_to_send.valor);
      } else {
        MySwal.fire({
          html: (
            <>
              <h1 className="text-2xl text-slate-700">
                El numero de identificacion no es invalido
              </h1>
            </>
          ),
          icon: "error",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Guardar",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-morado text-white rounded-2xl h-[40px] w-[140px] px-2 mr-1 border-2 border-morado hover:bg-transparent hover:text-morado duration-500",
            denyButton:
              "bg-red-400 text-white rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 duration-500",
            popup: "bg-azul text-text rounded-3xl",
          },
        });
      }
    }
  }

  /// esto estaq comentado porque al intentar ir al la ruta ce creacion de nuevo ticket sin sesion sale este mensaje en vez de el de fin de sesion

  // useEffect(() => {
  //   if (is_new_client) {
  //     MySwal.fire({
  //       html: (
  //         <>
  //           <h1 className="text-2xl text-slate-700">
  //             No se ha encontrado el cliente
  //           </h1>
  //         </>
  //       ),
  //       icon: "info",
  //       showDenyButton: false,
  //       showCancelButton: false,
  //       confirmButtonText: "Entendido",
  //       buttonsStyling: false,
  //       customClass: {
  //         confirmButton:
  //           "bg-morado text-white rounded-2xl h-[40px] w-[140px] px-2 mr-1 border-2 border-morado hover:bg-transparent hover:text-morado duration-500",
  //         denyButton:
  //           "bg-red-400 text-white rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 duration-500",
  //         popup: "bg-azul text-text rounded-3xl",
  //       },
  //     });
  //   }
  // }, [is_new_client]);

  useEffect(() => {
    console.log(client);
    const { client_name, client_mail, client_phone, client_id } = client;

    set_data_received_ticket({
      ...data_received_ticket,
      client_id: client_id,
      name: client_name,
      email: client_mail,
      phone: client_phone,
    });
  }, [client]);

  return (
    <div className="w-4/5 mx-auto mt-8">
      <div className="flex flex-col gap-2 mt-2">
        <div className="w-full flex flex-col">
          <div className="flex flex-row gap-2 ">
            <p className="text-left mb-1 text-gris">Tipo</p>
            {data_to_send.tipo === "" ? (
              <p className="text-xs text-red-500 font-bold">*</p>
            ) : (
              <></>
            )}
          </div>
          <select
            className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
            onChange={handleSelectChangeTipoIdentificacion}
            value={data_to_send.tipo}
          >
            <option value="0"></option>
            <option value="1">Cédula</option>
            <option value="2">RUC</option>
            <option value="3">Pasaporte</option>
          </select>
        </div>
        <div className="w-full">
          <div className="flex flex-row">
            <p className="text-left mb-1 text-gris">Cédula cliente</p>
            {isEmptyIdentificacion ? (
              <p className="text-xs text-red-500 font-bold">*</p>
            ) : null}
          </div>
          <div className="w-full flex">
            <input
              type={validators.type}
              pattern={validators.pattern}
              maxLength={validators.maxLenght}
              max={validators.maxLenght}
              className={`px-2 w-5/6 h-[26px] rounded-s-md border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]  ${
                is_Valid.identification ? " border-gris" : "border-red-500"
              }`}
              onChange={handleInputChangeIdentificacion}
              value={data_to_send.valor}
            ></input>
            <button
              onClick={handle_click_search}
              className="w-1/6  rounded-tr rounded-br border border-gris text-gris hover:bg-morado hover:font-bold duration-200 hover:text-white cursor-pointer text-xs lg:text-base "
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="w-full ">
          <p className="text-left mb-1 text-gris">Nombre cliente</p>
          <input
            required
            value={data_received_ticket.name}
            onChange={(e) =>
              set_data_received_ticket({
                ...data_received_ticket,
                name: e.target.value,
              })
            }
            readOnly={!is_new_client}
            type="text"
            className={`read-only:opacity-40 read-only:cursor-not-allowed px-2 w-full h-[26px] rounded  border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] ${
              is_Valid.client_name ? "border-gris" : "border-red-400"
            }`}
          />
        </div>
        <div className="w-full">
          <p className="text-left mb-1 text-gris">Correo cliente</p>
          <input
            required
            value={data_received_ticket.email}
            onChange={(e) =>
              set_data_received_ticket({
                ...data_received_ticket,
                email: e.target.value,
              })
            }
            readOnly={!is_new_client}
            type="text"
            className={`read-only:opacity-40 read-only:cursor-not-allowed px-2 w-full h-[26px] rounded  border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] ${
              is_Valid.client_mail ? "border-gris" : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="w-full">
          <p className="text-left mb-1 text-gris">Teléfono cliente</p>
          <input
            required
            value={data_received_ticket.phone}
            onChange={(e) =>
              set_data_received_ticket({
                ...data_received_ticket,
                phone: e.target.value,
              })
            }
            readOnly={!is_new_client}
            type="text"
            className={`read-only:opacity-40 read-only:cursor-not-allowed px-2 w-full h-[26px] rounded  border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600  focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] ${
              is_Valid.client_phone ? "border-gris" : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div
        className="my-4 h-[33px] w-1/4 border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex items-center justify-center "
        onClick={() => {
          nextFunc();
        }}
      >
        <button>Siguiente</button>
      </div>
    </div>
  );
}
