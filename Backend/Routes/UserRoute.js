const express = require("express");
const router = express.Router();
const {
  LoginUser,
  VerifyUser,
  MyProfile,
} = require("../Controllers/Usercontrollers");
const { RequireSignIn } = require("../Middleware/Authidleware");
//import { LoginUser } from "../Controllers/Usercontrollers.js";
router.post("/login", LoginUser);
router.post("/email/verifyuser", VerifyUser);
router.get("/users/me", RequireSignIn, MyProfile);
module.exports = router;
