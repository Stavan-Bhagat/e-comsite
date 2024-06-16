const express = require('express');
const productRouter = express.Router();
const {
  fetchProductData,
  fetchProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  fetchCategoryProduct,
  fetchProductsByCategory,
  suggestions,
  searchProducts,
  payment
} = require('../../controller/product.controller.js');
const { uploadProductImages } = require('../../config/multer.config.js');
const authentication = require('../../middleware/authentication.middleware');

productRouter.get('/fetch-product-data', authentication, fetchProductData);
productRouter.get('/fetch-product/:id', fetchProduct);
productRouter.get('/fetch-category-product', fetchCategoryProduct);
productRouter.get('/fetch-product-by-category', fetchProductsByCategory);
productRouter.get('/suggestions', suggestions);
productRouter.get('/search', searchProducts);
productRouter.post('/add-product', uploadProductImages.array('images', 5), addProduct);
productRouter.post('/create-payment-intent', payment);
productRouter.patch('/update-product', uploadProductImages.array('images', 5), updateProduct);
productRouter.delete('/delete-product', deleteProduct);

module.exports = productRouter;
