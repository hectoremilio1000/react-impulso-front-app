import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({
    token: sessionStorage.getItem("token") || null,
    user: null,
  });

  const login = async (email, password) => {
    try {
      const config = {
        method: "post",
        url: `${apiUrl}/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email, password }),
      };

      const response = await axios.request(config);
      const data = response.data;

      sessionStorage.setItem("token", data.token);
      await fetchMe(data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error durante el login:", error.response?.data || error);
      throw new Error("Credenciales inválidas");
    }
  };

  const fetchMe = async (token) => {
    try {
      console.log("Obteniendo datos del usuario con token:", token);

      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;

      console.log("Datos del usuario obtenidos:", data.user);

      setAuth((prev) => ({ ...prev, user: data.user, token }));
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchMe(auth.token);
    } else {
      setLoading(false);
    }
  }, [auth.token]);

  const logout = () => {
    console.log("Cerrando sesión");
    sessionStorage.removeItem("token");
    setAuth({ token: null, user: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, fetchMe, loading }}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
