//const Cart = require("../Models/Cart");
const Cart = require("../Models/Cart");
//const Product = require("../Models/Product");
const Product = require("../Models/Product");
const AddToCart = async (req, res) => {
  try {
    const { product } = req.body; // Nota: minúscula para coincidir con tu esquema

    //
    const productToAdd = await Product.findById(product);
    if (!productToAdd || productToAdd === 0) {
      return res.status(400).send({ message: "Out of Stock" });
    }
    const CartI = await Cart.findOne({ product: product }).populate("product");
    if (CartI) {
      if (CartI.quantity >= CartI.product.stock) {
        return res.status(400).send({ message: "Out of Stock" });
      }
      CartI.quantity += 1;
      await CartI.save();
    } else {
      await Cart.create({ quantity: 1, product, user: req.user._id });
    }
    return res.status(200).send({ message: "Added to Cart" });
  } catch (error) {
    console.error("Error in AddToCart:", error);

    // Manejo específico de errores de MongoDB
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
const RemoveItemcart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    await cart.deleteOne();
    return res.status(200).send({ message: "Remove to Cart" });
  } catch (error) {
    console.error("Error in RemoveItemcart:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const UpdateCart = async (req, res) => {
  try {
    const { action } = req.query;
    if (action === "inc") {
      const { id } = req.body;
      const cart = await Cart.findById(id).populate("product");
      if (cart.quantity < cart.product.stock) {
        cart.quantity++;
        await cart.save();
      } else {
        return res.status(400).send({
          message: "Out of Stock",
        });
      }
      return res.status(200).send({
        message: "Cart Update",
      });
    }
    if (action === "dec") {
      const { id } = req.body;
      const cart = await Cart.findById(id).populate("product");
      if (cart.quantity > 1) {
        cart.quantity--;
        await cart.save();
      } else {
        return res.status(400).send({
          message: "Yoy have only one Item",
        });
      }
      return res.status(200).send({
        message: "Cart Update",
      });
    }
  } catch (error) {
    console.error("Error in UpdateCart:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const FetchCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");
    const SumoQuantity = cart.reduce((ac, i) => ac + i.quantity, 0);
    let subtotal = 0;
    for (const P of cart) {
      const item = P.product.price * P.quantity;
      subtotal += item;
    }
    return res.status(200).send({
      SumoQuantity,
      subtotal,
      cart,
    });
    // console.log(SumoQuantity);
    // console.log(subtotal);
    // console.log(cart);
  } catch (error) {
    console.error("Error in FetchCart:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {
  AddToCart,
  RemoveItemcart,
  UpdateCart,
  FetchCart,
};
