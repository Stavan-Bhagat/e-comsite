const Cart = require('../model/cart.model');
const User = require('../model/user.model');
const {
  STATUS_BAD_REQUEST,
  STATUS_SUCCESS,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_INTERNAL_SERVER_ERROR
} = require('../constant/errorMessage.constant');
exports.fetchCart = async (req, res) => {
  const { userId } = req.query;
  console.log('ddddd', userId);
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(STATUS_BAD_REQUEST).json({ message: 'Cart not found' });
    }

    return res.status(STATUS_SUCCESS).json({ cart });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.addToCart = async (req, res) => {
  const { userId } = req.query;
  const { cartData } = req.body;
  console.log(cartData);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    } else {
      // Clear existing items if the cart is to be reset
      cart.items = [];
    }

    // Add items to cart only if they are not empty
    if (cartData && Array.isArray(cartData) && cartData.length > 0) {
      cartData.forEach((item) => {
        if (!item._id || !item.productName || !item.sellingPrice) {
          return res.status(400).json({ message: 'Cart item is missing required fields' });
        }
        cart.items.push({
          productId: item._id,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity || 1,
          sellingPrice: item.sellingPrice
        });
      });
    }

    if (cart.items.length > 0) {
      await cart.save();
      res.status(201).json({ message: 'Cart updated successfully', cart });
    } else {
      await Cart.deleteOne({ userId });
      res.status(204).json({ message: 'Cart is empty and has been removed' });
    }
  } catch (error) {
    console.error('Error adding cart data:', error.message);
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

exports.removeCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(STATUS_BAD_REQUEST).json({ message: 'Cart not found' });
    }
    return res.status(STATUS_SUCCESS).json({ message: 'Cart removed successfully' });
  } catch (error) {
    console.error('Error removing cart:', error);
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
