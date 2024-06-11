const socket = require('../socket');
const Product = require('../model/product.model.js');
const Order = require('../model/order.model');
const client = require('../config/elasticClient.config.js');
const { io } = require('../socket');
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

exports.fetchProductData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
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
    const io = socket.getIo();
    io.emit('newProduct', { message: MSG_PRODUCT_ADDED, createdProduct });

    res.status(STATUS_CREATED).json({ message: MSG_PRODUCT_ADDED, createdProduct });
  } catch (e) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR, error: e });
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
    const productCategory = await Product.distinct('category');

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
    const response = await Product.find({ category });
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
    const searchQuery = req.query.search || '';

    const response = await client.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query: searchQuery,
            fields: ['productName', 'brandName', 'category']
          }
        }
      }
    });

    console.log('Elasticsearch Response:', JSON.stringify(response, null, 2));

    const responseBody = response.body || response;
    console.log('Response Body:', JSON.stringify(responseBody, null, 2));

    if (responseBody && responseBody.hits && responseBody.hits.hits) {
      const suggestions = responseBody.hits.hits.map((hit) => hit._source);
      console.log('Suggestions:', suggestions);
      res.status(STATUS_SUCCESS).json(suggestions);
    } else {
      res.status(STATUS_SUCCESS).json([]);
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(STATUS_SUCCESS).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.searchProducts = async (req, res) => {
  const { query } = req.body;
  let searchType = 'product';
  let term = query;

  const categoryExists = await Product.findOne({ category: query }).exec();
  if (categoryExists) {
    searchType = 'category';
  } else {
    const brandExists = await Product.findOne({ brandName: query }).exec();
    if (brandExists) {
      searchType = 'brand';
    }
  }

  let products;
  try {
    switch (searchType) {
      case 'category':
        products = await Product.find({ category: term }).exec();
        break;
      case 'brand':
        products = await Product.find({ brandName: term }).exec();
        break;
      case 'product':
      default:
        products = await Product.find({ productName: { $regex: term, $options: 'i' } }).exec();
        break;
    }
    res.status(STATUS_SUCCESS).json({ type: searchType, term, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  exports.payment = async (req, res) => {
    const { amount } = req.body;
    console.log('amounttt', amount);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd'
      });
      console.log("paymentIntent",paymentIntent);
      console.log("paymentIntent.client_secret",paymentIntent.client_secret);
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
