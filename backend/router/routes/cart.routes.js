const express = require('express');
const { fetchCart, addToCart, removeCart } = require('../../controller/cart.controller');
const authentication = require('../../middleware/authentication.middleware');

const cartRouter = express.Router();

cartRouter.get('/fetch-cart', authentication, fetchCart);
cartRouter.post('/add-to-cart', addToCart);
cartRouter.delete('/remove-cart', authentication, removeCart);

module.exports = cartRouter;
