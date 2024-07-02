const Order = require('../model/order.model');
const User = require('../model/user.model');
const socket = require('../socket');
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_ORDERS_FETCHED,
  MSG_INTERNAL_SERVER_ERROR
} = require('../constant/errorMessage.constant');

exports.createOrder = async (req, res) => {
  const io = socket.getIo();
  try {
    const { name, street, city, state, postalCode, items, totalAmount, paymentData, userId } =
      req.body;
    const paymentInfo = {
      ...paymentData,
      created: new Date(paymentData.created * 1000)
    };

    const order = new Order({
      name,
      street,
      city,
      state,
      postalCode,
      items,
      totalAmount,
      paymentInfo,
      user_id: userId
    });

    await order.save();

    const user = await User.findById(userId);
    const orderDetails = {
      message: 'Order created',
      order
    };
    if (user.role !== 'Admin') {
      orderDetails.userName = 'User';
      io.to(userId).emit(`orderCreated:${userId}`, orderDetails);
    }

    const admins = await User.find({ role: 'Admin' });

    admins.forEach((admin) => {
      io.to('adminRoom').emit('orderCreated', orderDetails);
    });

    res.status(STATUS_CREATED).json({ message: 'Order created', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

exports.fetchOrder = async (req, res) => {
  try {
    const { query = '', page = 1, limit = 10, user } = req.query;
    const skip = (page - 1) * limit;
    let filter = {};
    if (query.length > 0) {
      filter = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { 'items.productName': { $regex: query, $options: 'i' } }
        ]
      };
    }
    if (user.role === 'User') {
      filter.user_id = user._id;

      const orders = await Order.find(filter).skip(skip).limit(parseInt(limit));
      res.status(STATUS_SUCCESS).json({
        message: MSG_ORDERS_FETCHED,
        orders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(orders / limit)
      });
    } else {
      const orders = await Order.find(filter).skip(skip).limit(parseInt(limit));
      const totalOrders = await Order.countDocuments(filter);
      const allOrders = await Order.find();

      const productSalesCount = {};
      allOrders.forEach((order) => {
        order.items.forEach((item) => {
          if (productSalesCount[item.productName]) {
            productSalesCount[item.productName] += item.quantity;
          } else {
            productSalesCount[item.productName] = item.quantity;
          }
        });
      });

      const mostSoldProduct = Object.entries(productSalesCount).reduce(
        (max, [productName, count]) => (count > max.count ? { productName, count } : max),
        { productName: '', count: 0 }
      );

      res.status(STATUS_SUCCESS).json({
        message: MSG_ORDERS_FETCHED,
        orders,
        totalOrders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / limit),
        mostSoldProduct
      });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
