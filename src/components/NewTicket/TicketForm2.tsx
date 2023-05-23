import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { JWTContext } from "../Layout/JWT";
import { incidence } from "../../hooks/useIncidence";
import {
  get_catalog,
  get_catalog_by_I_and_t,
  get_catalog_by_type,
  get_incidence_by_catalog,
  get_products_by_type,
} from "../../services/catalog";
import { createTicket } from "../../hooks/useTicket";
import { product } from "../../hooks/useProducts";
import useProducts from "../../hooks/useProducts";
import useAgency from "../../hooks/useAgency";
import useType from "../../hooks/useType";
import useIncidence from "../../hooks/useIncidence";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useChannel from "../../hooks/useChannel";
import useSocial from "../../hooks/useSocial";

const MySwal = withReactContent(Swal);

/* Formulario pt2 */
type FormularioTicket2Props = {
  onBack: () => void;
  onNext: () => void;
  setTicketInfo: Function;
  ticketInfo: createTicket;
};

const SOCIAL_MEDIA_OPTION = "Red Social";

export default function TicketForm2({
  onBack,
  onNext,
  setTicketInfo,
  ticketInfo,
}: FormularioTicket2Props) {
  const { types, setSelectedType, getSelectedItem, getData, selectedType } =
    useType();
  const { user_info } = useContext(JWTContext);
  const { channels } = useChannel();
  const { agencies } = useAgency();
  const { socials } = useSocial();
  const [products, setProducts] = useState<product[]>([]);
  const [incidence, setIncidences] = useState<incidence[]>([]);
  const [needAmount, setNeedAmount] = useState(false);
  const [ticket_info_send, setTicketInfoSend] = useState();
  const [isEmptyAmount, setIsEmptyAmount] = useState(true);

  //const [isSocialMedia, setIsSocialMedia] = useState(false);
  const [catalogSelectedInfo, setCatalogSelectedInfo] = useState({
    catalog_id: "",
    area: {
      area_name: "",
      area_id: "",
    },
    catalog_time: 0,
    is_active: 0,
  });

  const [is_Valid, setIs_Valid] = useState({
    type: true,
    product: true,
    incidence: true,
    area: true,
    agency: true,
    channel: true,
    social: true,
  });
  const [form2_data, setForm2Data] = useState({
    type: "",
    product: "",
    incidence: "",
    area: "",
    agency: "",
    channel: "",
    social: "",
    amount: "",
  });

  function obtener_nombre(canales: any[], selected_id_canal: string): boolean {
    console.log(canales, selected_id_canal);
    const canales_filtrados = canales.filter((canal) => {
      console.log(
        canal.canal_id.toLowerCase(),
        selected_id_canal.toLowerCase(),
        "is true?",
        canal.canal_id.toLowerCase() === selected_id_canal.toLowerCase()
      );
      return canal.canal_id.toLowerCase() === selected_id_canal.toLowerCase();
    });
    if (canales_filtrados.length === 0) return false;
    console.log(canales_filtrados);
    return canales_filtrados[0].canal_name === SOCIAL_MEDIA_OPTION;
  }
  const isSocialMedia: boolean = useMemo(
    () => obtener_nombre(channels, form2_data.channel),
    [channels, form2_data.channel]
  );
  console.log(isSocialMedia);
  /// HAndle clicks

  const handleSelectChangeChannel = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //setSelectedChannel(event.target.value);
    setForm2Data({ ...form2_data, channel: event.target.value });
  };
  const handleSelectChangeAgency = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //setSelectedAgency(event.target.value);
    setForm2Data({ ...form2_data, agency: event.target.value });
  };
  const handleSelectChangeSocial = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //setSelectedSocial(event.target.value);
    setForm2Data({ ...form2_data, social: event.target.value });
  };

  const handleSelectChangeTipo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //setIsSelectedType(event.target.value);
    setForm2Data({ ...form2_data, type: event.target.value });
  };
  const handleSelectChangeProducto = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //setSelectedProducto(event.target.value);
    setForm2Data({ ...form2_data, product: event.target.value });
  };
  const handleSelectChangeIncidencia = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //setSelectedIncidence(event.target.value);
    setForm2Data({ ...form2_data, incidence: event.target.value });
  };
  const handleInputChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === null) {
      setIsEmptyAmount(true);
    } else {
      setIsEmptyAmount(false);
      setForm2Data({ ...form2_data, amount: event.target.value });
      //setAmmount(event.target.value);
    }
  };

  /////////////////////////////////////////
  ////////Funciones  carga de datos
  const getProductsByType = async (typeid: string) => {
    const res = await get_products_by_type(typeid);
    console.log("Datos enviados", {
      type_id: typeid,
    });
    console.log(res);
    if (res) {
      const estado: number = res.status;
      console.log("Estatus del pedido", estado);
      const data_ = await res.json();
      console.log("Datos :", data_);

      setProducts(data_);

      //setForm2Data(...form2_data,product: data_)
    }
  };
  const getIncidenceByTP = async (typeid: string, productid: string) => {
    const res = await get_incidence_by_catalog(typeid, productid);
    console.log("Datos enviados", {
      type_id: typeid,
      product_id: productid,
    });
    console.log(res);
    if (res) {
      const estado: number = res.status;
      console.log("Estatus del pedido", estado);
      const data_ = await res.json();
      console.log("Datos :", data_);

      setIncidences(data_);
    }
  };
  const getCatalogByIT = async (typeid: string, incidenceid: string) => {
    const res = await get_catalog_by_I_and_t({
      type_id: typeid,
      incidence_id: incidenceid,
    });
    console.log("Datos enviados", {
      type_id: typeid,
      incidence_id: incidenceid,
    });
    console.log(res);
    console.log("estado de la transaccion", res?.status);

    if (res) {
      const estado: number = res.status;

      if (estado == 404) {
        MySwal.fire({
          title: "!No existe el catalogo¡",
          //text: "No ha rellenado todos los campos",
          icon: "error",
          timer: 2000,
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        });
      } else if (estado == 200) {
        console.log("Estatus del pedido", estado);
        const data_ = await res.json();
        console.log("Datos :", data_);
        setCatalogSelectedInfo(data_);
      } else {
        MySwal.fire({
          title: "!Ha ocurrido un error¡",
          text: estado.toString(),
          icon: "error",
          timer: 2000,
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
  ////////////////////////////////////////////////
  useEffect(() => {
    console.log(form2_data.type);
    const typeSelected_ = getSelectedItem(form2_data.type);
    if (typeSelected_) {
      getProductsByType(typeSelected_.type_id);
      setForm2Data({ ...form2_data, incidence: "", product: "", area: "" });

      // setSelectedIncidence("");
      // setSelectedProducto("");
      // setSelectedArea("");
      if (typeSelected_.type_name == "Reclamo") {
        setNeedAmount(true);
      }
    }
  }, [form2_data.type]);

  function addInfo(e: any) {
    e.preventDefault();
    console.log(form2_data);
    send_Form_data();
  }
  useEffect(() => {
    console.log(form2_data.product);

    if (form2_data.product != "" && form2_data.type != "") {
      getIncidenceByTP(form2_data.type, form2_data.product);
    } else {
    }
  }, [form2_data.product]);
  useEffect(() => {
    console.log(form2_data.incidence);

    if (
      form2_data.product != "" &&
      form2_data.type != "" &&
      form2_data.incidence != ""
    ) {
      getCatalogByIT(form2_data.type, form2_data.incidence);
    } else {
    }
  }, [form2_data.incidence]);

  useEffect(() => {
    setForm2Data({ ...form2_data, area: catalogSelectedInfo.area.area_name });
    //setSelectedArea(catalogSelectedInfo.area.area_name);
  }, [catalogSelectedInfo]);

  // esta funcion es la que rellenara LOS CAMPOS EN EL PROP TICKET DATA DE MOMENTO SOLO MUESTRA LOS IDS DE LOS CAMPOS
  function send_Form_data() {
    if (
      (form2_data.type,
      form2_data.product,
      form2_data.incidence,
      form2_data.area,
      form2_data.channel != "")
    ) {
      if (isEmptyAmount) {
        setTicketInfo({
          ...ticketInfo,
          status: "Abierto",
          catalog_id: catalogSelectedInfo.catalog_id,
          canal_id: form2_data.channel,
          social_id: form2_data.social,
          agencia_id: form2_data.agency,
          amount: 0,
          user_id: user_info?.user_id,
        });
        onNext();
      } else {
        const value_amount = parseInt(form2_data.amount);

        setTicketInfo({
          ...ticketInfo,
          status: "Abierto",
          catalog_id: catalogSelectedInfo.catalog_id,
          canal_id: form2_data.channel,
          social_id: form2_data.social,
          agencia_id: form2_data.agency,
          amount: value_amount,
          user_id: user_info?.user_id,
        });
        onNext();
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
  return (
    <form onSubmit={addInfo} noValidate>
      <div className="w-4/5 mx-auto mt-2">
        <div className="flex flex-col gap-1">
          <div className="w-full">
            {/*################## Tipo ################ */}
            <div className="w-full mb-1">
              <div className="flex flex-row">
                <p className="text-left  text-gris">Tipo</p>
                {!form2_data.type ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <select
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                onChange={handleSelectChangeTipo}
                value={form2_data.type}
              >
                <option value="0"></option>
                {types.map((type) => (
                  <option key={type.type_id} value={type.type_id}>
                    {type.type_name}
                  </option>
                ))}
              </select>
            </div>
            {/*################## Producto ################ */}
            <div className="flex flex-row">
              <p className="text-left mb-1 text-gris">Producto</p>
              {!form2_data.product ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleSelectChangeProducto}
              value={form2_data.product}
              disabled={form2_data.type === "" ? true : false}
            >
              <option value="0"></option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*################## Incidencia ################ */}
        <div className="flex flex-col gap-1">
          <div className="w-full ">
            <div className="flex flex-row">
              <p className="text-left  text-gris">Incidencia</p>
              {!form2_data.incidence ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>

            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleSelectChangeIncidencia}
              value={form2_data.incidence}
              disabled={
                form2_data.type === "" || form2_data.product === ""
                  ? true
                  : false
              }
            >
              <option value="0"></option>
              {incidence.map((incidence) => (
                <option
                  key={incidence.incidence_id}
                  value={incidence.incidence_id}
                >
                  {incidence.incidence_name}
                </option>
              ))}
            </select>
          </div>

          {/*################## Monto ################ */}

          <div className="w-full">
            <div className="flex flex-row">
              <p className="text-left text-gris">Monto</p>
              {isEmptyAmount ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : (
                <></>
              )}
            </div>
            <input
              className="px-2 w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] font-bold"
              onChange={handleInputChangeAmount}
              type="text"
              pattern="[0-9]+"
            />
          </div>

          <div className="w-full ">
            <p className="text-left text-gris">Área</p>
            <input
              type="text"
              className="px-2 w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              disabled
              value={form2_data.area}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-full">
            <p className="text-left mb-1 text-gris">Canal</p>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleSelectChangeChannel}
              value={form2_data.channel}
            >
              <option value=""></option>
              {channels.map((channel) => (
                <option key={channel.canal_id} value={channel.canal_id}>
                  {channel.canal_name}
                </option>
              ))}
            </select>
          </div>

          {isSocialMedia && (
            <div className="w-full">
              <p className="text-left mb-1 text-gris">Red Social</p>
              <select
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                onChange={handleSelectChangeSocial}
                value={form2_data.social}
              >
                <option value=""></option>
                {socials.map((social) => (
                  <option key={social.social_id} value={social.social_id}>
                    {social.social_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="w-full">
            <p className="text-left  text-gris">Agencia</p>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleSelectChangeAgency}
              value={form2_data.agency}
            >
              <option value="0"></option>
              {agencies.map((agency) => (
                <option key={agency.agencia_id} value={agency.agencia_id}>
                  {agency.agencia_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className=" w-[70%] sm:w-3/5 flex flex-row mx-auto my-6 gap-6 sm:gap-10">
        <div className="h-[35px] w-[50%] sm:w-[35%] border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex justify-center items-center">
          <button type="button" onClick={onBack}>
            Regresar
          </button>
        </div>
        <div className="h-[35px] w-[50%] sm:w-[35%] border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex items-center justify-center">
          <button type="submit">Siguiente</button>
        </div>
      </div>
    </form>
  );
}
