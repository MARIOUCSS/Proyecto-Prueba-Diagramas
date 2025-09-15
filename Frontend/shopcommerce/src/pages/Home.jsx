import React from "react";
//import { useGlobalState } from "../Context/Usercontext";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
//import { ProdGlobalState } from "../Context/ProductContext";
import ProductCard from "../components/ProductCard";
import { ProdGlobalState } from "../Context/ProductContext";

function Home() {
  //const { user } = useGlobalState();
  const { newProd } = ProdGlobalState();
  // console.log("hoalsalfllas", user.email);
  const navigate = useNavigate();
  return (
    <div>
      <Hero navigate={navigate} />
      <div className="top products mt-3 p-4">
        <h1 className="text-2xl mb-4 ">Latest Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-3">
          {newProd && newProd.length > 0 ? (
            newProd.map((x) => {
              return <ProductCard key={x._id} product={x} latest={"yes"} />;
            })
          ) : (
            <p>No Products</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
