import React from "react";
import { Table, Tag } from "antd";

const Reservaciones = () => {
  // Dummy data para la tabla
  const data = [
    {
      key: "1",
      calendario: "Calendario Principal",
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      fecha: "18 de junio 2024",
      cantidad: 4,
      estado: "Confirmada",
    },
    {
      key: "2",
      calendario: "Calendario Principal",
      nombre: "María López",
      email: "maria.lopez@example.com",
      fecha: "19 de junio 2024",
      cantidad: 2,
      estado: "Pendiente",
    },
    {
      key: "3",
      calendario: "Calendario VIP",
      nombre: "Carlos García",
      email: "carlos.garcia@example.com",
      fecha: "20 de junio 2024",
      cantidad: 5,
      estado: "Cancelada",
    },
    // Agrega 17 registros más...
    ...Array.from({ length: 17 }, (_, index) => ({
      key: index + 4,
      calendario: index % 2 === 0 ? "Calendario VIP" : "Calendario Principal",
      nombre: `Persona ${index + 1}`,
      email: `persona${index + 1}@example.com`,
      fecha: `${index + 10} de julio 2024`,
      cantidad: Math.floor(Math.random() * 6) + 1,
      estado: ["Confirmada", "Pendiente", "Cancelada"][
        Math.floor(Math.random() * 3)
      ],
    })),
  ];

  // Columnas de la tabla
  const columns = [
    {
      title: "Calendario",
      dataIndex: "calendario",
      key: "calendario",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Cantidad de Personas",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => {
        let color = "";
        if (estado === "Confirmada") color = "green";
        else if (estado === "Pendiente") color = "blue";
        else if (estado === "Cancelada") color = "red";
        return <Tag color={color}>{estado}</Tag>;
      },
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Reservaciones</h1>
      <div className="bg-white p-4 shadow rounded">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Reservaciones;
