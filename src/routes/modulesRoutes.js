import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import LayoutAdmin from "../components/rolAdmin/Layout";
import SelectModuleRoute from "./selectModuleRoute";

function ModuleRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <LayoutAdmin>
            <DashboardAdmin />
          </LayoutAdmin>
        }
      />
      {/* Rutas dinámicas por módulo */}
      <Route
        path="modules/:idModulo/*"
        element={
          <LayoutAdmin>
            <SelectModuleRoute />
          </LayoutAdmin>
        }
      />
    </Routes>
  );
}

export default ModuleRoutes;
