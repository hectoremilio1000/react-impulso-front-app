// AuthContext.js
import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  // Estado para el token y los datos del usuario
  const [auth, setAuth] = useState({
    token: sessionStorage.getItem("token") || null,
    user: null,
  });

  const login = async (email, password) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email, password }),
    };

    axios.request(config);
    const response = await axios.request(config);
    const data = response.data;

    sessionStorage.setItem("token", data.token);

    await fetchMe(data.token);
  };
  // Función para obtener los datos del usuario autenticado
  const fetchMe = async (token) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiUrl}/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
      const data = response.data;
      console.log(data);

      setAuth({ ...auth, user: data.user, token: token });
    } catch (error) {
      console.error("Error fetching user", error);
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

  // Método para cerrar sesión (logout)
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setAuth({
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, fetchMe, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
