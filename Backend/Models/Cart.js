const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: Number,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Cart", CartSchema);
