const { resolve } = require("path");
const Cart = require("../Models/Cart");

const Product = require("../Models/Product");
const sendOrderConfirmation = require("../Utils/sendOrder");
const Stripe = require("stripe");
const Order = require("../Models/Order");
//const Order = require("../Models/Order");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const getOrderId = async (req, res) => {
  try {
    const OrderU = await Order.findById(req.params.id).populate({
      path: "items.product",
      select: "Images price",
    });
    if (!OrderU) return res.status(200).send({ message: "Order not found" });
    return res.status(200).send({
      message: "Order obtained",
      OrderU,
    });
  } catch (error) {
    console.error("Error in GetSingleOrder:", error);
    res.status(500).json({
      message: "Error retrieving Order",
      error: error.message,
    });
  }
};
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
const NewOrderOnline = async (req, res) => {
  try {
    //   const cart = await Cart.find({ user: req.user._id }).populate({
    //   path: "product",
    //   select: "title price",
    // });
    const { method, phone, address } = req.body;
    const cart = await Cart.find({ user: req.user._id }).populate("product");
    if (!cart.length) {
      return res.status(400).send({
        message: "Cart is empty",
      });
    }
    const subtotal = cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const line_items = cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            images: [item.product.Images[0].url],

            description: item.product.description,
            // metadata: {
            //   id: item._id,
            // },
          },

          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    ///
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      //success_url: `${process.env.CLIENT_URL}/checkout-success`,
      success_url: `${process.env.CLIENT_URL}/ordersuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId: req.user._id.toString(),
        method,
        phone,
        address,
        subtotal,
      },
    });
    //
    return res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error); // 👈 imprime TODO
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment session",
      stack: error.stack, // 👈 opcional para ver dónde explota
    });
  }
};
const VerifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const { userId, method, phone, address, subtotal } = session.metadata;
    const cart = await Cart.find({ user: userId }).populate("product");
    const items = cart.map((x) => ({
      product: x.product._id,
      name: x.product.title,
      price: x.product.price,
      quantity: x.quantity,
    }));
    if (cart.length === 0) {
      return res.status(400).send({
        message: "Cart is empty",
      });
    }
    //Existe alguna order ?
    const ExistengOrder = await Order.findOne({ paymentInfo: sessionId });
    if (!ExistengOrder) {
      const Orders = await Order.create({
        items: cart.map((x) => ({
          product: x.product._id,
          quantity: x.quantity,
        })),
        method,
        user: userId,
        phone,
        address,
        subtotal,
        paidAt: new Date(),
        paymentInfo: sessionId,
      });
      //
      for (let i of Orders.items) {
        const product = await Product.findById(i.product);
        if (product) {
          product.stock -= i.quantity;
          product.sold += i.quantity;
          await product.save();
        }
      }
      //Eliminame todos los documentos que cumplan estan condicion
      await Cart.deleteMany({ user: req.user._id });
      //Enviar correo con la compra
      //      email,
      // subject,
      // orderId,
      // products,
      // totalAmount,
      await sendOrderConfirmation({
        email: req.user.email,
        subject: "Order Confirmation",
        orderId: Order._id,
        products: items,
        totalAmount: subtotal,
      });
      return res.status(201).send({
        success: true,
        message: "Order Created Successfully",
        Orders,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  newOrderCO,
  getAllorders,
  getallordersAdmin,
  getMyOrder,
  updateStatus,
  getStats,
  NewOrderOnline,
  VerifyPayment,
  getOrderId,
};
//27:49
