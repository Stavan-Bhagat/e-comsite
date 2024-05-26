const express = require("express");
const router = express.Router();
const productController = require("../controller/productController.js");
const {uploadProductImages} = require("../config/multerConfig.js");

router.get("/fetch-product", productController.fetchProduct);
router.post(
  "/add-product",
  uploadProductImages.array("images", 5),
  productController.addProduct
);

module.exports=router;