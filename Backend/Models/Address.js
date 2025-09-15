const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: Number,
  },
  phone: {
    type: Number,

    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Adrress", AddressSchema);
