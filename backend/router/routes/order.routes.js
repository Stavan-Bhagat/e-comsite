const express = require("express");
const orderRouter = express.Router();
const { createOrder, fetchOrder } = require("../../controller/order.controller");

orderRouter.get("/fetch-order", fetchOrder);
orderRouter.post("/add-Order", createOrder);

module.exports = orderRouter;
