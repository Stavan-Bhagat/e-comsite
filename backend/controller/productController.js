const productService = require("../service/productService.js");
const client = require("../config/elasticClient");

const productController = {
  fetchProductData: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    try {
      const data = await productService.fetchProductData({ limit, skip });
      if (data.productData && data.productData.length > 0) {
        res.status(200).json({
          data: data.productData,
          totalPages: data.totalPages,
          currentPage: page,
        });
      } else {
        res.status(404).json({ message: "No product data found" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  fetchProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await productService.fetchProduct(id);
      if (response) {
        res.status(200).json({
          data: response,
          message: "Product fetched successfully",
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  addProduct: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No image files uploaded" });
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

      const newProduct = await productService.addProduct({
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
        imageUrl,
      });
      res
        .status(201)
        .json({ message: "Product added successfully.", newProduct });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        productId,
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
      } = req.body;

      const imageUrl = req.files
        ? req.files.map((file) => file.path)
        : undefined;

      const updatedData = await productService.updateProduct({
        productId,
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
        imageUrl,
      });

      res
        .status(200)
        .json({ message: "Product updated successfully.", updatedData });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.query;
      console.log("iddel", id);
      const productData = await productService.deleteProduct(id);
      if (productData) {
        res.status(200).json({ message: "Product deleted successfully." });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(`Delete product controller error: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  fetchCategoryProduct: async (req, res) => {
    try {
      const response = await productService.fetchCategoryProduct();
      res.status(200).json({
        message: "Product categories fetched successfully",
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
      if (response.length > 0) {
        res.status(200).json({
          message: "Products by category fetched successfully",
          data: response,
          success: true,
          error: false,
        });
      } else {
        res
          .status(404)
          .json({ message: "No products found for this category" });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message || e,
        error: true,
        success: false,
      });
    }
  },
  suggestions: async (req, res) => {
    try {
      const searchQuery = req.query.search || "";
      console.log("Search Query:", searchQuery);

      const response = await client.search({
        index: "products",
        body: {
          query: {
            multi_match: {
              query: searchQuery,
              fields: ["productName", "brandName", "category"],
            },
          },
        },
      });

      console.log("Elasticsearch Response:", JSON.stringify(response, null, 2));

      const responseBody = response.body || response;
      console.log("Response Body:", JSON.stringify(responseBody, null, 2));

      if (responseBody && responseBody.hits && responseBody.hits.hits) {
        const suggestions = responseBody.hits.hits.map((hit) => hit._source);
        console.log("Suggestions:", suggestions);
        res.status(200).json(suggestions);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  fetchOrders: async (req, res) => {
    try {
      const orders = await productService.fetchOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = productController;
