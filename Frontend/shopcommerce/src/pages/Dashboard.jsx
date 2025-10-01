import React, { useState } from "react";
import OrdersPage from "../components/admin/OrdersPage";
import Homepage from "../components/admin/Homepage";
import Infopage from "../components/admin/Infopage";
import { Button } from "../components/ui/Button";
import { Book, MenuIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
//import { Button } from "../components/ui/Button";
import { House } from "lucide-react";
import { ShoppingBag } from "lucide-react";
function Dashboard() {
  const [selectedPage, setselectedPage] = useState("home");
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const RpageContent = () => {
    switch (selectedPage) {
      case "home":
        return <Homepage />;
      case "orders":
        return <OrdersPage />;
      case "info":
        return <Infopage />;
      default:
        return <div>Selecciona una página</div>;
    }
  };

  return (
    <div className="flex min-h-screen mt-30">
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 h-full shadow-lg transition-transform duration-300 bg-background/50 border-b backdrop-blur z-50 `}
      >
        <div className="flex flex-col h-full p-4 ">
          <h1 className="text-lg font-bold mb-4 text-center">Admin Panel</h1>
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setselectedPage("home")}
              className={`w-full flex items-center gap-2 ${
                selectedPage === "home" ? "bg-gray-500" : ""
              }`}
            >
              <House className="w-5 h-5" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => setselectedPage("orders")}
              className={`w-full flex items-center gap-2 ${
                selectedPage === "home" ? "bg-gray-500" : ""
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Orders
            </Button>
            <Button
              variant="ghost"
              onClick={() => setselectedPage("info")}
              className={`w-full flex items-center gap-2 ${
                selectedPage === "orders" ? "bg-gray-500" : ""
              }`}
            >
              <Book className="w-5 h-5" />
              Info
            </Button>
            <Button
              variant="ghost"
              // className=""
              className="lg:hidden "
              onClick={() => setsidebarOpen(false)}
            >
              <X className="w-5 h-5" /> Close
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col ">
        <div className="shadow p-4 flex items-center justify-between lg:justify-end">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setsidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
            Menu
          </Button>
          <h2 className="text-lg font-bold hidden lg:block">Admin Dashoard</h2>
        </div>
        <div className="p-4">{RpageContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
