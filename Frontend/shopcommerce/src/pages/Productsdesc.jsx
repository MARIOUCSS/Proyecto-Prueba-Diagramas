import React, { useEffect } from "react";
//import { prodGlobalState } from "../Context/ProductContext";
import { useParams } from "react-router-dom";
import { Loader, Star } from "lucide-react";
import SimpleCarousel from "../components/SimpleCarousel";
import Title from "../components/Title";
import { UseGlobalState } from "../Context/Usercontext";
import { Button } from "../components/ui/Button";
import { Heart } from "lucide-react";
import { BaggageClaim } from "lucide-react";
import Itemproduct from "../components/Itemproduct";
import { ProdGlobalState } from "../Context/ProductContext";
import { CartGlobalState } from "../Context/CartContext";
function Productsdesc() {
  const { product, fetchProduct, loading, related } = ProdGlobalState();
  const { isauth } = UseGlobalState();
  const { AddtoCart } = CartGlobalState();
  const { id } = useParams();
  //const [size, setSize] = useState("");

  const imageUrls = product?.Images?.map((image) => image.url) || [];
  // const AddTocartPro = (id) => {
  //   AddtoCart(id);
  //   console.log("estoy añadiendo");
  // };
  useEffect(() => {
    fetchProduct(id);
  }, [id]);
  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14  py-8  ">
          {product && (
            <div className=" mx-auto max-w-[1440px] px-6 lg:px-12 py-16 flex gap-8 flex-col sm:flex-row bg-white rounded-2xl">
              <div className="  flex items-center justify-center flex-col gap-[7px] flex-wrap flex-1">
                <SimpleCarousel
                  images={imageUrls}
                  autoPlay={true}
                ></SimpleCarousel>
              </div>
              {/* <div>
                <img src={product.Images[0].url} alt="" />
              </div> */}
              <div className=" flex flex-col flex-[2] rounded-2xl px-1">
                <Title title={product.category} />
                <div className="flex justify-start items-start gap-x-4">
                  <h3 className="text-[24px] leading-tight md:text-[28px] mb-4 font-bold">
                    $ {product.price}
                  </h3>
                  <div className="flex items-center gap-x-4 text-secondary mb-6">
                    <div className="flex gap-x-2 text-secondary text-xl">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <span>(122)</span>
                  </div>
                </div>
                <p>{product.description}</p>
                {/* <div className="flex flex-col gap-4 mb-5">
                  <div className="flex gap-2">
                    {product.sizes && Array.isArray(product.sizes) ? (
                      [...product.sizes]
                        .sort((a, b) => {
                          const order = ["S", "M", "L", "XL", "XXL"];
                          return order.indexOf(a) - order.indexOf(b);
                        })
                        .map((item, i) => (
                          <button
                            onClick={() => setSize(item)}
                            key={i}
                            className={`${
                              item === size ? "text-white" : "boder-slate-900"
                            } border-[1.5px] border-tertiary h-8 w-10 bg-primary space-x-2 rounded-md`}
                          >
                            {item}
                          </button>
                        ))
                    ) : (
                      <p>No sizes available</p>
                    )}
                  </div>
                </div> */}
                {isauth ? (
                  <>
                    {product.stock <= 0 ? (
                      <p className="text-red-500 text-2xl">Out of Stock</p>
                    ) : (
                      <div className="mt-3 flex gap-x-2">
                        <Button onClick={() => AddtoCart(product._id)}>
                          Add To Cart
                        </Button>
                        <Button>
                          <Heart />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-blue-500">
                    Please Login to add someting in cart
                  </p>
                )}
                <div className="flex gap-x-4 mt-4 items-center ">
                  <BaggageClaim />
                  <span>Free Delivery on orders over 500$</span>
                </div>
                <hr className="my-4 w-2/3" />
                <div className="mt-2 flex flex-col gap-1">
                  <p>Authenticity You Can Trust</p>
                  <p>Enjoy Cash on Delivery for Your Convenience</p>
                  <p>Easy Returns and Exchanges Within 7 Days</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-5 px-3 py-2">
        {related.length > 0 ? (
          related.map((re) => <Itemproduct product={re} key={re._id} />)
        ) : (
          <p>No Products related</p>
        )}
      </div>
    </section>
  );
}

export default Productsdesc;
