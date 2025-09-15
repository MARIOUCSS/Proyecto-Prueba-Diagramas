import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Contextc } from "./ContextU";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "./auth";
// 1. Crear el contexto
//export const Contextc = createContext();

// 2. Hook para usar el contexto (NO necesita PropTypes)
export const CartGlobalState = () => {
  const context = useContext(Contextc);
  return context;
};

// 3. Componente Provider (SÍ necesita PropTypes)
export const GlobalCartContext = (props) => {
  const token = Cookies.get("token");
  //const [loading, setloading] = useState(false);
  const [totalItem, settotalItem] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  ///
  const [cart, setcart] = useState([]);

  const fetchCart = async () => {
    try {
      // const { data } = await axios.get(`${url}/cart/carT/all`, {
      //   headers: {
      //     Authorization: token, // 👈 FORMATO ESTÁNDAR
      //   },
      //   // withCredentials: true,
      // });
      const { data } = await axios.get(`${url}/cart/carT/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
        },
      });
      setsubtotal(data.subtotal);
      settotalItem(data.SumoQuantity);
      setcart(data.cart);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const AddtoCart = async (product) => {
  //   try {
  //     const { data } = await axios.post(
  //       `${url}/cart/cartN/new`,
  //       { product },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // 👈 FORMATO ESTÁNDAR
  //         },
  //       }
  //     );
  //     //fetchCart();
  //     toast.success(data.message);

  //     console.log("aca seguimos avanzando para agregar");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const AddtoCart = async (product) => {
    try {
      const token = Cookies.get("token"); // Obtener el token actualizado

      if (!token) {
        toast.error("No estás autenticado. Inicia sesión primero.");
        return;
      }

      const { data } = await axios.post(
        `${url}/cart/cartN/new`,
        { product }, // 👈 Verifica si el backend espera { product } o directamente el objeto
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Formato correcto
          },
        }
      );

      toast.success(data.message);
      fetchCart();
      console.log("Producto agregado:", data);
    } catch (error) {
      console.error("Error completo:", error);

      // Manejo específico de errores
      if (error.response?.status === 401) {
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
        // Limpiar token expirado
        Cookies.remove("token");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al agregar al carrito");
      }
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <Contextc.Provider
      value={{ subtotal, totalItem, cart, fetchCart, AddtoCart, settotalItem }}
    >
      {props.children}
    </Contextc.Provider>
  );
};

// ✅ CORRECTO: PropTypes en el COMPONENTE
GlobalCartContext.propTypes = {
  children: PropTypes.node.isRequired,
};
