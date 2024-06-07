const Order = require('../model/order.model');
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_ORDER_CREATED,
  MSG_ORDERS_FETCHED,
  MSG_INTERNAL_SERVER_ERROR
} = require('../constant/errorMessage.constant');

exports.createOrder = async(req, res) => {
  try {
    const { name, address, items, totalAmount } = req.body;
    const order = new Order({
      name,
      address,
      items,
      totalAmount
    });
    await order.save();
    res.status(STATUS_CREATED).json({ message: MSG_ORDER_CREATED, order });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.fetchOrder = async(req, res) => {
  try {
    const orders = await Order.find();
    res.status(STATUS_SUCCESS).json({ message: MSG_ORDERS_FETCHED, orders });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
