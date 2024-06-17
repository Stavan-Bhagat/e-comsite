const Cart = require('../model/cart.model');
const User = require('../model/user.model');
exports.fetchCart = async (req, res) => {
  const { userId } = req.params;

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

  console.log('Adding to cart for user', userId, cartData);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (cart) {
      console.log('Existing cart found:', cart);

      cartData.forEach((item) => {
        if (item.productName && item.sellingPrice) {
          cart.items.push({
            productId: item._id,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity || 1,
            sellingPrice: item.sellingPrice
          });
        }
      });

      await cart.save();
    } else {
      console.log('No existing cart, creating new one.');
      cart = new Cart({
        userId,
        items: cartData.map((item) => ({
          productId: item._id,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity || 1,
          sellingPrice: item.sellingPrice
        }))
      });

      await cart.save();
    }

    return res.status(201).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error adding cart data:', error);
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
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
