import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import LayoutAdmin from "../components/rolAdmin/Layout";
import SelectModuleRoute from "./selectModuleRoute";
import PrivateRoute from "../components/PrivateRoute";

function ModuleRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute roles={["admin"]}>
            <LayoutAdmin>
              <DashboardAdmin />
            </LayoutAdmin>
          </PrivateRoute>
        }
      />
      {/* Rutas dinámicas por módulo */}
      <Route
        path="modules/:idModulo/*"
        element={
          <PrivateRoute roles={["admin"]}>
            <LayoutAdmin>
              <SelectModuleRoute />
            </LayoutAdmin>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default ModuleRoutes;
