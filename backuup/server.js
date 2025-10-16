// server.js
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require("socket.io");
const connectDB = require('./src/config/db.js');
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware.js');

const userRoutes = require('./src/routes/userRoutes.js');
const orderRoutes = require('./src/routes/orderRoutes.js');

// --- Initial Setup ---
dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;

// --- WebSocket Logic ---
io.on('connection', (socket) => {
  console.log('🔌 A user connected via WebSocket:', socket.id);
  socket.on('disconnect', () => {
    console.log('👋 User disconnected from WebSocket');
  });
});

// --- Middleware ---
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// --- API Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FuelGo API! 🚀' });
});
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// --- Custom Error Handling ---
app.use(notFound);
app.use(errorHandler);

// --- Start Server ---
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});