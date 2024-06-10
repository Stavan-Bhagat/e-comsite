const mongoose = require('mongoose');
require('dotenv').config();
const elasticClient = require('../config/elasticClient.config');
const dbUri = process.env.MONGODB_URI;
const Product = require('../model/product.model');

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
    try {
      const products = await Product.find();
      for (const product of products) {
        const { _id, ...productData } = product.toObject();
        await elasticClient.index({
          index: 'products',
          id: _id.toString(),
          body: productData
        });
      }
      console.log('Products indexed in Elasticsearch');
    } catch (indexingError) {
      console.error(`Error indexing products: ${indexingError}`);
    }
  }
};

module.exports = connectDB;
