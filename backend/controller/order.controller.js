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

    await order.save();

    const orderDetails = {
      message: MSG_ORDER_CREATED,
      order
    };

    const io = socket.getIo();
    io.to(userId).emit('orderCreated', orderDetails);
    const admins = await User.find({ role: 'Admin' });

    admins.forEach((admin) => {
      io.to(admin._id).emit('orderCreated', orderDetails);
    });

    res.status(STATUS_CREATED).json({ message: MSG_ORDER_CREATED, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
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
