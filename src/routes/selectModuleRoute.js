import { useParams } from "react-router-dom";
import SitioWebRoutes from "../modules/SitioWeb/routes";
import PuntoVentaRoutes from "../modules/PuntoVenta/routes";

function SelectModuleRoute() {
  const { idModulo } = useParams();
  console.log("ID del módulo:", idModulo);

  // Mapeo de módulos a componentes de rutas
  const moduleRoutes = {
    1: <SitioWebRoutes />,
    2: <PuntoVentaRoutes />,
    // Agrega más módulos aquí
  };

  // Renderiza el módulo correspondiente o un mensaje de error si no existe
  return moduleRoutes[idModulo] || <h1>Módulo no encontrado</h1>;
}

export default SelectModuleRoute;
