import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { url } from "./auth";
import { Contextp } from "./ContextU";
//export const Contextp = createContext();

export const ProdGlobalState = () => {
  const context = useContext(Contextp);
  return context;
};
export const GlobalProviderProd = (props) => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [newProd, setnewProd] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [product, setproduct] = useState({});
  const [related, setrelated] = useState([]);
  //
  const fetchProduct = async (id) => {
    setloading(true);
    try {
      const { data } = await axios.get(`${url}/product/product/${id}`);
      setproduct(data.product);
      setrelated(data.relatedPro);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  const fetchProducts = async () => {
    //mientras carga sigue verdadero cuando ya termina false es porque ya obtuvo los datos
    setloading(true);
    try {
      const { data } = await axios.get(`${url}/product/product/all`);
      setproducts(data.products);
      setnewProd(data.newProduct);
      setCategoria(data.categories);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  ////23:27
  return (
    <Contextp.Provider
      value={{
        products,
        loading,
        newProd,
        categoria,
        product,
        related,
        fetchProduct,
        fetchProducts,
      }}
    >
      {props.children}
      <Toaster />
    </Contextp.Provider>
  );
};
GlobalProviderProd.propTypes = {
  children: PropTypes.node.isRequired, // Valida que children sea un nodo de React y sea obligatorio
};
