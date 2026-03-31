const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const routes = require('./routes');

const app = express();

// 1. Global Middlewares
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ crossOriginResourcePolicy: false })); // Basic security headers, crossOriginResourcePolicy disabled for local images

// Serve static uploads locally
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Restrict CORS optionally based on environment variables
app.use(cors({ origin: process.env.CLIENT_URL || '*' })); 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Dev logging
}

// 2. Base Route (Health check)
app.get('/api', (req, res) => {
  res.status(200).json({ success: true, message: 'Smart QR Notice Board API is running' });
});

app.use('/api', routes); // Mount API routes securely

// 3. Fallback logic for undefined routes
app.use(notFound);

// 4. Centralized Error Handler
app.use(errorHandler);

module.exports = app;
