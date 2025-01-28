import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import SelectModuleRoute from "./selectModuleRoute";
import PrivateRoute from "../components/PrivateRoute";
import LayoutModules from "../components/rolAdmin/LayoutModules";

function ModuleRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute roles={["admin"]}>
            <LayoutModules>
              <DashboardAdmin />
            </LayoutModules>
          </PrivateRoute>
        }
      />
      {/* Rutas dinámicas por módulo */}
      <Route
        path="modules/:idModulo/*"
        element={
          <PrivateRoute roles={["admin"]}>
            <LayoutModules>
              <SelectModuleRoute />
            </LayoutModules>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default ModuleRoutes;
