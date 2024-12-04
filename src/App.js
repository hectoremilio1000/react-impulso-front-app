import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Manage from "./pages/admin/Manage";
import HumanResources from "./pages/admin/modules/HumanResources";
import Inventory from "./pages/admin/modules/Inventory";
import Sales from "./pages/admin/modules/Sales";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Redirección predeterminada para /manage */}
          <Route
            path="/manage"
            element={
              <PrivateRoute roles={["admin"]}>
                <Navigate to="/manage/1" replace />{" "}
                {/* Redirige a una empresa específica */}
              </PrivateRoute>
            }
          />

          {/* Ruta para empresas sin sede seleccionada */}
          <Route
            path="/manage/:companyId"
            element={
              <PrivateRoute roles={["admin"]}>
                <Manage />
              </PrivateRoute>
            }
          />

          {/* Ruta dinámica para Manage */}
          <Route
            path="/manage/:companyId/sede/:idSede/*"
            element={
              <PrivateRoute roles={["admin"]}>
                <Manage />
              </PrivateRoute>
            }
          >
            <Route path="human-resources" element={<HumanResources />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
          </Route>

          {/* Página de error */}
          <Route path="/forbidden" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
