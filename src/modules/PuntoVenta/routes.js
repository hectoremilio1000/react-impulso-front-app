import { Routes, Route } from "react-router-dom";
import Main from ".";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";

function PuntoVentaRoutes() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="productos" element={<Productos />} />
      <Route path="ventas" element={<Ventas />} />
    </Routes>
  );
}

export default PuntoVentaRoutes;
