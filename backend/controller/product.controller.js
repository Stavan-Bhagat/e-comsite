const {
  fetchProductData_service,
  fetchProduct_service,
  addProduct_service,
  updateProduct_service,
  deleteProduct_service,
  fetchProductsByCategory_service,
  fetchCategoryProduct_service,
  fetchOrders_service,
} = require("../service/product.service.js");
const client = require("../config/elasticClient.config.js");

exports.fetchProductData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  try {
    const data = await fetchProductData_service({ limit, skip });
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
};
exports.fetchProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetchProduct_service(id);
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
};

exports.addProduct = async (req, res) => {
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

    const newProduct = await addProduct_service({
      productName,
      brandName,
      category,
      description,
      price,
      sellingPrice,
      stock,
      imageUrl,
    });
    console.log("added2");
    io.emit("newProduct", newProduct);
    console.log("added3");
    res
      .status(201)
      .json({ message: "Product added successfully.", newProduct });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
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

    const imageUrl = req.files ? req.files.map((file) => file.path) : undefined;

    const updatedData = await updateProduct_service({
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
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const productData = await deleteProduct_service(id);
    if (productData) {
      res.status(200).json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(`Delete product controller error: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchCategoryProduct = async (req, res) => {
  try {
    const response = await fetchCategoryProduct_service();
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
};

exports.fetchProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const response = await fetchProductsByCategory_service(category);
    if (response.length > 0) {
      res.status(200).json({
        message: "Products by category fetched successfully",
        data: response,
        success: true,
        error: false,
      });
    } else {
      res.status(404).json({ message: "No products found for this category" });
    }
  } catch (e) {
    res.status(400).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
};

exports.suggestions = async (req, res) => {
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
};

exports.fetchOrders = async (req, res) => {
  try {
    const orders = await fetchOrders_service();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
