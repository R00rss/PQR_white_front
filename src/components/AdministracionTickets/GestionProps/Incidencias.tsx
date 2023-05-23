import { ticket } from "../../../hooks/useTicket";

interface EditTicketProps {
  selectedTicket: ticket;
}

export default function Incidencias({ selectedTicket }: EditTicketProps) {
  return (
    <div className="w-full rounded-b-lg shadow-lg pt-2">
      <div className="flex flex-wrap mt-5 mx-20 ">
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Creado por</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.user.fullname == null
                ? ""
                : selectedTicket.user.fullname}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Agente Asignado</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.user.fullname == null
                ? ""
                : selectedTicket.user.fullname}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Tipo</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.types == null
                ? ""
                : selectedTicket.catalog.types.type_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Incidencia</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.incidence == null
                ? ""
                : selectedTicket.catalog.incidence.incidence_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Producto</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.product == null
                ? ""
                : selectedTicket.catalog.product.product_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Area</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog.area == null
                ? ""
                : selectedTicket.catalog.area.area_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Canal</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.canal == null
                ? ""
                : selectedTicket.canal.canal_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Agencia</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.user.agencia == null
                ? ""
                : selectedTicket.user.agencia.agencia_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Red Social</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.social == null
                ? ""
                : selectedTicket.social.social_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Monto</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.amount == null ? "" : selectedTicket.amount}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Tiempo de Respuesta</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.catalog == null
                ? ""
                : selectedTicket.catalog.catalog_time}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row text-lg font-semibold">
            <p>Primer Comentario</p>
            {/* <img src={icono_editar} className="h-4 w-4 ml-4 my-auto" /> */}
          </div>
          <div className="text-left pb-3">
            <p className="text-ellipsis overflow-hidden">
              {selectedTicket.comment[0] == null
                ? ""
                : selectedTicket.comment[0].comment_text}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <button className="border border-morado text-morado font-bold rounded my-4 duration-500 hover:scale-[1.1] hover:text-white hover:bg-morado">
          <p className="px-1 py-2 ">Descargar PDF</p>
        </button>
      </div>
    </div>
  );
}
