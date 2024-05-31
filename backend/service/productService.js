const Product = require("../model/product");
const Order = require("../model/product");
const productService = {
  fetchProductData: async (calc) => {
    try {
      const productData = await Product.find({})
        .skip(calc.skip)
        .limit(calc.limit);
      const totalItems = await Product.countDocuments();
      const totalPages = Math.ceil(totalItems / calc.limit);
      if (productData && productData.length > 0) {
        return {
          productData,
          totalItems,
          totalPages,
        };
      } else {
        return {
          productData: [],
          totalItems: 0,
          totalPages: 0,
        };
      }
    } catch (e) {
      throw e;
    }
  },
  fetchProduct: async (id) => {
    try {
      const product = await Product.find({ _id: id });
      return product;
    } catch (e) {
      throw e;
    }
  },
  addProduct: async (productData) => {
    try {
      const {
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
        imageUrl,
      } = productData;

      const newProduct = new Product({
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
        productImage: imageUrl,
      });

      const createdProduct = await newProduct.save();
      return createdProduct;
    } catch (e) {
      throw e;
    }
  },
  deleteProduct: async (id) => {
    try {
      const deleteProductData = await Product.findByIdAndDelete(id);
      return deleteProductData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
  fetchCategoryProduct: async () => {
    try {
      const productCategory = await Product.distinct("category");

      const productByCategory = [];
      for (const category of productCategory) {
        const product = await Product.findOne({ category });
        if (product) {
          productByCategory.push(product);
        }
      }
      return productByCategory;
    } catch (err) {
      throw err;
    }
  },
  fetchProductsByCategory: async (category) => {
    try {
      const response = await Product.find({ category: category });
      return response;
    } catch (e) {
      throw e;
    }
  },
  fetchOrders: async () => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = productService;
