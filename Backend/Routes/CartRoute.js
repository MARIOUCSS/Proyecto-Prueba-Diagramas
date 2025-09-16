const express = require("express");
const {
  AddToCart,
  RemoveItemcart,
  UpdateCart,
  FetchCart,
} = require("../Controllers/Cart");
const { RequireSignIn } = require("../Middleware/Authidleware");
const router = express.Router();

router.post("/cartN/new", RequireSignIn, AddToCart);
router.delete("/cartD/remove/:id", RequireSignIn, RemoveItemcart);
router.post("/cartU/update", RequireSignIn, UpdateCart);
router.get("/carT/all", RequireSignIn, FetchCart);
module.exports = router;
