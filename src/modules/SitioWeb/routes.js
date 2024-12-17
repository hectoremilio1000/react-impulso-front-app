import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Config from "./pages/Config";
import Main from ".";
import SidebarSitioWeb from "./components/SidebarSitioWeb";
import LayoutSitioWeb from "./components/Layout";
import Portada from "./pages/Portada";
import Menu from "./pages/Menu";

function SitioWebRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <LayoutSitioWeb>
            <Main />
          </LayoutSitioWeb>
        }
      />
      <Route
        path="/dashboard"
        element={
          <LayoutSitioWeb>
            <Dashboard />
          </LayoutSitioWeb>
        }
      />
      <Route
        path="/config"
        element={
          <LayoutSitioWeb>
            <Config />
          </LayoutSitioWeb>
        }
      />
      <Route
        path="/portada"
        element={
          <LayoutSitioWeb>
            <Portada />
          </LayoutSitioWeb>
        }
      />
      <Route
        path="/Menu"
        element={
          <LayoutSitioWeb>
            <Menu />
          </LayoutSitioWeb>
        }
      />
    </Routes>
  );
}

export default SitioWebRoutes;
