import React from "react";
import { useAuth } from "../../components/AuthContext";

const Panel = () => {
  const { auth, logout } = useAuth();
  const modules = [
    { name: "Inventario", path: "/inventario" },
    { name: "Punto de Venta", path: "/pos" },
    { name: "Configuración", path: "/configuracion" },
    // Agrega más módulos según sea necesario
  ];

  return (
    <div>
      <h1>Panel de Control</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {modules.map((module, index) => (
          <div className="bg-blue-700 p-4 rounded" key={index}>
            <h2 className="text-white">{module.name}</h2>
            <button onClick={() => (window.location.href = module.path)}>
              Ir a {module.name}
            </button>
          </div>
        ))}
      </div>
      <button
        className="p-4 bg-dark-purple text-white"
        onClick={() => logout()}
      >
        Cerrar session
      </button>
    </div>
  );
};

export default Panel;
