import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../Context/auth";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Loader, Trash } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
function Checkout() {
  const [address, setaddress] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchAddress = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("No estás autenticado. Inicia sesión primero.");
        return;
      }

      const { data } = await axios.get(`${url}/Address/address/allAdress`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
        },
      });
      setaddress(data.alladdress);
      setloading(false);
    } catch (error) {
      console.error("Error completo:", error);
      setloading(false);
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
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [newAddress, setnewAddress] = useState({
    address: "",
    phone: "",
  });
  const handleAddress = async () => {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${url}/Address/address/new`,
        {
          address: newAddress.address,
          phone: newAddress.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
          },
        }
      );
      if (data.message) {
        toast.success(data.message);
        fetchAddress();
        setnewAddress({
          address: "",
          phone: "",
        });
        setmodalOpen(false);
      }
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
        toast.error("Error al agregar al carrito");
      }
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh] mt-20  ">
      <h1 className="text-3xl font-bold mb-6 text-center ">Checkout</h1>
      {loading ? (
        <Loader />
      ) : (
        // <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        //   {address && address.length > 0 ? (
        //     address.map((x) => (
        //       <div className="p-4 border rounded-lg shadow-sm" key={x._id}>
        //         <h3 className="text-lg font-semibold flex justify-between">
        //           Address - {x.address}
        //         </h3>
        //       </div>
        //     ))
        //   ) : (
        //     <div className="flex justify-center items-center ">
        //       <p>No Address Found</p>
        //     </div>
        //   )}
        // </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
          {address && address.length > 0 ? (
            address.map((x) => (
              <div className="p-4 border rounded-lg shadow-sm" key={x._id}>
                <h3 className="text-lg font-semibold flex justify-between">
                  Address - {x.address}
                  <Button variant="destructive">
                    <Trash />
                  </Button>
                </h3>
                <p className="text-sm">Phone - {x.phone}</p>
                <Link to={`/payment/${x._id}`}>
                  <Button variant="outline">Use Address</Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center ">
              <p className="font-bold">No Address Found</p>
            </div>
          )}
        </div>
      )}
      <Button
        className="mt-6"
        variant="outline"
        onClick={() => setmodalOpen(true)}
      >
        Add New Address
      </Button>
    </div>
  );
}

export default Checkout;
