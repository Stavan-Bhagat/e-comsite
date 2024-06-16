const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    items: [
      {
        productName: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        sellingPrice: {
          type: Number,
          required: true
        },
        productImage: {
          type: [String],
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    paymentInfo: {
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      paymentIntentId: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      paymentMethod: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        required: true
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
