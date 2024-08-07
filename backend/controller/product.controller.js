const { getIo } = require('../socket.js');
const Product = require('../model/product.model.js');
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_BAD_REQUEST,
  MSG_INTERNAL_SERVER_ERROR,
  MSG_PRODUCT_FETCHED,
  MSG_PRODUCT_NOT_FOUND,
  MSG_PRODUCT_ADDED,
  MSG_PRODUCT_UPDATED,
  MSG_PRODUCT_DELETED,
  MSG_NO_PRODUCTS_FOUND,
  MSG_CATEGORY_PRODUCTS_FETCHED,
  MSG_CATEGORY_NOT_FOUND
} = require('../constant/errorMessage.constant.js');

exports.addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(STATUS_BAD_REQUEST).json({ message: MSG_BAD_REQUEST });
    }

    const { productName, brandName, category, description, price, sellingPrice, stock } = req.body;
    const imageUrl = req.files.map((file) => file.path);

    const newProduct = new Product({
      productName,
      brandName,
      category,
      description,
      price,
      sellingPrice,
      stock,
      productImage: imageUrl
    });

    const createdProduct = await newProduct.save();

    const io = getIo();
    if (io) {
      io.emit('newProduct', {
        message: 'New product added',
        product: createdProduct
      });
    } else {
      console.warn('Socket.io not initialized. New product event not emitted.');
    }

    res.status(STATUS_CREATED).json({ message: 'New product added', createdProduct });
  } catch (e) {
    console.error('Error adding product:', e);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      message: MSG_INTERNAL_SERVER_ERROR,
      error: e.message
    });
  }
};
exports.fetchProductData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  try {
    const productData = await Product.find({}).skip(skip).limit(limit);
    const totalItems = await Product.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    if (productData && productData.length > 0) {
      res.status(STATUS_SUCCESS).json({
        data: productData,
        totalPages,
        currentPage: page
      });
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: MSG_NO_PRODUCTS_FOUND });
    }
  } catch (e) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.fetchProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.status(STATUS_SUCCESS).json({
        data: product,
        message: MSG_PRODUCT_FETCHED
      });
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: MSG_PRODUCT_NOT_FOUND });
    }
  } catch (e) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId, productName, brandName, category, description, price, sellingPrice, stock } =
      req.body;
    const imageUrl = req.files ? req.files.map((file) => file.path) : undefined;

    const updateFields = {
      productName,
      brandName,
      category,
      description,
      price,
      sellingPrice,
      stock
    };

    if (imageUrl && imageUrl.length > 0) {
      updateFields.productImage = imageUrl;
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, { new: true });

    res.status(STATUS_SUCCESS).json({ message: MSG_PRODUCT_UPDATED, updatedProduct });
  } catch (e) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const productData = await Product.findByIdAndDelete(id);
    if (productData) {
      res.status(STATUS_SUCCESS).json({ message: MSG_PRODUCT_DELETED });
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: MSG_PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    console.error(`Delete product controller error: ${error}`);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.fetchCategoryProduct = async (_req, res) => {
  try {
    const allCategories = await Product.distinct('category');
    const productCategory = allCategories.slice(0, 12);
    const productByCategory = [];
    for (const category of productCategory) {
      const product = await Product.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }
    res.status(STATUS_SUCCESS).json({
      message: MSG_CATEGORY_PRODUCTS_FETCHED,
      data: productByCategory,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(STATUS_BAD_REQUEST).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

exports.fetchProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const limit = 8;
    const response = await Product.find({ category }).limit(limit);
    if (response.length > 0) {
      res.status(STATUS_SUCCESS).json({
        message: MSG_CATEGORY_PRODUCTS_FETCHED,
        data: response,
        success: true,
        error: false
      });
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: MSG_CATEGORY_NOT_FOUND });
    }
  } catch (e) {
    res.status(STATUS_BAD_REQUEST).json({
      message: e.message || e,
      error: true,
      success: false
    });
  }
};

exports.suggestions = async (req, res) => {
  try {
    const { search } = req.query;
    console.log('Received query:', search);
    if (!search) {
      return res.status(400).json({ message: 'Query is required' });
    }

    let type = 'text';
    let products = [];

    if (await Product.exists({ category: new RegExp(`^${search}$`, 'i') })) {
      type = 'category';
      products = await Product.find({ category: new RegExp(search, 'i') }).limit(10);
    } else if (await Product.exists({ brandName: new RegExp(`^${search}$`, 'i') })) {
      type = 'brandName';
      products = await Product.find({ brandName: new RegExp(search, 'i') }).limit(10);
    } else {
      type = 'productName';
      products = await Product.find({
        $or: [
          { productName: new RegExp(search, 'i') },
          { brandName: new RegExp(search, 'i') },
          { category: new RegExp(search, 'i') }
        ]
      }).limit(10);
    }

    res.status(200).json({ products, type, term: search });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    const searchRegex = new RegExp(query, 'i');

    const isCategory = await Product.exists({ category: searchRegex });
    const isBrand = await Product.exists({ brandName: searchRegex });

    let searchQuery = {};
    let type = 'productName';

    if (isCategory) {
      searchQuery = { category: searchRegex };
      type = 'category';
    } else if (isBrand) {
      searchQuery = { brandName: searchRegex };
      type = 'brandName';
    } else {
      searchQuery = { productName: searchRegex };
    }

    const products = await Product.find(searchQuery);
    console.log('products', products);

    res.status(200).json({ data: products, type, term: query });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message
      }
    });
  }
};
