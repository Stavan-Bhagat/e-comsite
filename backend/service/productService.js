const Product = require("../model/product");
const Order = require("../model/order"); // Fix the typo here, previously it was incorrectly requiring Product

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
      const product = await Product.findById(id); // Use findById for finding by _id
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
  updateProduct: async (productData) => {
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
        imageUrl,
      } = productData;

      const updateFields = {
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        stock,
      };

      if (imageUrl.length > 0) {
        updateFields.productImage = imageUrl;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateFields,
        { new: true }
      );
      return updatedProduct;
    } catch (e) {
      throw e;
    }
  },

  deleteProduct: async (id) => {
    try {
      const deleteProductData = await Product.findByIdAndDelete(id);
      return deleteProductData;
    } catch (error) {
      console.log("Error deleting product: ", error);
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
      const response = await Product.find({ category });
      return response;
    } catch (e) {
      throw e;
    }
  },
  fetchOrders: async () => {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },
};

module.exports = productService;
