// Loads environment variables from a .env file into process.env
require('dotenv').config();

const express = require('express'); 
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5500; // Fallback port if .env doesn't specify.

// Custom modules
const connectDB = require('./configs/dbConnections');
const errorHandler = require('./middlewares/errorMiddleware');

// Connect to MongoDB
connectDB();

// Middleware stack
app.use(express.json());

// API routes
app.use('/api/users', require('./routes/userRoute'));

// Error Handling Middleware
// This should be last so it catches any errors from above routes/middlewares
app.use(errorHandler);

// Database connection events
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});