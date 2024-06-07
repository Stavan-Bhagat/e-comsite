const mongoose = require('mongoose');
require('dotenv').config();
const elasticClient = require('../config/elasticClient.config');
const dbUri = process.env.MONGODB_URI;
<<<<<<< HEAD

const Product = require("../model/product.model");

const Product = require("../model/product");


const connectDB = async () => {
=======
const Product = require('../model/product.model');

const connectDB = async() => {
>>>>>>> b1bb86dcfa3355159fb53bc806fcbf76003445a7
  try {
    await mongoose.connect(dbUri);

    console.log("mongodb connected");
  } catch (error) {
    console.error(`mongoDB connection failed : ${error}`);

    const products = await Product.find();

    for (const product of products) {
      const { _id, ...productData } = product.toObject();
      await elasticClient.index({
        index: 'products',
        id: _id.toString(),
        body: productData
      });
    }
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);

    process.exit(1);
  }
};


module.exports = connectDB;

