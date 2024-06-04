// // models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     required: true,
//   },
//   customerName: {
//     type: String,
//     required: true,
//   },
//   orderDate: {
//     type: Date,
//     required: true,
//   },
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
//     default: 'Pending',
//   },
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
// models/Order.js
// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        sellingPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); 

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
