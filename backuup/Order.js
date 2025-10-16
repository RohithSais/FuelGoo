// src/models/Order.js
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This links the order to a specific user
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Accepted', 'On The Way', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// This allows us to efficiently query locations
orderSchema.index({ location: '2dsphere' }); 

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;