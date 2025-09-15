//import React, { useState } from "react";
//revisar la pagination del vid-12
import { Input } from "../components/ui/Input";
import { Loader, Search } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../components/ui/Button";
import Title from "../components/Title";
//import { prodGlobalState } from "../Context/ProductContext";
import Itemproduct from "../components/Itemproduct";
import { useEffect, useState } from "react";
import { ProdGlobalState } from "../Context/ProductContext";
//import { GlobalProviderProd } from "../Context/ProductContext";
function Products() {
  //const [show, setshow] = useState(false);
  const { products, loading, categoria } = ProdGlobalState();
  //  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("All");
  const [sortprice, setSortprice] = useState("relevant");
  const [filterProduct, setfilterProduct] = useState([]);
  const [search, setSearch] = useState("");
  const ResetItems = () => {
    setSortType("All");
    setSortprice("relevant");
    setSearch("");
  };
  const Products = () => {
    let pro = [...products];
    if (search) {
      pro = pro.filter((prod) =>
        prod.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortprice) {
      switch (sortprice) {
        case "high":
          return (pro = pro.sort((a, b) => a.price - b.price));
        case "low":
          return (pro = pro.sort((a, b) => b.price - a.price));
        default:
          return pro;
      }
    }
    return pro;
  };
  const Categoriesselect = (Products) => {
    switch (sortType) {
      case "Celulares":
        return Products.filter((x) => x.category === "Celulares");
      case "Laptop":
        return Products.filter((x) => x.category === "Laptop");
      case "Televisores":
        return Products.filter((x) => x.category === "Televisores");
      default:
        return Products;
    }
  };

  useEffect(() => {
    const Prod = Products();
    const categories = Categoriesselect(Prod);
    //console.log(Prod);
    setfilterProduct(categories);
  }, [sortType, products, search, sortprice]);
  return (
    <section className="mx-auto  max-w-[1440] px-6 lg:px-12 py-8 mt-9">
      <div className="flex flex-col sm:flex-row gap-8 mt-8 xl:mt-6 ">
        {/* left */}
        <div className=" min-w-[70px] p-4 rounded-2xl  ring-2  ring-slate-900/5">
          <div className="pb-2">
            <Label className="mb-2">Enter Email</Label>
            <div className="inline-flex items-center px-2 justify-center ring-3  ring-slate-900/5 py-1.5 rounded-full w-full bg-primary overflow-hidden">
              <Input
                type="text"
                value={search}
                placeholder="Search here..."
                className="border-none outline-none w-full h-3 text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                <Search />
              </div>
            </div>
          </div>
          <div className="pb-2">
            <Label className="mb-2">Category</Label>
            <div>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className=" w-full p-2 ring-3 rounded-md  ring-slate-900/5 dark:bg-gray-900 dark:text-white"
              >
                <option value="all">All</option>
                {categoria.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pb-2">
            <Label className="mb-2">Price</Label>
            <div>
              <select
                value={sortprice}
                onChange={(e) => setSortprice(e.target.value)}
                className=" w-full p-2 ring-3 rounded-md  ring-slate-900/5 dark:bg-gray-900 dark:text-white"
              >
                <option value="relevant" className="font-medium">
                  Sort By:Relevant
                </option>
                <option value="low" className="font-medium">
                  Sort By:Low
                </option>
                <option value="high" className="font-medium">
                  Sort By:High
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={ResetItems} className="mt-2 ">
              Clear Filter
            </Button>
          </div>
        </div>
        {/* //right */}
        <div className="flex-1 rounded-2xl  ring-2  ring-slate-900/5  ">
          <Title title={"Our Products"} />
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-5 px-3 py-2">
              {filterProduct.length > 0 ? (
                filterProduct.map((prod) => (
                  <Itemproduct product={prod} key={prod._id} />
                ))
              ) : (
                <p>No Products for select</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
    ///ojo 31:45
  );
}

export default Products;
