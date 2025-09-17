import React from "react";
import { CartGlobalState } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Trash } from "lucide-react";
export const Cart = () => {
  const {
    cart,

    AddtoCart,
    subtotal,
    totalItem,
    UpdateCart,
    RemoveCart,
  } = CartGlobalState();
  const navigate = useNavigate();
  console.log(cart);
  const updateCartH = async (id, action) => {
    await UpdateCart(id, action);
  };
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center"> Your Cart</h1>
      {cart.length === 0 ? (
        <div className=" flex items-center justify-center flex-col ">
          <div className="flex flex-col items-center gap-y-3">
            <p className="font-bold text-2xl">Your cart is empty</p>
            <p>
              <ShoppingCart size={35} />
            </p>
          </div>
          <Button className="mt-6" onClick={() => navigate("/products")}>
            Shop Now
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* //solo 2 columnas */}
          <div className="lg:col-span-2 space-y-6 ">
            {cart.map((x) => (
              <div
                key={x._id}
                className="flex flex-col sm:flex-row items-center sm:items-stretch space-y-6 sm:space-y-1
            sm:space-x-4 shadow-md rounded-lg p-4 border border-gray-400"
              >
                <img
                  src={x.product.Images[0].url}
                  alt={x.product.title}
                  className="w-full sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer"
                  onClick={() => navigate(`/products/${x.product._id}`)}
                  // <Route path="/products/:id" element={<Productsdesc />} />
                />
                {/* //este flex-1 abarca o crece lo mas que epueda */}
                <div className="flex-1 text-center sm:text-left ">
                  <h2 className="text-lg font-medium">{x.product.title}</h2>
                  <p>Price :$/. {x.product.price}</p>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 ">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCartH(x._id, "dec")}
                  >
                    -
                  </Button>
                  <span className="text-center">{x.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCartH(x._id, "inc")}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => RemoveCart(x._id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="col-span-1 shadow-lg rounded-lg border border-gray-400 max-h-[350px] lg:max-h-[240px] px-1">
            <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
              Order Summary
            </h2>
            <hr className="border-t border-gray-400 my-5" />
            {/* minuto 30 */}
            <div className="space-y-2 ">
              <div className="flex justify-between text-md font-semibold px-2">
                <span>Total Items - {totalItem}</span>
                <span>
                  Total Price - $/.{" "}
                  {subtotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <hr className="border-t border-gray-400 my-5" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total :</span>
              <span>
                Total Price - $/.{" "}
                {subtotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <Button
              className="w-full mt-6"
              disabled={cart.length === 0}
              onClick={() => navigate("/checkout")}
            >
              Checkout{" "}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
