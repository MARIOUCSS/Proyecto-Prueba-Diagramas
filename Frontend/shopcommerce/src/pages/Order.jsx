import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { url } from "../Context/auth";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
function Order() {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  //   const navigate = useNavigate();
  useEffect(() => {
    const FecthOrders = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          toast.error("No estás autenticado. Inicia sesión primero.");
          return;
        }
        const { data } = await axios.get(`${url}/order/orders/ordersAll`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
          },
        });
        setorders(data.orders);
      } catch (error) {
        console.error("Error completo:", error);
        //setloading(false);
        // Manejo específico de errores
        if (error.response?.status === 401) {
          toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
          // Limpiar token expirado
          Cookies.remove("token");
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error al agregar al obtener las ordenes");
        }
      } finally {
        setloading(false);
      }
    };
    FecthOrders();
  }, []);
  if (loading) {
    return (
      <div className="mt-20">
        <Loader />
      </div>
    );
  }
  console.log(orders);
  return <div className="mt-23">holaldas</div>;
}

export default Order;
