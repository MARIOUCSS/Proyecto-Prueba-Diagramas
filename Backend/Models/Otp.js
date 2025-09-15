const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000),
    index: { expires: "5m" },
  },
});
module.exports = mongoose.model("OTP", OtpSchema);
