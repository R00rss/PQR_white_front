import { useEffect, useState, useMemo } from "react";
import { incidence } from "../../hooks/useIncidence";
import { get_catalog, get_catalog_by_type } from "../../services/catalog";
import { createTicket } from "../../hooks/useTicket";
import { product } from "../../hooks/useProducts";
import useProducts from "../../hooks/useProducts";
import useAgency from "../../hooks/useAgency";
import useType from "../../hooks/useType";
import useIncidence from "../../hooks/useIncidence";

/* Formulario pt2 */
type FormularioTicket2Props = {
  onBack: () => void;
  onNext: () => void;
  setTicketInfo: Function;
  ticketInfo: createTicket;
};

export default function TicketForm2({
  onBack,
  onNext,
  setTicketInfo,
  ticketInfo,
}: FormularioTicket2Props) {
  const [isSelectedProducto, setIsSelectedProducto] = useState("");
  const [productSelectedinfo, setProductSelectedinfo] = useState<product>();
  const [incidenceProduct, setincidenceProduct] = useState<incidence[]>([]);
  const [incidenceSelectedinfo, setIncidenceSelected] = useState<incidence>();
  const [catalogSelectedInfo, setCatalogSelectedInfo] = useState({
    catalog_id: "",
    area: {
      area_name: "",
      area_id: "",
    },
    catalog_time: 0,
    is_active: 0,
  });
  const [isSelectedArea, setIsSelectedArea] = useState("");

  const [ticket_info_p2, setTicket_Info_p2] = useState({
    type: "",
    product: "",
    incidence: "",
  });

  const handleSelectChangeProducto = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedProducto(event.target.value);
  };

  const [isSelectedTipo, setIsSelectedTipo] = useState("");

  const handleSelectChangeTipo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedTipo(event.target.value);
  };

  const [isSelectedIncidencia, setIsSelectedIncidencia] = useState("");

  const handleSelectChangeIncidencia = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedIncidencia(event.target.value);
  };

  const [isEmptyAmount, setIsEmptyAmount] = useState(true);

  const handleInputChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setIsEmptyAmount(true);
    } else {
      setIsEmptyAmount(false);
    }
  };
  async function addInfo() {
    /////////////////////////////////////
    console.log("PRueba AddInfo");
    /////////////////////////////////////
  }

  const {
    products,
    setProducts,
    getData,
    getSelectedItem,
    setSelectedProduct,
  } = useProducts();
  const { agencies, error, loading } = useAgency();

  const { types } = useType();
  const { incidences } = useIncidence();
  const [ticket_info_send, setTicketInfoSend] = useState({});
  /////////////////////////////////////////
  const catalogData = async (typeid: string) => {
    const res = await get_catalog_by_type(typeid);
    console.log("Datos enviados", {
      type_id: typeid,
    });
    console.log(res);
    if (res) {
      const estado: number = res.status;
      console.log("Estatus del pedido", estado);
      const data_ = await res.json();
      console.log("Datos :", data_);
    }
  };
  useEffect(() => {
    console.log(isSelectedProducto);
    const productSelected_ = getSelectedItem(isSelectedProducto);

    if (productSelected_ && "incidences" in productSelected_) {
      setincidenceProduct(productSelected_.incidences);
    }
  }, [isSelectedProducto]);

  useEffect(() => {
    //console.log(isSelectedTipo, isSelectedProducto, isSelectedIncidencia);
  }, [incidenceProduct]);
  useEffect(() => {
    console.log(isSelectedTipo, isSelectedProducto, isSelectedIncidencia);

    if (isSelectedTipo != "" && isSelectedIncidencia != "") {
      catalogData(isSelectedTipo);
    }
    catalogData(isSelectedTipo);

    //setTicketInfo(...ticketInfo, catalog_id: )
  }, [isSelectedTipo]);

  return (
    <form onSubmit={addInfo} noValidate>
      <div className="w-4/5 mx-auto mt-2">
        <div className="flex flex-col gap-1">
          <div className="w-full">
            {/*################## Tipo ################ */}
            <div className="w-full mb-1">
              <div className="flex flex-row">
                <p className="text-left  text-gris">Tipo</p>
                {!isSelectedTipo ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <select
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                onChange={handleSelectChangeTipo}
                value={isSelectedTipo}
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
              {!isSelectedProducto ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleSelectChangeProducto}
              value={isSelectedProducto}
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
              {!isSelectedIncidencia ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>

            <select
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              onChange={handleSelectChangeIncidencia}
              value={isSelectedIncidencia}
            >
              <option value="0"></option>
              {incidenceProduct.map((incidence) => (
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

          {isSelectedTipo === "3" ? (
            <div className="w-full">
              <div className="flex flex-row">
                <p className="text-left text-gris">Monto</p>
                {isEmptyAmount ? (
                  <p className="text-xs text-red-500 font-bold">*</p>
                ) : null}
              </div>
              <input
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] font-bold"
                onChange={handleInputChangeAmount}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="w-full ">
            <p className="text-left text-gris">Área</p>
            <input
              type="text"
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
              disabled
              value={isSelectedArea}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-full">
            <p className="text-left mb-1 text-gris">Canal</p>
            <select className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
              <option value=""></option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
              <option value="3">Opción 3</option>
            </select>
          </div>
          <div className="w-full">
            <p className="text-left  text-gris">Agencia</p>
            <select className="w-full h-[26px] rounded border-gris border bg-transparent text-left text-gris focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
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
        <div
          className="h-[35px] w-[50%] sm:w-[35%] border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex justify-center items-center"
          onClick={onBack}
        >
          <button>Regresar</button>
        </div>
        <div
          className="h-[35px] w-[50%] sm:w-[35%] border border-morado mx-auto rounded-md bg-blanco text-morado font-bold hover:bg-morado hover:scale-105 duration-[250ms] hover:text-white cursor-pointer flex items-center justify-center"
          onClick={onNext}
        >
          <button>Siguiente</button>
        </div>
      </div>
    </form>
  );
}
