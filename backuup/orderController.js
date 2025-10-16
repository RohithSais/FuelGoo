// src/controllers/orderController.js
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order.js');

const createOrder = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;

  const order = new Order({
    user: req.user._id, // The error is likely here
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  });

  const createdOrder = await order.save();
  req.io.emit('new_order', createdOrder);
  res.status(201).json(createdOrder);
});

const getPendingOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: 'Pending' }).populate('user', 'name');
  res.json(orders);
});

const acceptOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = 'Accepted';
    const updatedOrder = await order.save();
    req.io.emit('order_accepted', updatedOrder);
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = { createOrder, getPendingOrders, acceptOrder };