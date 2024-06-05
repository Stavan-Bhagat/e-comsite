// const mongoose = require("mongoose");
// const elasticClient = require("../config/elasticClient");
// require("dotenv").config();

// const dbUri = process.env.MONGODB_URI;
// const Product = mongoose.model("Product", productSchema);

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(dbUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error(`MongoDB connection failed: ${error}`);
//     process.exit(1);
//   }
// };

// const syncData = async () => {
//   try {
//     await connectDB();

//     // Fetch data from MongoDB
//     const products = await Product.find({});

//     // Index data into Elasticsearch
//     for (const product of products) {
//       await elasticClient.index({
//         index: "products",
//         id: product._id.toString(),
//         body: product.toObject(),
//       });
//     }

//     console.log("Data synchronized successfully");
//   } catch (error) {
//     console.error("Error syncing data:", error);
//   } finally {
//     await mongoose.disconnect();
//   }
// };

// // Run the synchronization
// syncData();

const mongoose = require("mongoose");
require("dotenv").config();
const elasticClient = require("../config/elasticClient.config");
const dbUri = process.env.MONGODB_URI;
const Product = require("../model/product.model");

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    const products = await Product.find();

    // console.log("products", products);
    for (const product of products) {
      const { _id, ...productData } = product.toObject(); // Exclude _id from the product data

      await elasticClient.index({
        index: "products",
        id: _id.toString(), // Use _id as the document ID
        body: productData, // Use productData as the document body
      });
    }

    console.log("Data synchronization completed");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
