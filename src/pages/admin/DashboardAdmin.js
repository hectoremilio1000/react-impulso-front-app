import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";

const DashboardAdmin = () => {
  const { auth } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modules, setModules] = useState([]);
  const [filterModules, setFilterModules] = useState([]);
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
      console.log(response);
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        setModules(data.data.plan.modules);
        setFilterModules(data.data.plan.modules);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
    }
  };
  useEffect(() => {
    searchPlan();
  }, [apiUrl, auth.token]);

  return (
    <div className="w-full py-12">
      <div className="w-full max-w-[850px] mx-auto">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-bold text-gray-700">
            Todo lo que deseas esta aqui
          </h1>
          <p className="text-lg">Ingresa a una app para interactuar</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {filterModules.length > 0 &&
            filterModules.map((m, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer flex flex-col items-center justify-start"
                >
                  <div className="w-20 h-20 rounded p-4 bg-white mb-4 hover:-translate-y-2 transition-all duration-200 shadow-md">
                    <img
                      className="h-full object-contain"
                      src={`/modules/${m.name}.png`} // Ruta dinámica
                      alt=""
                    />
                  </div>
                  <h1 className="text-lg text-center font-bold text-gray-700 text-ellipsis w-full text-nowrap">
                    {m.name}
                  </h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
