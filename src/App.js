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
<<<<<<< HEAD
import Manage from "./pages/admin/Manage";
import HumanResources from "./pages/admin/modules/HumanResources";
import Inventory from "./pages/admin/modules/Inventory";
import Sales from "./pages/admin/modules/Sales";
=======
import Modules from "./pages/superadmin/Modules";
import Plans from "./pages/superadmin/Plans";
import Usuarios from "./pages/superadmin/Usuarios";
import Layout from "./components/rolSuperAdmin/Layout";
import Dashboard from "./pages/superadmin/Dashboard";
import Empresas from "./pages/superadmin/Empresas";

import Prospects from "./pages/superadmin/Prospects";
import LayoutAdmin from "./components/rolAdmin/Layout";
import Manage from "./pages/admin/Manage";
>>>>>>> main
import NotFoundPage from "./pages/NotFoundPage";
import Identy from "./pages/Identy";
import Campaigns from "./pages/superadmin/Campaigns";
import GoogleAds from "./pages/superadmin/GoogleAds";
import ModuleRoutes from "./routes/modulesRoutes";
import CasosEstudio from "./pages/superadmin/CasosEstudio";
import Plan from "./pages/admin/Plan";
import LlenarEncuestaProspect from "./pages/superadmin/LlenarEncuestaProspect";
import Recomendaciones from "./pages/superadmin/Recomendaciones";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/identy" element={<Identy />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/encuestas/:id" element={<LlenarEncuestaProspect />} />
          <Route path="/recomendaciones/:id" element={<Recomendaciones />} />

<<<<<<< HEAD
          {/* Redirección predeterminada para /manage */}
=======
          {/* RUTAS PARA USUARIO ADMIN */}
          <Route
            path="/manage/:companyId/sede/:idSede/*"
            element={<ModuleRoutes />}
          />
          {/* <Route
            path="/manage/:companyId/sede/:idSede/module/:idModulo/*"
            element={<ModuleRoutes />}
          /> */}

>>>>>>> main
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
<<<<<<< HEAD

          {/* Ruta dinámica para Manage */}
=======
          <Route
            path="/plan"
            element={
              <PrivateRoute roles={["admin"]}>
                <LayoutAdmin>
                  <Plan />
                </LayoutAdmin>
              </PrivateRoute>
            }
          />
          {/* RUTAS PARA USUARIO SUPERADMIN */}
>>>>>>> main
          <Route
            path="/manage/:companyId/sede/:idSede/*"
            element={
              <PrivateRoute roles={["admin"]}>
                <Manage />
              </PrivateRoute>
            }
<<<<<<< HEAD
          >
            <Route path="human-resources" element={<HumanResources />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
          </Route>

          {/* Página de error */}
=======
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
            path="/adsgoogle"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <GoogleAds />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/adsgoogle/account/:accountId/campaigns"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <Campaigns />
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
            path="/casosestudio"
            element={
              <PrivateRoute roles={["superadmin"]}>
                <Layout>
                  <CasosEstudio />
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
>>>>>>> main
          <Route path="/forbidden" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
