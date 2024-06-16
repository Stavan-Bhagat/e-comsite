const Order = require('../model/order.model');
const User = require('../model/user.model');
const socket = require('../socket');
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_ORDER_CREATED,
  MSG_ORDERS_FETCHED,
  MSG_INTERNAL_SERVER_ERROR
} = require('../constant/errorMessage.constant');

// const { io } = require('../socket');

exports.createOrder = async (req, res) => {
  try {
    const { name, address, items, totalAmount, paymentData, userId } = req.body;
    console.log('uid', userId);

    const paymentInfo = {
      ...paymentData,
      created: new Date(paymentData.created * 1000)
    };

    const order = new Order({
      name,
      address,
      items,
      totalAmount,
      paymentInfo
    });

    console.log('order', order);
    await order.save();

    const orderDetails = {
      message: 'Order created',
      order
    };

    const io = socket.getIo();

    io.to(userId).emit('orderCreated:${userId}', orderDetails);

    io.to(userId).emit('orderCreated', orderDetails);

    const admins = await User.find({ role: 'Admin' });
    console.log('admin', admins);
    admins.forEach((admin) => {
      io.to(admin._id).emit('orderCreated', orderDetails);
    });

    res.status(STATUS_CREATED).json({ message: 'Order created', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
exports.fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(STATUS_SUCCESS).json({ message: MSG_ORDERS_FETCHED, orders });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
