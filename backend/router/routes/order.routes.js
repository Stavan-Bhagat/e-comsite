const express = require("express");
const orderRouter = express.Router();
const { createOrder, fetchOrder } = require("../../controller/order.controller");
const authentication = require("../../middleware/authentication.middleware");

orderRouter.get("/fetch-order", authentication, fetchOrder);
orderRouter.post("/add-Order", createOrder);

module.exports = orderRouter;
