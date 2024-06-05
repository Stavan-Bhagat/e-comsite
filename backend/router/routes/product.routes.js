const express = require("express");
const productRouter = express.Router();
const {
  fetchProductData,
  fetchProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  fetchCategoryProduct,
  fetchOrders,
  fetchProductsByCategory,
  suggestions,
} = require("../../controller/product.controller.js");
const { uploadProductImages } = require("../../config/multer.config.js");
const authentication=require("../../middleware/authentication.middleware")

productRouter.get("/fetch-product-data", fetchProductData);
productRouter.get("/fetch-product/:id", fetchProduct);
productRouter.get("/fetch-category-product", fetchCategoryProduct);
productRouter.get("/fetch-product-by-category", fetchProductsByCategory);
productRouter.get("/suggestions", suggestions);
productRouter.get("/orders", fetchOrders);
productRouter.post("/add-product", uploadProductImages.array("images", 5), addProduct);
productRouter.patch("/update-product",uploadProductImages.array("images", 5),updateProduct);
productRouter.delete("/delete-product", deleteProduct);

module.exports = productRouter;
