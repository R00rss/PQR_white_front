import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";
import icono_ticket from "../..//assets/icono_ticket.png";
import icono_dashboard from "../../assets/icono_dashboard.png";
import icono_administracion from "../../assets/icono_administracion.png";
import icono_reportes from "../../assets/icono_reportes.png";
type Option = {
  name: string;
  id: string;
  path: string;
  imageURL: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
};

const options = {
  dashboard: {
    name: "Dashboard",
    imageURL: icono_dashboard,
    path: "/dashboard/integral",
    options: [
      {
        id: "1",
        path: "/dashboard/integral",
        name: "Integral",
      },
      // {
      //   id: "2",
      //   path: "/dashboard/gestion",
      //   name: "Gestión",
      // },
      // {
      //   id: "3",
      //   path: "/dashboard/experiencia_cliente",
      //   name: "Experiencia del cliente",
      // },
    ],
  },
  ticket: {
    name: "Tickets",
    imageURL: icono_ticket,
    path: "/ticket/nuevo",
    options: [
      {
        id: "1",
        path: "/ticket/nuevo",
        name: "Nuevo",
      },
      {
        id: "2",
        path: "/ticket/buscar",
        name: "Buscar",
      },
    ],
  },
  administracion: {
    name: "Administración",
    imageURL: icono_administracion,
    path: "/administracion/usuarios",
    options: [
      {
        id: "1",
        path: "/administracion/usuarios",
        name: "Usuarios",
      },
      {
        id: "2",
        path: "/administracion/configuraciones",
        name: "Configuración",
      },
    ],
  },
  reportes: {
    name: "Reportes",
    imageURL: icono_reportes,
    path: "/reportes",
    options: [],
  },
};

/* Props con children y selectedoption */
type LayoutBarProps = {
  children: React.ReactNode;
  opcionSeleccionada: keyof typeof options;
};

// { children }: { children: React.ReactNode }
export default function LayoutBar({
  children,
  opcionSeleccionada,
}: LayoutBarProps) {
  // const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="">
      <div className="w-full ">
        <Navbar boptions={options[opcionSeleccionada]} />
      </div>

      <div className=" flex flex-row justify-center">
        <div className="flex justify-center mt-[-70px] w-[30%]">
          <Sidebar
            boptions={options}
            // selectedOption={(optionId) => setSelectedOption(optionId)}
          />
        </div>

        <div className="mx-auto text-center mt-6  w-full flex ">
          <div className="flex justify-center items-center w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
