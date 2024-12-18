import React from "react";

import { Table, Card, Statistic } from "antd";
import campaigns from "../data/datagoogleads.json";
const GoogleAds = () => {
  const data = campaigns.Sheet0;
  console.log(data);
  // Tabla de columnas
  const columns = [
    { title: "Campaña", dataIndex: "Campaña", key: "Campaña" },
    { title: "Estado", dataIndex: "Estado", key: "Estado" },
    {
      title: "Costo",
      dataIndex: "Costo",
      key: "Costo",
      render: (value) => `MXN ${value.toFixed(2)}`,
    },
    { title: "Clics", dataIndex: "Clics", key: "Clics" },
    { title: "Conversiones", dataIndex: "Conversiones", key: "Conversiones" },
    {
      title: "Costo/Conv.",
      dataIndex: "Costo/conv.",
      key: "Costo/conv.",
      render: (value) => `MXN ${value.toFixed(2)}`,
    },
    { title: "Impresiones", dataIndex: "Impr.", key: "Impr." },
  ];
  // Resumen general
  const totalClicks = data.reduce((sum, item) => sum + item.Clics, 0);
  const totalConversions = data.reduce(
    (sum, item) => sum + item.Conversiones,
    0
  );
  const totalImpressions = data.reduce((sum, item) => sum + item["Impr."], 0);
  const avgCostPerConv =
    data.reduce((sum, item) => sum + item["Costo/conv."], 0) / data.length;

  return (
    <div>
      <h1 className="font-bold">GoogleAds</h1>
      <div className="w-full">
        <h1>Data model</h1>
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card bordered={false}>
              <Statistic title="Total de Clics" value={totalClicks} />
            </Card>
            <Card bordered={false}>
              <Statistic
                title="Total de Conversiones"
                value={totalConversions}
              />
            </Card>
            <Card bordered={false}>
              <Statistic
                title="Total de Impresiones"
                value={totalImpressions}
              />
            </Card>
            <Card bordered={false}>
              <Statistic
                title="Costo Promedio/Conv."
                value={`MXN ${avgCostPerConv.toFixed(2)}`}
              />
            </Card>
          </div>

          {/* Tabla */}
          <Table
            dataSource={data}
            columns={columns}
            bordered
            title={() => "Resumen de Campañas"}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleAds;
