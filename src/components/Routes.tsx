import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NewTicket from "../pages/Ticket/NewTicket";
import SearchTicket from "../pages/Ticket/SearchTicket";
import UserAdministration from "../pages/Administracion/UserAdministration";
import IntegralDashboard from "../pages/Dashboard/IntegralDashboard";
import TypeDashboard from "../pages/Dashboard/TypeDashboard";
import GestionDashboard from "../pages/Dashboard/GestionDashboard";
import ExperienceDashboard from "../pages/Dashboard/ExperienceDashboard";
import Report from "../pages/Reportes/Report";
import AdministracionUsuarios from "./AdministracionTickets/AdministracionTicket";
import Login from "./Login/Login";
import AdministracionTickets from "./AdministracionTickets/AdministracionTicket";
import ConfigAdministration from "../pages/Administracion/ConfigAdministration";
import Configuraciones from "../pages/Configuraciones/Configuraciones";
import Sla from "../pages/Configuraciones/Sla";
import Catalogo from "../pages/Configuraciones/Catalogo";
import MaxTicket from "../pages/Configuraciones/MaxTicket";
import Area from "../pages/Configuraciones/Area";
import Cargo from "../pages/Configuraciones/Cargo";
import Tipo from "../pages/Configuraciones/Tipo";
import Producto from "../pages/Configuraciones/Producto";
import Incidencia from "../pages/Configuraciones/Incidencia";

import DashboardTest from "../pages/Test/DashboardTest";
import JWT from "./Layout/JWT";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Default */}

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        {/* Dashboard */}
        <Route
          path="/dashboard/integral"
          element={
            <JWT>
              <IntegralDashboard />
            </JWT>
          }
        />
        <Route
          path="/dashboard/tipo_incidencias"
          element={
            <JWT>
              <TypeDashboard />
            </JWT>
          }
        />
        <Route
          path="/dashboard/gestion"
          element={
            <JWT>
              <GestionDashboard />
            </JWT>
          }
        />
        <Route
          path="/dashboard/experiencia_cliente"
          element={
            <JWT>
              <ExperienceDashboard />
            </JWT>
          }
        />
        {/* Ticket */}
        <Route
          path="/ticket/nuevo"
          element={
            <JWT>
              <NewTicket />
            </JWT>
          }
        />
        <Route
          path="/ticket/buscar"
          element={
            <JWT>
              <SearchTicket />
            </JWT>
          }
        />
        {/* Administración */}
        <Route
          path="/administracion/usuarios"
          element={
            <JWT>
              <UserAdministration />
            </JWT>
          }
        />
        {/* Rutas de Administracion */}
        <Route
          path="/administracion/configuraciones"
          element={
            <JWT>
              <Configuraciones />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/ticket_max"
          element={
            <JWT>
              <MaxTicket />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/sla"
          element={
            <JWT>
              <Sla />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/catalogo"
          element={
            <JWT>
              <Catalogo />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/areas"
          element={
            <JWT>
              <Area />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/cargos"
          element={
            <JWT>
              <Cargo />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/productos"
          element={
            <JWT>
              <Producto />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/tipo"
          element={
            <JWT>
              <Tipo />
            </JWT>
          }
        />
        <Route
          path="/administracion/configuraciones/incidencias"
          element={
            <JWT>
              <Incidencia />
            </JWT>
          }
        />
        {/* Rutas de Reportes */}

        <Route
          path="/reportes"
          element={
            <JWT>
              <Report />
            </JWT>
          }
        />
        <Route path="/test" />
        <Route />
      </Routes>
    </Router>
  );
}
