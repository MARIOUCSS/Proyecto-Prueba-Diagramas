import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { url } from "../Context/auth";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
function Order() {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
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
  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-600">No Orders</h1>
        <Button onclick={() => navigate("/products")}>Show Now </Button>
      </div>
    );
  }

  console.log(orders);
  return (
    <div className="container mx-auto py-6 px-4 min-h-[70vh] mt-20">
      <div className="text-3xl font-bold mb-6 text-center">Your Orders</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          return (
            <Card
              key={order._id}
              className="shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Order # {order._id.toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Status :</strong>
                  <span
                    className={`${
                      order.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <strong>Total Items : </strong>
                  {order.items.length}
                </p>
                <p>
                  <strong>Subtotal : </strong>
                  {order.subtotal}
                </p>
                <p>
                  <strong>Placed At : </strong>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
