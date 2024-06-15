const mongoose = require('mongoose');
require('dotenv').config();
const dbUri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
