import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const LayoutAdmin = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { auth } = useAuth();
  const [open, setOpen] = useState(true);
  const { idSede, companyId } = useParams();
  const [companies, setCompanies] = useState([]);
  const buscar_empresas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/companies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = response.data;

      if (data.status === "success") {
        setCompanies(data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
    }
  };
  useEffect(() => {
    if (auth) {
      buscar_empresas();
    }
  }, [auth, apiUrl]);

  return (
    <div className="flex">
      <div className="w-full app-container">
        <TopNavigation
          companies={companies}
          companyId={companyId}
          idSede={idSede}
          open={open}
          setOpen={setOpen}
        />
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
