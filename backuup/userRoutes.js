// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// 1. Import the new function
const { registerUser, loginUser, registerSupplier } = require('../controllers/userController.js');

// Public routes for mobile app
router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. Add the public route for dashboard registration
router.post('/register-supplier', registerSupplier);

module.exports = router;