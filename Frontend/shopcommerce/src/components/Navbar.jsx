import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AlertTriangle, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Login from "../pages/Login";
import User from "../pages/User";
import { CartGlobalState } from "../Context/CartContext";
import { UseGlobalState } from "../Context/Usercontext";
function Navbar() {
  const [isauth, setIsauth] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { LogoutUser } = UseGlobalState();
  const { totalItem, settotalItem } = CartGlobalState();
  const Navigate = useNavigate();
  const logouthandler = () => {
    //alert("sale");
    setIsauth((prev) => !prev);
    LogoutUser(Navigate, settotalItem);
  };

  //const isauth = false;
  useEffect(() => {
    const handleScroll = () => {
      //la pantalla
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div
      className={`z-50 fixed top-0 left-0 right-0 bg-background/100 border-b backdrop-blur-md transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container  mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">QuickCart</h1>
        <ul className="flex justify-center items-center space-x-6 ">
          <li className="cursor-pointer" onClick={() => Navigate("/")}>
            Home
          </li>
          <li className="cursor-pointer" onClick={() => Navigate("/products")}>
            Products
          </li>
          <li
            className="cursor-pointer relative"
            onClick={() => Navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6" />
            <span
              className="absolute -top-4 left-2 bg-red-500 text-white flex items-center justify-center
             font-bold w-5 h-5 rounded-full"
            >
              {totalItem}
            </span>
          </li>
          <li className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {isauth ? <User /> : <Login />}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={5}
                className={` min-w-[220px]  // Ancho mínimo
    bg-white       // Fondo blanco
    rounded-md     // Bordes redondeados
    p-[4px]        // Padding interno
    shadow-md      // Sombra
    border         // Borde
    border-gray-200 // Color del borde
    z-50   `}
              >
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-b border-gray-300 " />
                {!isauth ? (
                  <>
                    <DropdownMenuItem
                      className={`
  text-sm          // Tamaño de texto
  px-2 py-1.5      // Padding
  rounded-sm       // Bordes redondeados
  cursor-pointer   // Cursor tipo 
  outline-none     // Elimina el borde al enfocar
  hover:bg-gray-100 // Fondo al hover
  focus:bg-gray-100 // Fondo al enfocar (accesibilidad)
                      `}
                      onClick={() => Navigate("/login")}
                    >
                      Login
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      className={`
  text-sm          // Tamaño de texto
  px-2 py-1.5      // Padding
  rounded-sm       // Bordes redondeados
  cursor-pointer   // Cursor tipo 
  outline-none     // Elimina el borde al enfocar
  hover:bg-gray-100 // Fondo al hover
  focus:bg-gray-100 // Fondo al enfocar (accesibilidad)
                      `}
                      onClick={() => Navigate("/order")}
                    >
                      Your Order
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`
  text-sm          // Tamaño de texto
  px-2 py-1.5      // Padding
  rounded-sm       // Bordes redondeados
  cursor-pointer   // Cursor tipo 
  outline-none     // Elimina el borde al enfocar
  hover:bg-gray-100 // Fondo al hover
  focus:bg-gray-100 // Fondo al enfocar (accesibilidad)
                      `}
                      onClick={logouthandler}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
