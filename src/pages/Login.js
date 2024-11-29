import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsViewList } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
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
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Crendenciales invalidas");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 ">
      <div className="relative col-span-2 content-image md:h-screen w-full">
        <img
          className="object-cover w-full h-full"
          src="https://www.prosegur.com.pe/dam/jcr:b09e0c73-9185-469d-8e79-c315f0d344e6/admon%20restaurantes.jpg"
          alt=""
        />
        <div className="z-50 absolute top-0 bottom-0 left-0 right-0 w-full bg-dark-purple opacity-70"></div>
      </div>
      <div className="h-full flex px-6 items-center justify-center bg-white">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">ErpRestaurant</h2>
          <h2 className="text-sm font-bold mb-4">Login</h2>
          {error ? (
            <h1 className="border p-2 border-red-500 text-red-500 rounded-full">
              {error}
            </h1>
          ) : null}
          <div>
            <label htmlFor="usuario" className="text-sm text-gray-500">
              Email
            </label>
            <div className="flex items-start">
              <div className="bg-gray-100  h-auto p-2">
                <FaUserCircle className="text-lg text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border mb-4 bg-gray-200 text-gray-900 text-sm rounded"
                required
              />
            </div>
          </div>
          <label htmlFor="usuario" className="text-sm text-gray-500">
            Password
          </label>
          <div className="flex items-start relative">
            <div className="bg-gray-100  h-auto p-2">
              <RiLockPasswordLine className="text-lg text-gray-500" />
            </div>
            <input
              type={viewPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border mb-4 bg-gray-200 text-gray-900 text-sm rounded"
              required
            />
            <div
              onClick={() => handleViewPassword()}
              className="absolute right-0 top-0 cursor-pointer p-2"
            >
              {viewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-dark-purple text-white p-2 rounded"
          >
            Login
          </button>
          <Link
            to={"/login/identy"}
            className="text-center flex justify-center text-gray-500 text-sm w-full my-4"
          >
            Olvide la Contraseña
          </Link>
          <Link
            to={"/termandpolicies"}
            className="text-center font-bold flex justify-center text-gray-500 text-sm w-full my-4"
          >
            Términos y Políticas
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
