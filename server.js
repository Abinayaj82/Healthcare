const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const registrationRoutes = require('./routes/registration');
const chatbotRoutes = require('./routes/chatbot');

app.use('/api/register', registrationRoutes);
app.use('/api/chat', chatbotRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Healthcare Support API is running ' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
  });
