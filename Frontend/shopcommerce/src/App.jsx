import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import { UseGlobalState } from "./Context/Usercontext";
import Products from "./pages/Products";
import Productsdesc from "./pages/Productsdesc";
import { Cart } from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import OrderProcessing from "./pages/OrderProcessing";
import { OrderPage } from "./pages/OrderPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isauth } = UseGlobalState();
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* //Si ya esta autenticado isauth es true  y quieres volver a login no podras !! */}
          <Route path="/login" element={isauth ? <Home /> : <Login />} />
          <Route path="/verify" element={isauth ? <Home /> : <Verify />} />
          <Route path="/order" element={isauth ? <Order /> : <Login />} />
          <Route
            path="/order/:id"
            element={isauth ? <OrderPage /> : <Login />}
          />
          <Route
            path="/admin/dashboard"
            element={isauth ? <Dashboard /> : <Login />}
          />
          <Route
            path="/ordersuccess/"
            element={isauth ? <OrderProcessing /> : <Login />}
          />
          <Route
            path="/checkout"
            element={isauth ? <Checkout /> : <Verify />}
          />
          <Route
            path="/payment/:id"
            element={isauth ? <Payment /> : <Verify />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Productsdesc />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
