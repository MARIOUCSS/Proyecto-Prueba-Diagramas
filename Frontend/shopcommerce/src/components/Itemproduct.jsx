import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
function Itemproduct({ product }) {
  const navigate = useNavigate();
  return (
    <div className="ring-1 ring-slate-900/5 rounded-xl overflow-hidden p-2   ">
      <Link
        to={`/products/${product._id}`}
        className="flex items-center justify-center relative"
      >
        <img src={product.Images[0].url} alt="productImg" height="200" />
      </Link>
      <div className="">
        <h4 className="font-bold text-[16px] md:text-[17px] line-clamp-1">
          {product.category}
        </h4>
      </div>
      <div>
        <p>{product.description.slice(0, 30)}</p>
      </div>
      <div>${product.price}</div>
      <div className="flex justify-center items-center">
        <Button
          onClick={() => navigate(`/products/${product._id}`)}
          className="mt-2 "
        >
          View Product
        </Button>
      </div>
    </div>
  );
}

export default Itemproduct;
