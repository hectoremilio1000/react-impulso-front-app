import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { auth, loading } = useAuth();

  // Espera a que el contexto termine de cargar
  if (loading) {
    console.log("Esperando a que cargue el usuario...");
    return <div>Cargando...</div>;
  }

  // Verifica si el usuario está autenticado
  if (!auth.user) {
    console.log("Usuario no autenticado. Redirigiendo a /login.");
    return <Navigate to="/login" />;
  }

  const userRole = auth.user.rol?.name; // Usa optional chaining para evitar errores
  console.log("Rol del usuario:", userRole);
  console.log("Roles permitidos para esta ruta:", roles);

  // Valida el acceso basado en el rol
  if (roles && (!userRole || !roles.includes(userRole))) {
    console.log(
      `Acceso denegado. Rol del usuario "${userRole}" no está en [${roles.join(
        ", "
      )}]`
    );
    return <Navigate to="/forbidden" />;
  }

  console.log("Acceso permitido. Renderizando componente.");
  return children;
};

export default PrivateRoute;
