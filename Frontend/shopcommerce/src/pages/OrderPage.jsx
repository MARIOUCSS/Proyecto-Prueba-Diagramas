import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { url } from "../Context/auth";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
//import { set } from "mongoose";

export const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState("");
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
        const { data } = await axios.get(
          `${url}/order/orders/getMyorder/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
            },
          }
        );
        console.log(data);
        setOrder(data.OrderU);
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
  }, [id]);
  if (loading) {
    return (
      <div className="mt-20">
        <Loader />
      </div>
    );
  }
  if (order.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-600">No Orders</h1>
        <Button onclick={() => navigate("/products")}>Show Now </Button>
      </div>
    );
  }

  console.log(order);
  return (
    <div className="mt-20 container mx-auto py-6 px-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
            <Button onClick={() => window.print()}>Print Order</Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Sumary</h2>
            <p>
              <strong>Order ID : </strong>
              {order._id}
            </p>
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
              $/.{" "}
              {order.subtotal.toLocaleString("es-PE", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p>
              <strong>Payment Method : </strong>
              {order.method}
            </p>
            <p>
              <strong>Placed At : </strong>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Shipping Details</h2>
            <p>
              <strong>Phone :</strong>
              {order.phone}
            </p>
            <p>
              <strong>Address :</strong>
              {order.address}
            </p>
            <p>
              <strong>User :</strong>
              {order.user?.email || "Guest"}
            </p>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {order.items.map((e, i) => (
          <Card key={i}>
            <Link to={`/product/${e.product._id}`}>
              <img
                src={e.product.Images[0].url}
                alt={e.product.title}
                className="max-w-full max-h-full object-contain"
              />
            </Link>
            <CardContent>
              <h3 className="text-lg font-semibold">{e.product.title}</h3>
              <p>
                <strong>Quantity : </strong>
                {e.quantity}
              </p>
              <p>
                <strong>Price : </strong>
                {e.product.price}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
