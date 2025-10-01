import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartGlobalState } from "../Context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../Context/auth";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { Button } from "../components/ui/Button";
function OrderProcessing() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [paymentVerified, setpaymentVerified] = useState(false);
  const { fetchCart } = CartGlobalState();
  //   const location = {
  //despues todo ?
  //   search: "?session_id=ABC123&user=mario&status=success"
  // };

  // // 1) Creamos el objeto con los parámetros
  // const queryParams = new URLSearchParams(location.search);

  // // 2) Obtenemos parámetros individuales
  // const sessionId = queryParams.get("session_id"); // "ABC123"
  // const user = queryParams.get("user");
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Session Id Missing");
        return navigate("/cart");
      }
      if (paymentVerified) {
        return;
      }
      setloading(true);
      try {
        //Order/verify/payment
        const token = Cookies.get("token");
        const { data } = await axios.post(
          `${url}/order/Order/verify/payment`,
          { sessionId },

          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
            },
          }
        );
        if (data.success) {
          toast.success("Order Places successfully");
          setpaymentVerified(true);
          setloading(false);
          fetchCart();

          setTimeout(() => {
            navigate("/order");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        toast.error("Payment verification failed");
        navigate("/cart");
      }
    };
    if (sessionId && !paymentVerified) {
      //hay una session si y No esta el pago verificacio es v ingresar
      //hay una session si y el vago esta verificacion v a fno entra
      verifyPayment();
    }
  }, [sessionId, paymentVerified, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-500">
      {loading ? (
        <>
          <div className="bg-white p-8 rounded-lg shadow-lg text-clip max-w-lg">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
              Processing Order
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Please wait while we process your payment and order
            </p>
            <Loader />
            <div className="text-xl text-gray-500">Processing...</div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div>
              <h1 className="text-4xl font-bold text-green-500 mb-4">
                Order Placed
              </h1>

              <p className="text-gray-600 text-lg mb-6">
                Thank you for shopping with us. Your order will be delivered
                soon
              </p>

              <Button onClick={() => navigate("/order")}>
                Go to order page
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderProcessing;
