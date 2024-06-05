const Order = require("../model/order.model");

exports.createOrder = async (req, res) => {
  try {
    const { name, address, items, totalAmount } = req.body;
    const order = new Order({
      name,
      address,
      items,
      totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
