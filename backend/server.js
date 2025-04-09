const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth');
const dataMapRouter = require('./routes/data_map');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/erp_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.json());
app.use(authMiddleware.authenticate); // Apply OAuth to all routes

// Routes
app.use('/api/map', dataMapRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});