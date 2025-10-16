// src/middleware/errorMiddleware.js

const notFound = (req, res, next) => {
    // ... (this function stays the same)
};

const errorHandler = (err, req, res, next) => {
  // --- ADD THIS CONSOLE LOG ---
  console.error(err.stack);
  // ----------------------------

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };