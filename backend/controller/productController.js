const productService = require("../service/productService.js");
const productController = {
  fetchProduct: async (req, res) => {
    try {
      const data = await productService.fetchProduct();
      if (data && data.length > 0) {
        res.status(200).json({ data });
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
      console.log("imageurl",imageUrl)
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
};
module.exports = productController;
