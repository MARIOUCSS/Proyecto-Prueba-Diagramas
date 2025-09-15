const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  items: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    },
  ],

  method: {
    type: String,
    required: true,
  },
  paymentInfo: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paidAt: {
    type: String,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Order", OrderSchema);
