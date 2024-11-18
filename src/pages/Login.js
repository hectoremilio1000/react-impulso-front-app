import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const { login, auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user) {
      const role = auth.user.rol.name; // Supongamos que el rol está en user.role
      console.log(role);
      if (role === "superadmin") {
        navigate("/usuarios"); // Redirigir a la ruta de usuarios
      } else if (role === "admin") {
        navigate("/manage"); // Redirigir al panel con módulos en formato grid
      } else {
        navigate("/"); // Ruta por defecto
      }
    }
  }, [auth.user, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Crendenciales invalidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">ErpRestaurant</h2>
        <h2 className="text-sm font-bold mb-4">Login</h2>
        {error ? (
          <h1 className="border p-2 border-red-500 text-red-500 rounded-full">
            {error}
          </h1>
        ) : null}
        <label htmlFor="usuario" className="text-sm text-gray-500">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 bg-gray-200 text-gray-900 text-sm rounded"
          required
        />
        <label htmlFor="usuario" className="text-sm text-gray-500">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded mb-4 bg-gray-200 text-gray-900 text-sm rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
