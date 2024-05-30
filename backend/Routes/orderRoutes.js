const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/fetch-order", orderController.fetchOrder);
router.post(
  "/add-Order",

  orderController.createOrder
);
