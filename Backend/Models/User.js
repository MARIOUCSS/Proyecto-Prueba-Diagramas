const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    //   jobTitle: {
    //     type: String,
    //     required: true,
    //   },
    //   company: {
    //     type: String,
    //     required: true,
    //   },
    //   password: {
    //     type: String,
    //     required: true,
    //   },
    //   role: {
    //     type: String,
    //     enum: ["user", "admin"],
    //     default: "user",
    //   },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
