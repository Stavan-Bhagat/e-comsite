const Product = require("../model/product");
const productService = {
  fetchProduct: async (calc) => {
    try {
      const productData = await Product.find({})
        .skip(calc.skip)
        .limit(calc.limit);
      const totalItems = await Product.countDocuments();
      const totalPages = Math.ceil(totalItems / calc.limit);
      console.log(totalPages);
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
};

module.exports = productService;
