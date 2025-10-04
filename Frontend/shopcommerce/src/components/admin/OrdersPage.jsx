import React from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../../Context/auth";
import { useState } from "react";
import { useEffect } from "react";
import { CloudLightning, Loader } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
function OrdersPage() {
  const [orders, setorders] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(true);
  const FetchOrders = async () => {
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
      setloading(false);
    } catch (error) {
      console.error("Error completo:", error);
      //setloading(false);
      // Manejo específico de errores
      if (error.response?.status === 401) {
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
        // Limpiar token expirado
        // Cookies.remove("token");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al agregar al obtener las ordenes");
      }
    }
  };

  const UpdateStatus = async (orderId, status) => {
    try {
      // setloading(true);
      const token = Cookies.get("token");
      if (!token) {
        toast.error("No estás autenticado. Inicia sesión primero.");
        return;
      }
      const { data } = await axios.post(
        `${url}/order/orders/updateMyorder/${orderId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
          },
        }
      );
      if (data) {
        toast.success("Order updated successfully!");
        setloading(false);
        FetchOrders();
      }
    } catch (error) {
      console.error("Error completo:", error);
      //setloading(false);
      // Manejo específico de errores
      if (error.response?.status === 401) {
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
        // Limpiar token expirado
        // Cookies.remove("token");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al agregar al obtener las ordenes");
      }
    }
  };

  useEffect(() => {
    FetchOrders();
  }, []);
  const filterOrder = orders.filter(
    (order) =>
      order.user?.email?.toLowerCase().includes(search.toLocaleLowerCase()) ||
      order._id?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  console.log(orders);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      <input
        type="text"
        id="title"
        name="title"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by email or order "
      />
      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterOrder.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>{order.subtotal}</TableCell>
                  <TableCell>
                    <span
                      className={`w-[150px] px-3 py-2 border rounded-3xl text-white ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : "bg-green-500 "
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {/* //  {moment(order.createdAt).format("DD MM YYYY")} */}
                    {/* // {order.createdAt}
                    {moment(order.createdAt).format("DD-MM-YYYY")} */}
                    {order.createdAt
                      ? new Date(order.createdAt)
                          .toLocaleDateString("es-ES")
                          .replace(/\//g, "-")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <select
                      onChange={(e) => UpdateStatus(order._id, e.target.value)}
                      value={order.status}
                      className="w-[150px] px-3 py-2 border rounded-3xl"
                    >
                      <option value="Pending">Pending</option>
                      <option value={"Shipped"}>Shipped</option>
                      <option value={"Delivered"}>Delivered</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div>No Orders</div>
      )}
    </div>
  );
}

export default OrdersPage;
