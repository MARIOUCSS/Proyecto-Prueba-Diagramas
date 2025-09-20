import React, { useEffect, useState } from "react";
import { CartGlobalState } from "../Context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { url } from "../Context/auth";
import { Loader, Trash } from "lucide-react";
import { Button } from "../components/ui/Button";
function Payment() {
  const { subtotal, cart, fetchCart } = CartGlobalState();
  const [address, setaddress] = useState("");
  const [method, setmethod] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const PaymentHandler = async () => {
    console.log("hola");

    if (method === "cod") {
      setloading(true);
      try {
        const token = Cookies.get("token");
        const { data } = await axios.post(
          `${url}/{aca falta la url}`,
          {
            method,
            phone: address.Singleaddress.phone,
            address: address.Singleaddress.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
            },
          }
        );
        setloading(false);
        toast.success(data.message);
        fetchCart();
        navigate("/order");
      } catch (error) {
        console.error("Error completo:", error);
        // setloading(false);
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
    }
  };
  const fetchAddress = async () => {
    try {
      setloading(true);
      const token = Cookies.get("token");
      if (!token) {
        toast.error("No estás autenticado. Inicia sesión primero.");
        return;
      }
      const { data } = await axios.get(
        `${url}/Address/address/SingleAdress/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
          },
        }
      );
      setaddress(data);
      setloading(false);
    } catch (error) {
      console.error("Error completo:", error);
      // setloading(false);
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
    fetchAddress();
  }, [id]);
  console.log(address);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-8 mt-30">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">
              Proceed to Payment
            </h2>
            <div>
              <h3 className="text-xl font-semibold">Products</h3>
              <hr className="border-t border-gray-450 my-5" />
              <div className="space-y-4">
                {cart &&
                  cart.map((x, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row items-center justify-between bg-card p-4 rounded-lg shadow border dark:border-gray-700"
                    >
                      <img
                        src={x.product.Images[0].url}
                        alt="xyz"
                        className="w-16 h-15 object-cover rounded mb-4 md:mb-0 "
                      />
                      <div className="flex-1 md:ml-4 text-center md:text-left ">
                        <h2 className="text-lg font-medium">
                          {x.product.title}
                        </h2>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          $/.{" "}
                          {(x.product.price * x.quantity).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          $/. {subtotal}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* {""} */}
          </div>
          <div className="text-lg font-medium text-center mt-3">
            Total Price to be Paid: $/.{" "}
            {subtotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          {address && (
            <div className="bg-card p-4 rounded-lg shadow border space-x-4 dark:border-gray-700 mt-2">
              <h3 className="text-lg font-semibold text-center">Details</h3>
              <hr className="border-t border-gray-450 my-5" />
              <div className="flex flex-col space-y-4 ">
                <div>
                  <h4 className="font-semibold mb-1">Delivery Address</h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    <strong>Address :</strong> {address.Singleaddress.address}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    <strong>Phone :</strong> {address.Singleaddress.phone}
                  </p>
                </div>
                <div className="w-full md:w-1/2 ">
                  <h4 className="font-semibold mb-1">Select Payment Method</h4>
                  <select
                    // name=""
                    // id=""
                    value={method}
                    onChange={(e) => setmethod(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-card dark:bg-gray-900 dark:text-white"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cod">Cod</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <Button
            className="w-full py-3 mt-4 "
            onClick={PaymentHandler}
            disabled={!method || !address}
            //no hay metodo f inversa v activado
            //si hay metodo v inversa f
            //disabled es verdadero
          >
            Procced To Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Payment;
