import { useState } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import BusquedaCatalogo from "../../components/Catalogo/BusquedaCatalogo";

interface FormValues {
  tipo: string;
  filtro: string;
  startDate: string;
  finishDate: string;
  ticketNumber: string;
  ticketStart: string;
  ticketFinish: string;
  identification: string;
  state: string;
}

const DEFAULT_OPTION = "Ingrese una opción";

export default function Report() {
  const [isSelectedTipoReporte, setIsSelectedTipoReporte] = useState("");
  const [isSelectedFiltro, setIsSelectedFiltro] = useState("");
  const [isEmptyTicket, setIsEmptyTicket] = useState(true);
  const [isEmptyTicketInicio, setIsEmptyTicketInicio] = useState(true);
  const [isEmptyTicketFin, setIsEmptyTicketFin] = useState(true);
  const [isEmptyIdentificacion, setIsEmptyIdentificacion] = useState(true);
  const [isSelectedState, setIsSelectedState] = useState("");
  const [formValues, setFormValues] = useState<FormValues>({
    tipo: "",
    filtro: "",
    startDate: "",
    finishDate: "",
    ticketNumber: "",
    ticketStart: "",
    ticketFinish: "",
    identification: "",
    state: "",
  });

  const handleCleanForm = () => {
    setFormValues({
      tipo: "",
      filtro: "",
      startDate: "",
      finishDate: "",
      ticketNumber: "",
      ticketStart: "",
      ticketFinish: "",
      identification: "",
      state: "",
    });
    setIsSelectedTipoReporte("");
    setIsSelectedFiltro("");
    setIsSelectedState("");
    setIsEmptyTicket(true);
    setIsEmptyTicketInicio(true);
    setIsEmptyTicketFin(true);
    setIsEmptyIdentificacion(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectOnChangeTipo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleSelectTipoReporte(event);
    handleSelectChange(event);
  };

  const handleSelectOnChangeFiltro = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleSelectFiltro(event);
    handleSelectChange(event);
  };

  const handleSelectOnChangeState = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // handleSelectState(event);
    handleSelectChange(event);
  };

  const handleSelectTipoReporte = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsSelectedTipoReporte(event.target.value);
  };

  const handleSelectFiltro = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelectedFiltro(event.target.value);
  };

  const handleInputChangeTicket = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyTicket(event.target.value === "");
  };

  const handleInputChangeTicketInicio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyTicketInicio(event.target.value === "");
  };

  const handleInputChangeTicketFin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyTicketFin(event.target.value === "");
  };

  const handleInputChangeIdentificacion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEmptyIdentificacion(event.target.value === "");
  };

  const handleSelectState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelectedState(event.target.value);
  };

  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => setShowPopUp(true);
  const handleClosePopUp = () => setShowPopUp(false);
  return (
    <LayoutBar opcionSeleccionada="reportes">
      <div className="flex flex-col rounded-md w-[min(550px,90%)] shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
        <div className="w-full h-[43px] bg-azul rounded-t-md flex items-center justify-center">
          <p className="text-white text-2xl font-bold ">Reportes</p>
        </div>

        <div className="w-2/3 mx-auto h-full flex flex-col ">
          <div className=" flex flex-col w-full pt-2">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris font-semibold">
                Tipo de reporte
              </p>
              {!isSelectedTipoReporte ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              name="tipo"
              value={formValues.tipo}
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] font-bold text-morado"
              onChange={handleSelectOnChangeTipo}
            >
              <option value={DEFAULT_OPTION} className="text-center">
                {DEFAULT_OPTION}
              </option>
              <option value="1" className="text-center">
                Histórico
              </option>
              <option value="2" className="text-center">
                Ultima gestión
              </option>
            </select>
          </div>

          <div className=" flex flex-col w-full  pt-2 ">
            <div className="flex flex-row gap-1">
              <p className="text-left mb-1 text-gris font-semibold">Filtro</p>
              {!isSelectedFiltro ? (
                <p className="text-xs text-red-500 font-bold">*</p>
              ) : null}
            </div>
            <select
              name="filtro"
              value={formValues.filtro}
              className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] font-bold text-morado"
              onChange={handleSelectOnChangeFiltro}
            >
              <option value={DEFAULT_OPTION} className="text-center">
                {DEFAULT_OPTION}
              </option>
              <option value="1" className="text-center">
                Fechas
              </option>
              <option value="2" className="text-center">
                # Ticket
              </option>
              <option value="3" className="text-center">
                Rango de tickets
              </option>
              <option value="4" className="text-center">
                Identificación
              </option>
            </select>

            {/* Opciones */}

            {isSelectedFiltro === "1" ? (
              <div className="flex flex-row w-full gap-4 mt-1">
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="text-left mb-1 text-gris font-semibold">
                      Fecha inicio
                    </p>
                    <p className="text-xs text-red-500 font-bold">*</p>
                  </div>
                  <input
                    type="date"
                    className="border border-slate-400 rounded-md"
                  ></input>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="text-left mb-1 text-gris font-semibold">
                      Fecha fin
                    </p>
                    <p className="text-xs text-red-500 font-bold">*</p>
                  </div>
                  <input
                    type="date"
                    className="border border-slate-400 rounded-md"
                  ></input>
                </div>
              </div>
            ) : isSelectedFiltro === "2" ? (
              <div className=" flex flex-col w-full mt-1">
                <div className="flex flex-row gap-1">
                  <p className="text-left mb-1 text-gris font-semibold">
                    # Ticket
                  </p>
                  {isEmptyTicket ? (
                    <p className="text-xs text-red-500 font-bold">*</p>
                  ) : null}
                </div>
                <input
                  className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none font-bold"
                  onChange={handleInputChangeTicket}
                ></input>
              </div>
            ) : isSelectedFiltro === "3" ? (
              <div className="flex flex-row w-full gap-1 mt-1">
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="text-left mb-1 text-gris font-semibold">
                      Ticket inicio
                    </p>
                    {isEmptyTicketInicio ? (
                      <p className="text-xs text-red-500 font-bold">*</p>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    className="border border-slate-400 rounded-md"
                    onChange={handleInputChangeTicketInicio}
                  ></input>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="text-left mb-1 text-gris font-semibold">
                      Ticket fin
                    </p>
                    {isEmptyTicketFin ? (
                      <p className="text-xs text-red-500 font-bold">*</p>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    className="border border-slate-400 rounded-md"
                    onChange={handleInputChangeTicketFin}
                  ></input>
                </div>
              </div>
            ) : isSelectedFiltro === "4" ? (
              <div className=" flex flex-col w-full mt-1">
                <div className="flex flex-row gap-1">
                  <p className="text-left mb-1 text-gris font-semibold">
                    Identificación
                  </p>
                  {isEmptyIdentificacion ? (
                    <p className="text-xs text-red-500 font-bold">*</p>
                  ) : null}
                </div>
                <input
                  className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] appearance-none font-bold"
                  onChange={handleInputChangeIdentificacion}
                ></input>
              </div>
            ) : (
              <></>
            )}
            {/*  */}

            <div className=" flex flex-col w-full pt-2">
              <div className="flex flex-row gap-1">
                <p className="text-left mb-1 text-gris font-semibold">
                  Estado del ticket
                </p>
              </div>
              <select
                name="state"
                value={formValues.state}
                className="w-full h-[26px] rounded border-gris border bg-transparent text-left focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] font-bold text-morado"
                onChange={handleSelectOnChangeState}
              >
                <option className="text-center" value={DEFAULT_OPTION}>
                  {DEFAULT_OPTION}
                </option>
                <option value="1" className="text-center">
                  Abierto
                </option>
                <option value="2" className="text-center">
                  En proceso
                </option>
                <option value="3" className="text-center">
                  Finalizado
                </option>
                <option value="4" className="text-center">
                  Reapertura
                </option>
              </select>
            </div>

            {/* Botones */}

            <div className="flex flex-row w-[80%] mx-auto my-6 h-7">
              <div className=" flex w-full text-center justify-center gap-4 text-base font-semibold">
                <button
                  className="w-2/4 border border-morado rounded-[4px] hover:bg-morado hover:text-white duration-200 text-morado text-sm sm:text-base "
                  onClick={handleShowPopUp}
                >
                  Buscar
                </button>
                <BusquedaCatalogo
                  showPopUp={showPopUp}
                  onClosePopUp={handleClosePopUp}
                ></BusquedaCatalogo>
                <button
                  className="w-2/4 border border-morado rounded-[4px] hover:bg-morado hover:text-white duration-200 text-morado text-sm sm:text-base"
                  onClick={handleCleanForm}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutBar>
  );
}
