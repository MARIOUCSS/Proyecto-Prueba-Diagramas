import React, { useState } from "react";
import { ProdGlobalState } from "../../Context/ProductContext";
import { Loader } from "lucide-react";
import ProductCard from "../ProductCard";
import { Button } from "../ui/Button";
import ModelProduct from "../ui/ModelProduct";
import toast from "react-hot-toast";

function Homepage() {
  const { products, loading } = ProdGlobalState();
  const [open, setOpen] = useState(false);
  const [formData, setFromData] = useState({
    title: "",
    about: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };
  const HandelOpenModal = () => {
    setOpen(true);
  };
  const HandelCloseModal = () => {
    setOpen(false);
  };
  const handleProduct = () => {
    console.log("aprieta");
    if (!formData.images || formData.images.length === 0) {
      toast.error("Please select images");
      return;
    }
    const myFrom = new FormData();
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
