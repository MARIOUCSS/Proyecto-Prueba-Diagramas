import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

function ProductCard({ product, latest }) {
  const navigate = useNavigate();
  if (!product) {
    return <div>Producto no disponible</div>;
  }
  return (
    <div>
      {/* {product?():null} para evitar esto mejor esto */}
      {product && (
        <div className="w-[450px] mx-auto relative border-gray-200 rounded-lg">
          <Link to={`/products/${product?._id}`}>
            <img
              src={product?.Images[0].url}
              alt="Product"
              className="max-w-full max-h-full object-contain hover:scale-125"
            />
            {latest === "yes" && (
              <Badge className="absolute -top-2 left-2 bg-green-400 text-white">
                New
              </Badge>
            )}
          </Link>
          <div className="p-4 ">
            <h3 className="font-semibold truncate">
              {product.title.slice(0.3)}
            </h3>
            <p className="text-sm mt-1 truncate">
              {product.description.slice(0, 30)}
            </p>
            <p className="text-sm mt-1 truncate">s/.{product.price}</p>
            <div className="flex justify-center items-center  mt-4 ">
              <Button
                className="w-[150px] h-[px]"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
