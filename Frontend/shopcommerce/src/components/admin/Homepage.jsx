import React, { useState } from "react";
import { ProdGlobalState } from "../../Context/ProductContext";
import { Loader } from "lucide-react";
import ProductCard from "../ProductCard";
import { Button } from "../ui/Button";
import ModelProduct from "../ui/ModelProduct";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../../Context/auth";

function Homepage() {
  const { products, loading, fetchProducts } = ProdGlobalState();
  const [open, setOpen] = useState(false);
  const [formData, setFromData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    //  images: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);

      console.log("✅ Archivos capturados correctamente:");
      filesArray.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.name} (${file.size} bytes)`);
      });
    } else {
      setSelectedFiles([]);
    }
  };
  const HandelOpenModal = () => {
    setOpen(true);
  };
  const HandelCloseModal = () => {
    setOpen(false);
  };
  // const handleProduct = async () => {
  //   console.log("aprieta");
  //   if (!formData.images || formData.images.length === 0) {
  //     toast.error("Please select images");
  //     return;
  //   }
  //   //     //const entries = Object.entries(formData);
  //   // console.log(entries);
  //   // // [
  //   // //   ["title", "Mi producto"],  // ← Array en posición 0
  //   // //   ["price", 100]             // ← Array en posición 1
  //   // // ]
  //   const myFrom = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (key === "images") {
  //       for (let i = 0; i < value.length; i++) {
  //         myFrom.append("files", value[i]);
  //       }
  //     } else {
  //       myFrom.append(key, value);
  //     }
  //   });
  //   // console.log("=== CONTENIDO DEL FORMDATA ===");
  //   // myFrom.forEach((value, key) => {
  //   //   console.log(`${key}:`, value);
  //   // });
  //   try {
  //     const token = Cookies.get("token");
  //     const { data } = await axios.post(`${url}/product/products/new`, myFrom, {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`, // ✅ FORMATO CORRECTO
  //       },
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error completo:", error);
  //     //setloading(false);
  //     // Manejo específico de errores
  //     if (error.response?.status === 401) {
  //       toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
  //       // Limpiar token expirado
  //       //  Cookies.remove("token");
  //     } else if (error.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Error al agregar al carrito");
  //     }
  //   }
  // };
  // const handleProduct = async () => {
  //   console.log("🔄 Iniciando handleProduct...");

  //   // Usar selectedFiles en lugar de formData.images para mayor confiabilidad
  //   if (!formData || formData.images.length === 0) {
  //     toast.error("Please select images");
  //     return;
  //   }

  //   const myFrom = new FormData();

  //   // ✅ Agregar campos de texto desde formData
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (key !== "images") {
  //       // Excluir images de formData
  //       myFrom.append(key, value);
  //     }
  //   });

  //   // ✅ Agregar archivos REALES desde selectedFiles
  //   formData.images.forEach((file) => {
  //     console.log(`✅ Agregando archivo: ${file.name}`);
  //     myFrom.append("files", file);
  //   });

  //   // Verificación
  //   console.log("=== ✅ FORMDATA LISTO ===");
  //   for (let [key, value] of myFrom.entries()) {
  //     if (value instanceof File) {
  //       console.log(`📁 ${key}: ${value.name}`);
  //     } else {
  //       console.log(`📝 ${key}: ${value}`);
  //     }
  //   }

  //   try {
  //     const token = Cookies.get("token");
  //     const { data } = await axios.post(`${url}/product/products/new`, myFrom, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log("✅ Éxito:", data);
  //     toast.success("Product created successfully!");
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     toast.error("Error creating product");
  //   }
  // };
  const handleProduct = async () => {
    console.log("=== 🚀 INICIANDO ENVÍO ===");

    // Verificar archivos
    if (selectedFiles.length === 0) {
      toast.error("Please select images");
      return;
    }

    // Verificar campos requeridos
    if (!formData.title || !formData.category || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }

    //setLoading(true);

    try {
      const myFrom = new FormData();

      // ✅ Agregar campos de texto
      Object.entries(formData).forEach(([key, value]) => {
        myFrom.append(key, value);
      });

      // ✅ Agregar archivos REALES
      selectedFiles.forEach((file, index) => {
        console.log(`📁 Agregando archivo ${index + 1}: ${file.name}`);
        myFrom.append("images", file);
      });

      // ✅ Verificación final
      console.log("=== ✅ FORMDATA VERIFICADO ===");
      for (let [key, value] of myFrom.entries()) {
        if (value instanceof File) {
          console.log(`📁 ${key}: ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`📝 ${key}: ${value}`);
        }
      }

      const token = Cookies.get("token");
      // const url = "http://localhost:3000/api"; // Ajusta tu URL base

      const { data } = await axios.post(`${url}/product/products/new`, myFrom, {
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ NO incluir Content-Type - axios lo detecta automáticamente
        },
      });
      if (data) {
        toast.success("Product created successfully!");
        setOpen(false);

        setFromData({
          title: "",
          description: "",
          category: "",
          price: "",
          stock: "",
        });

        fetchProducts();
      }
    } catch (error) {
      console.error("❌ Error completo:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error creating product");
      }
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">All Products</h2>
        <Button variant="ghost" onClick={HandelOpenModal}>
          Add Product
        </Button>
        <ModelProduct
          isOpen={open}
          onClose={HandelCloseModal}
          onInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          formData={formData}
          onSubmit={handleProduct}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-col-4 gap-6">
          {products && products.length > 0 ? (
            products.map((e) => {
              return <ProductCard product={e} key={e._id} latest={"no"} />;
            })
          ) : (
            <p>No Products</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;
