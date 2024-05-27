const productService = require("../service/productService.js");
const productController = {
  fetchProduct: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    try {
      const data = await productService.fetchProduct({ limit, skip });
      if (data.productData && data.productData.length > 0) {
        res.status(200).json({
          data: data.productData,
          totalPages: data.totalPages,
          currentPage: page,
        });
      } else {
        res.status(404).json({ message: "No user data found" });
      }
    } catch (e) {
      res.status(500).json({ message: "internal server error" });
    }
  },
  addProduct: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "no image files uploaded" });
      }

      const {
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
      } = req.body;
      const imageUrl = req.files.map((file) => file.path);
      console.log("h3");
      console.log("imageurl", imageUrl);
      const newBlog = await productService.addProduct({
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
        imageUrl,
      });
      res.status(201).json({ message: "product added successfully.", newBlog });
    } catch (e) {
      res.status(500).json({ message: "internal server error" });
    }
  },
  fetchCategoryProduct: async (req, res) => {
    try {
      const response = await productService.fetchCategoryProduct();
      res.json({
        message: "product category",
        data: response,
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  fetchProductsByCategory: async (req, res) => {
    const { category } = req.query;
    try {
      const response = await productService.fetchProductsByCategory(category);
      if (response) {
        res.status(201).json({
          message: "product-by-category",
          data: response,
          success: true,
          error: false,
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message || e,
        error: true,
        success: false,
      });
    }
  },
};
module.exports = productController;
