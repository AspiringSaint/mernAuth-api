require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3500;

const connectDB = require('./configs/dbConnections');
const errorHandler = require('./middlewares/errorMiddleware');

connectDB();

app.use(express.json());

app.use(errorHandler);



mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});