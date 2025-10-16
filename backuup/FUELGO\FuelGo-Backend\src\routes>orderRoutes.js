// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
// 1. Import the new function
const { createOrder, getPendingOrders, acceptOrder } = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/', protect, createOrder);
router.get('/pending', protect, getPendingOrders);

// 2. Add the new route for accepting an order
router.put('/:id/accept', protect, acceptOrder);

module.exports = router;
