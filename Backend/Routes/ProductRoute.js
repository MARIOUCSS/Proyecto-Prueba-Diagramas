const express = require("express");
const router = express.Router();

const { RequireSignIn, IsAdmin } = require("../Middleware/Authidleware");
const {
  CreateProduct,
  GetAllProducts,
  GetSingleProduct,
  UpdateProduct,
  UpdateProductImage,
} = require("../Controllers/Productcontrollers");

const uploadPhoto = require("../Middleware/Multer");

router.post("/products/new", uploadPhoto.array("images", 10), CreateProduct); //auth
router.get("/product/all", GetAllProducts);
router.get("/product/:id", GetSingleProduct);
router.put("/product/:id", UpdateProduct);
router.post(
  "/productI/:id",
  uploadPhoto.array("images", 10),
  UpdateProductImage
);
module.exports = router;
