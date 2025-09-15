import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./Context/Usercontext.jsx";
import { GlobalProviderProd } from "./Context/ProductContext.jsx";
import { GlobalCartContext } from "./Context/CartContext.jsx";
//import { GlobalProviderProd } from "./Context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <GlobalProviderProd>
        <GlobalCartContext>
          <App />
        </GlobalCartContext>
      </GlobalProviderProd>
    </GlobalProvider>
  </StrictMode>
);
