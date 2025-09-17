const express = require("express");

const { RequireSignIn } = require("../Middleware/Authidleware");
const {
  CreateAdress,
  GetAllAdress,
  GetSingleAddress,
  Deleteaddress,
} = require("../Controllers/Adressscontrollers");
const router = express.Router();

router.post("/address/new", RequireSignIn, CreateAdress);
router.get("/address/allAdress", RequireSignIn, GetAllAdress);
router.get("/address/SingleAdress/:id", RequireSignIn, GetSingleAddress);
router.delete("/address/DeleteAddress/:id", RequireSignIn, Deleteaddress);

module.exports = router;
