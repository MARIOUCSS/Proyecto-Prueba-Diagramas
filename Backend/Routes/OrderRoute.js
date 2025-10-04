const express = require("express");
const {
  newOrderCO,
  getAllorders,
  getallordersAdmin,
  getMyOrder,
  updateStatus,
  getStats,
  VerifyPayment,
  NewOrderOnline,
  getOrderId,
} = require("../Controllers/OrdersControllers");
const { RequireSignIn, IsAdmin } = require("../Middleware/Authidleware");

const router = express.Router();
router.post("/orders/new", RequireSignIn, newOrderCO);
router.get("/orders/ordersAll", RequireSignIn, getAllorders);
router.get("/orders/ordersAllAdmin", RequireSignIn, IsAdmin, getallordersAdmin);
router.get("/orders/getMyorder", RequireSignIn, getMyOrder);
router.post("/orders/updateMyorder/:id", RequireSignIn, updateStatus);
router.get("/orders/getMyorder/:id", RequireSignIn, getOrderId);
router.get("/orders/getStats", RequireSignIn, getStats);
router.post("/Order/new/online", RequireSignIn, NewOrderOnline);

router.post("/Order/verify/payment", RequireSignIn, VerifyPayment);
module.exports = router;
