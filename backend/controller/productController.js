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
        res.status(404).json({ message: "No user data found" });
      }
    } catch (e) {
      res.status(500).json({ message: "internal server error" });
    }
  },
  fetchProduct: async (req, res) => {
    const { id } = req.params;
    const response = await productService.fetchProduct(id);
    if (response) {
      res.status(200).json({
        data: response,
        message: "fetch product",
      });
    }
    try {
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
              fields: ["productName", "brandName","category"],
            },
          },
        },
      });

      // Log the entire response object
      console.log("Elasticsearch Response:", JSON.stringify(response, null, 2));

      // Ensure response.body is accessible and has the expected structure
      const responseBody = response.body || response;
      console.log("Response Body:", JSON.stringify(responseBody, null, 2));

      if (responseBody && responseBody.hits && responseBody.hits.hits) {
        const suggestions = responseBody.hits.hits.map((hit) => hit._source);
        console.log("Suggestions:", suggestions);
        res.json(suggestions);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
module.exports = productController;
