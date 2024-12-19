import { useParams } from "react-router-dom";
import SitioWebRoutes from "../modules/SitioWeb/routes";
import PuntoVentaRoutes from "../modules/PuntoVenta/routes";
import MarketingRoutes from "../modules/Marketing/routes";
import RecursosHRoutes from "../modules/Recursos Humanos/routes";

function SelectModuleRoute({ open, setOpen }) {
  const { idModulo } = useParams();
  console.log("ID del módulo:", idModulo);

  // Mapeo de módulos a componentes de rutas
  const moduleRoutes = {
    1: <MarketingRoutes open={open} setOpen={setOpen} />,
    2: <SitioWebRoutes open={open} setOpen={setOpen} />,
    3: <PuntoVentaRoutes open={open} setOpen={setOpen} />,
    4: <RecursosHRoutes open={open} setOpen={setOpen} />,
    // Agrega más módulos aquí
  };

  // Renderiza el módulo correspondiente o un mensaje de error si no existe
  return moduleRoutes[idModulo] || <h1>Módulo no encontrado</h1>;
}

export default SelectModuleRoute;
