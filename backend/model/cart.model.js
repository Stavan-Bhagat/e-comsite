const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      productName: { type: String, required: true },
      productImage: { type: [String], required: true },
      quantity: { type: Number, required: true, default: 1 },
      sellingPrice: { type: Number, required: true }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
