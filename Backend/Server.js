const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // URL exacta de tu frontend
    credentials: true, // Permitir credenciales (cookies)
  })
);
require("dotenv").config();
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;
app.get("/", (req, res) => {
  res.send({
    message: "Hola",
  });
});
const auth = require("./Routes/UserRoute");
const product = require("./Routes/ProductRoute");
const cart = require("./Routes/CartRoute");
const address = require("./Routes/AddressRoute");
const order = require("./Routes/OrderRoute");
app.use("/api/user", auth);
app.use("/api/product", product);
app.use("/api/cart", cart);
app.use("/api/Address", address);
app.use("/api/order", order);
app.listen(port, () => {
  console.log(`servidor corriendo ${port}`);
});
app;
mongoose
  .connect(uri)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
