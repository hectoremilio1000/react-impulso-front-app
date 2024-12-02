import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Modules from "./pages/superadmin/Modules";
import Plans from "./pages/superadmin/Plans";
import Usuarios from "./pages/superadmin/Usuarios";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import Layout from "./components/rolSuperAdmin/Layout";
import Dashboard from "./pages/superadmin/Dashboard";
import Empresas from "./pages/superadmin/Empresas";

import Prospects from "./pages/superadmin/Prospects";
import LayoutAdmin from "./components/rolAdmin/Layout";
import Manage from "./pages/admin/Manage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* RUTAS PARA USUARIO ADMIN */}
          <Route
            path="manage/:companyId/sede/:idSede"
            element={
              <PrivateRoute roles={["admin"]}>
                <LayoutAdmin></LayoutAdmin>
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardAdmin />} />
            <Route path="usuarios" element={<UsuariosAdmin />} />
          </Route>

          <Route
            path="/manage"
            element={
              <PrivateRoute roles={["admin"]}>
                {/* <LayoutAdmin> */}
                <Manage />
                {/* </LayoutAdmin> */}
              </PrivateRoute>
            }
          />
          {/* RUTAS PARA USUARIO SUPERADMIN */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/empresas"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Empresas />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/prospects"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Prospects />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Usuarios />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Plans />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/modules"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Modules />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* RUTA DE FORBIDDEN */}
          <Route path="/forbidden" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
