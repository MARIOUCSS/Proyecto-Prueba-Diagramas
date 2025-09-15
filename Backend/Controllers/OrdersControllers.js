const Cart = require("../Models/Cart");
const Order = require("../Models/Order");
const Product = require("../Models/Product");
const sendOrderConfirmation = require("../Utils/sendOrder");

const newOrderCO = async (req, res) => {
  try {
    //OJO
    //     [
    //   {
    //     _id: "carrito1",
    //     user: "usuario123",
    //     product: { // ¡Ahora sí tenemos los datos del producto!
    //       _id: "producto789",
    //       Title: "Zapatos Nike",
    //       Price: 120
    //     },
    //     quantity: 2
    //   }
    // ]
    //PATH ES DONDE SE POBLARA Y SELECT SON LAS PROPIEDADES QUE SE TRAERAN

    const { method, phone, address } = req.body;
    const cart = await Cart.find({ user: req.user._id }).populate({
      path: "product",
      select: "title price",
    });
    if (!cart) {
      return res.status(400).send({ message: "Cart is empty" });
    }
    let subtotal = 0;

    const items = cart.map((i) => {
      const itemSubtotal = i.product.price * i.quantity;
      subtotal += itemSubtotal;
      return {
        product: i.product._id,
        name: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
      };
    });
    const order = await Order.create({
      items,
      method,
      user: req.user._id,
      phone,
      address,
      subtotal,
    });
    for (let i of order.items) {
      const product = await Product.findById(i.product);
      if (product) {
        product.stock -= i.quantity;
        product.sold += i.quantity;
        await product.save();
      }
    }
    //Limpia el carrito despues que se guardo los datos
    await Cart.deleteMany({ user: req.user._id });
    //   //{  email,
    // subject,
    // orderId,
    // products,
    // totalAmount,}
    await sendOrderConfirmation({
      email: req.user.email,
      subject: "Order Confirmation",
      orderId: order._id,
      products: items,
      totalAmount: subtotal,
    });
    res.status(200).send({
      message: "Order created successfully",
      order,
    });
  } catch (error) {}
};
const getAllorders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return res.status(400).send({ message: "there is no order" });
  }
  return res.status(200).send({ orders: orders.reverse() });
};
//const getAllordersA = () => {;
const getallordersAdmin = async () => {
  try {
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });
    return res.status(200).send({ orders });
  } catch (error) {}
};
const getMyOrder = async (req, res) => {
  const orders = await Order.findById(req.params.id)
    .populate("items.product")
    .populate("user");
  return res.status(200).send({ orders });
};
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).send({ message: "Not Order" });
    }
    order.status = status;
    await order.save();
    return res.status(200).send({ message: "Order Status Update", order });
  } catch (error) {}
};
const getStats = async (req, res) => {
  try {
    const cod = await Order.find({ method: "cod" }).countDocuments();
    const online = await Order.find({ method: "online" }).countDocuments();
    const products = await Product.find();
    const data = products.map((prod) => ({
      name: prod.title,
      sold: prod.sold,
    }));
    return res.status(200).send({
      cod,
      online,
      products,
      data,
    });
  } catch (error) {}
};
module.exports = {
  newOrderCO,
  getAllorders,
  getallordersAdmin,
  getMyOrder,
  updateStatus,
  getStats,
};
//27:49
