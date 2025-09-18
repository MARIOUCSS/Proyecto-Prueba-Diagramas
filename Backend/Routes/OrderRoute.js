const express = require("express");
const {
  newOrderCO,
  getAllorders,
  getallordersAdmin,
  getMyOrder,
  updateStatus,
  getStats,
} = require("../Controllers/OrdersControllers");
const { RequireSignIn, IsAdmin } = require("../Middleware/Authidleware");

const router = express.Router();
router.post("/orders/new", RequireSignIn, newOrderCO);
router.get("/orders/ordersAll", RequireSignIn, getAllorders);
router.get("/orders/ordersAllAdmin", RequireSignIn, IsAdmin, getallordersAdmin);
router.get("/orders/getMyorder", RequireSignIn, getMyOrder);
router.post("/orders/updateMyorder/:id", RequireSignIn, IsAdmin, updateStatus);
router.get("/orders/getStats", RequireSignIn, getStats);
module.exports = router;
