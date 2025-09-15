import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { url } from "./auth";
//import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "./ContextU";
const users = {
  user: "ABC",
};
//export const Context = createContext();

export const UseGlobalState = () => {
  const context = useContext(Context);
  return context;
};

export const GlobalProvider = (props) => {
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);
  const [btnLoading, setbtnLoading] = useState(false);
  const [isauth, setisauth] = useState(false);
  //
  const Loginuser = async (email, navigate) => {
    //mientas carga se desactica el boton
    setbtnLoading(true);
    try {
      // http://localhost:3000/api/user/login
      const { data } = await axios.post(`${url}/user/login`, { email });
      toast.success(data.message);
      localStorage.setItem("email", email);
      navigate("/verify");
      setbtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setbtnLoading(false);
    }
  };
  const verifyuser = async (otp, navigate) => {
    //mientas carga se desactica el boton
    setbtnLoading(true);
    try {
      const email = localStorage.getItem("email");
      // http://localhost:3000/api/user/login
      const { data } = await axios.post(`${url}/user/email/verifyuser`, {
        email,
        otp,
      });
      toast.success(data.message);
      localStorage.clear();
      navigate("/");
      setbtnLoading(false);
      setisauth(true);
      setuser(data.user);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });
      // fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
      setbtnLoading(false);
    }
  };
  // const fetchUser = async () => {
  //   try {
  //     const { data } = await axios.get(`${url}/user/users/me`, {
  //       headers: {
  //         token: Cookies.get("token"),
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(data);
  //     // setisauth(true);
  //     // setuser(data.user);
  //     // setloading(false);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //     // setisauth(false);
  //     // setloading(false);
  //   }
  // };

  //minuto 4 del 11
  // const fetchUser = async () => {
  //   try {
  //     const token = Cookies.get("token");

  //     const { data } = await axios.get(`${url}/user/users/me`, {
  //       headers: {
  //         Authorization: token, // 👈 FORMATO ESTÁNDAR
  //       },
  //       // withCredentials: true,
  //     });

  //     console.log("Datos del usuario:", user);
  //     setuser(data.user);
  //     //si esta autenticado true
  //     setisauth(true);
  //     setloading(false);
  //   } catch (error) {
  //     console.error("Error completo:", error);

  //     if (error.response) {
  //       // El servidor respondió con un status code fuera de 2xx
  //       toast.error(error.response.data.message);
  //     } else if (error.request) {
  //       // La solicitud fue hecha pero no se recibió respuesta
  //       toast.error("No se pudo conectar al servidor");
  //     } else {
  //       // Algo pasó en la configuración de la solicitud
  //       toast.error("Error de configuración: " + error.message);
  //     }

  //     setisauth(false);
  //     setloading(false);
  //   }
  //   // setloading(false);
  // };
  const fetchUser = async () => {
    try {
      const token = Cookies.get("token");

      // Verifica que el token exista antes de hacer la solicitud
      if (!token) {
        setisauth(false);
        setloading(false);
        return;
      }

      const { data } = await axios.get(`${url}/user/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
        },
      });

      console.log("Datos del usuario:", data.user);
      setuser(data.user);
      setisauth(true);
      setloading(false);
    } catch (error) {
      console.error("Error completo:", error);

      if (error.response?.status === 401) {
        // Token inválido o expirado - limpiar cookies
        Cookies.remove("token");
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
      } else if (error.response) {
        toast.error(error.response.data.message || "Error del servidor");
      } else if (error.request) {
        toast.error("No se pudo conectar al servidor");
      } else {
        toast.error("Error de configuración: " + error.message);
      }

      setisauth(false);
      setloading(false);
    }
  };
  const LogoutUser = (Navigate, settotalItem) => {
    Cookies.set("token", null);
    setuser([]);
    setisauth(false);
    Navigate("/login");
    toast.success("Logged Out");
    settotalItem(0);
  };
  const value = {
    users,
    user,
    loading,
    btnLoading,
    isauth,
    Loginuser,
    verifyuser,
    fetchUser,
    LogoutUser,
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Context.Provider value={value}>
      {props.children}
      <Toaster />
    </Context.Provider>
  );
};
