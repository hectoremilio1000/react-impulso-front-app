import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import dayjs from "dayjs";
import { Table } from "antd";

const Plan = () => {
  const { auth } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [restante, setRestante] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const calcularDiferencia = (fecha_inicio, fecha_fin) => {
    const fechaInicio = dayjs(fecha_inicio);
    const fechaFin = dayjs(fecha_fin);
    // Diferencia en meses y días
    const meses = fechaFin.diff(fechaInicio, "month"); // Diferencia en meses completos
    const dias = fechaFin.diff(fechaInicio.add(meses, "month"), "day"); // Días restantes después de meses completos
    // Verificación y mensaje
    if (fechaFin.isBefore(fechaInicio) || (meses === 0 && dias === 0)) {
      return "La fecha ya está vencida.";
    } else if (meses === 0) {
      return `Faltan ${dias} días.`;
    } else if (dias === 0) {
      return `Faltan ${meses} meses.`;
    } else {
      return `Faltan ${meses} meses y ${dias} días.`;
    }
  };
  const searchPlan = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/subscriptionbyuser/${auth.user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = response.data;

      console.log(data);
      if (data.status === "success") {
        setSubscription([data.data]);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
    }
  };
  const columns = [
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (_, record) => {
        return record.plan.name;
      },
    },
    {
      title: "Fecha Inicio",
      dataIndex: "fechaInicio",
      key: "fechaInicio",
      render: (_, record) => {
        return dayjs(record.startDate).format("DD MMMM YY HH:mm:ss");
      },
    },
    {
      title: "Fecha Fin",
      dataIndex: "fechaFin",
      key: "fechaFin",
      render: (_, record) => {
        return dayjs(record.endDate).format("DD MMMM YY HH:mm:ss");
      },
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (_, record) => {
        return (
          <span className="bg-dark-purple text-white px-3 py-2 text-sm rounded-full">
            {record.status}
          </span>
        );
      },
    },
  ];
  useEffect(() => {
    if (auth.user) {
      searchPlan();
    }
  }, [apiUrl, auth]);
  return (
    <div className="p-12">
      <div className="w-full p-6 bg-white rounded">
        {subscription !== null && (
          <div>
            <h1 className="font-bold mb-6">
              Plan actual:{" "}
              <span className="text-lg px-3 py-2 rounded-full text-white bg-dark-purple">
                {subscription[0].plan.name}
              </span>
            </h1>
            <h1 className="mb-4 text-2xl">Historial de pedidos</h1>
            <Table
              dataSource={subscription}
              columns={columns}
              pagination={false}
              bordered
            />
            <button className="text-lg px-3 py-2 rounded text-white bg-dark-purple">
              Upgrade
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
