const express = require("express");
const router = express.Router();
const productController = require("../controller/productController.js");
const { uploadProductImages } = require("../config/multerConfig.js");

router.get("/fetch-Productdata", productController.fetchProduct);
router.post(
  "/add-product",
  uploadProductImages.array("images", 5),
  productController.addProduct
);
router.get("/fetch-category-product", productController.fetchCategoryProduct);
router.get("/fetch-productdata-by-category", productController.fetchProductsByCategory);

module.exports = router;
