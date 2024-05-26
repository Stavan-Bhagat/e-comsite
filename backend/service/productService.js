const Product = require("../model/product");
const productService = {
  fetchProduct: async () => {
    try {
      const productData = await Product.find({});
      if (productData && productData.length > 0) {
        return productData;
      } else {
        return [];
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
};

module.exports = productService;
