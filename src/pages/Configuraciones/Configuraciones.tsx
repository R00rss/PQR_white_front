import { Link } from "react-router-dom";
import LayoutBar from "../../components/Navigation/LayoutNavigation";

export default function Configuraciones() {
  return (
    <LayoutBar opcionSeleccionada="administracion">
      <div className="flex flex-col w-[70%] h-[500px] shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md">
        <div className="flex items-center justify-center h-[10%] bg-azul rounded-t-md w-full">
          <p className="text-white font-bold text-2xl text-center ">
            Configuraciones
          </p>
        </div>
        <div className="h-[90%]">
          <ul className="flex flex-col w-[70%] h-full mx-auto text-start justify-center gap-4 text-gris font-bold text-lg ">
            {/* <Link
              to={"/administracion/configuraciones/ticket_max"}
              className="hover:text-morado hover:font-black duration-300 hover:scale-105 border-b border-slate-300 w-full"
            >
              Máximo de archivos por tickets 
            </Link> */}

            
              <Link to={"/administracion/configuraciones/sla"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">SLA</Link>
            
              <Link to={"/administracion/configuraciones/areas"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">
                Configurar áreas
              </Link>
              <Link to={"/administracion/configuraciones/cargos"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">
                Configurar cargos
              </Link>
              <Link to={"/administracion/configuraciones/productos"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">
                Configurar productos
              </Link>
              <Link to={"/administracion/configuraciones/tipo"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">
                Configurar tipo
              </Link>
              <Link to={"/administracion/configuraciones/incidencias"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">
                Configurar incidencias
              </Link>
              <Link to={"/administracion/configuraciones/catalogo"} className="hover:text-morado hover:font-black duration-200 hover:scale-105 border-b border-slate-300">
                Catálogo
              </Link>
          </ul>
        </div>
      </div>
    </LayoutBar>
  );
}
