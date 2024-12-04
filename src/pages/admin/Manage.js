import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Manage = () => {
  const { auth, logout } = useAuth();
  const { companyId, idSede } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([
    { key: "human-resources", name: "Recursos Humanos" },
    { key: "inventory", name: "Inventarios" },
    { key: "sales", name: "Ventas" },
  ]);
  const [companies, setCompanies] = useState([]);
  const [sedes, setSedes] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/companies`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (response.data.status === "success") {
        setCompanies(response.data.data);
      }
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const company = companies.find((c) => c.id === parseInt(companyId));
    setSedes(company?.sedes || []);
  }, [companyId, companies]);

  const handleModuleSelect = (key) => {
    if (idSede) {
      navigate(`/manage/${companyId}/sede/${idSede}/${key}`);
    } else {
      alert("Por favor selecciona una sede para ver los módulos");
    }
  };

  const handleSelectCompany = (id) => {
    navigate(`/manage/${id}`);
  };

  const handleSelectSede = (id) => {
    navigate(`/manage/${companyId}/sede/${id}`);
  };

  if (!companyId) {
    return (
      <Layout className="h-screen">
        <Content className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">
            Por favor selecciona una empresa
          </h1>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="h-screen">
      <Header className="bg-white shadow-md flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <Avatar
            icon={<UserOutlined />}
            size="large"
            style={{ backgroundColor: "#1890ff" }}
          />
          <div>
            <p className="m-0 text-gray-800 font-semibold">
              {auth.user.name || "Usuario"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Dropdown
            overlay={
              <Menu>
                <Menu.ItemGroup title="Empresas">
                  {companies.map((company) => (
                    <Menu.Item
                      key={company.id}
                      onClick={() => handleSelectCompany(company.id)}
                    >
                      {company.name}
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
                {companyId && (
                  <Menu.ItemGroup title="Sedes">
                    {sedes.map((sede) => (
                      <Menu.Item
                        key={sede.id}
                        onClick={() => handleSelectSede(sede.id)}
                      >
                        {sede.name}
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                )}
              </Menu>
            }
          >
            <Button icon={<AppstoreOutlined />}>
              {idSede ? `Sede ${idSede}` : `Empresa ${companyId}`}
            </Button>
          </Dropdown>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider width={300} className="bg-gray-100">
          <Menu
            mode="inline"
            selectedKeys={[window.location.pathname.split("/").pop()]}
            onClick={({ key }) => handleModuleSelect(key)}
          >
            {modules.map((module) => (
              <Menu.Item key={module.key}>{module.name}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content className="p-6">
          {idSede ? (
            <Outlet />
          ) : (
            <h1 className="text-gray-600">
              Selecciona una sede para continuar.
            </h1>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Manage;
