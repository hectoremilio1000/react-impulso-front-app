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
<<<<<<< HEAD
    try {
      const config = {
        method: "post",
        url: `${apiUrl}/login`,
=======
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
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
      return { success: true };
    } catch (error) {
      // Manejo detallado de errores
      if (error.code === "ERR_NETWORK") {
        return { success: false, message: "No se pudo conectar al servidor." };
      } else if (error.response) {
        // Error en la respuesta del servidor
        return {
          success: false,
          message: error.response.data.message || "Error en las credenciales.",
        };
      } else {
        return {
          success: false,
          message: "Error desconocido al iniciar sesión.",
        };
      }
    }
  };

  const fetchMe = async (token) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiUrl}/me`,
>>>>>>> main
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email, password }),
      };
      const response = await axios.request(config);
      const data = response.data;
<<<<<<< HEAD

      sessionStorage.setItem("token", data.token);
      await fetchMe(data.token);

      navigate("/dashboard");
=======
      setAuth({ ...auth, user: data.user, token });
>>>>>>> main
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
<<<<<<< HEAD
    setAuth({ token: null, user: null });
    navigate("/login");
=======
    sessionStorage.removeItem("user");
    setAuth({ token: null, user: null });
>>>>>>> main
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, fetchMe, loading }}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
