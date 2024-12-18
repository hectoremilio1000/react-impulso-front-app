import React, { useState, useEffect } from "react";
import { Button, Input, Select, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const { Option } = Select;

const initialData = [
  {
    id: 10,
    name: "sadasd",
    whatsapp: "5521293811",
    email: "hector@gmail.com",
    position: "Subgerente",
    cv: "/files/cv10.pdf",
    comments: "ya se reviso",
    status: "creado",
  },
  {
    id: 9,
    name: "hector",
    whatsapp: "5521293811",
    email: "hector@gmail.com",
    position: "Mesero",
    cv: "/files/cv9.pdf",
    comments: "checar",
    status: "creado",
  },
  {
    id: 2,
    name: "asda",
    whatsapp: "5521293811",
    email: "dsd@gmail.com",
    position: "Gerente",
    cv: "/files/cv2.pdf",
    comments: "",
    status: "descartar",
  },
];

const Candidatos = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("candidateData")) || initialData
  );

  useEffect(() => {
    localStorage.setItem("candidateData", JSON.stringify(data));
  }, [data]);

  const updateStatus = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  const updateComments = (id, newComment) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, comments: newComment } : item
    );
    setData(updatedData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "WhatsApp",
      dataIndex: "whatsapp",
      key: "whatsapp",
      render: (text) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Puesto",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "CV",
      dataIndex: "cv",
      key: "cv",
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer">
          Ver/Descargar
        </a>
      ),
    },
    {
      title: "Comentarios",
      dataIndex: "comments",
      key: "comments",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => updateComments(record.id, e.target.value)}
        />
      ),
    },
    // {
    //   title: "Acciones",
    //   key: "actions",
    //   render: (_, record) => (
    //     <div className="flex gap-2">
    //       {record.status === "descartar" ? (
    //         <>
    //           <Tag color="red">Descartado</Tag>
    //           <Button
    //             type="default"
    //             onClick={() => updateStatus(record.id, "iniciar examen")}
    //           >
    //             No descartar
    //           </Button>
    //         </>
    //       ) : record.status === "creado" ? (
    //         <>
    //           <Button
    //             type="default"
    //             onClick={() => updateStatus(record.id, "iniciar examen")}
    //           >
    //             Iniciar Examen
    //           </Button>
    //           <Button
    //             type="danger"
    //             onClick={() => updateStatus(record.id, "descartar")}
    //           >
    //             Descartar
    //           </Button>
    //         </>
    //       ) : record.status === "iniciar examen" ? (
    //         <>
    //           <Link to={`${record.id}/examen`}>
    //             <Button type="primary">Abrir Examen</Button>
    //           </Link>
    //           <Button
    //             type="default"
    //             onClick={() => updateStatus(record.id, "aprobado")}
    //           >
    //             Aprobar
    //           </Button>
    //           <Button
    //             type="danger"
    //             onClick={() => updateStatus(record.id, "descartar")}
    //           >
    //             Descartar
    //           </Button>
    //         </>
    //       ) : record.status === "aprobado" ? (
    //         <Tag color="green">Aprobado</Tag>
    //       ) : null}
    //     </div>
    //   ),
    // },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          {record.status === "descartar" ? (
            <>
              <Tag color="red">Descartado</Tag>
              <Button
                type="default"
                onClick={() => updateStatus(record.id, "iniciar examen")}
              >
                No descartar
              </Button>
            </>
          ) : record.status === "creado" ? (
            <>
              <Button
                type="default"
                onClick={() => updateStatus(record.id, "iniciar examen")}
              >
                Iniciar Examen
              </Button>
              <Button
                type="danger"
                onClick={() => updateStatus(record.id, "descartar")}
              >
                Descartar
              </Button>
            </>
          ) : record.status === "iniciar examen" ? (
            <>
              <Link to={`${record.id}/examen`}>
                <Button type="primary">Abrir Examen</Button>
              </Link>
              <Button
                type="default"
                onClick={() => updateStatus(record.id, "aprobado")}
              >
                Aprobar
              </Button>
              <Button
                type="danger"
                onClick={() => updateStatus(record.id, "descartar")}
              >
                Descartar
              </Button>
            </>
          ) : record.status === "aprobado" ? (
            <>
              <Tag color="green">Aprobado</Tag>
              <Link to={`${record.id}/resultados`}>
                <Button type="primary">Ver Resultados</Button>
              </Link>
            </>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Candidatos</h1>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
};

export default Candidatos;
