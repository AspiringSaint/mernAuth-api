/**
 * Middleware wrapper to avoid try/catch boilerplate in async routes.
 * It catches errors and passes them to Express error handlers automatically.
 */
const asyncHandler = require('express-async-handler');

// Library for hashing passwords securely.
const bcrypt = require('bcrypt');

// Importing MongoDB models.
const User = require('../models/User');


/**
 * @description Create a new user.
 */
const createNewUser = asyncHandler (async (request, response) => {
    const { username, password } = request.body;

    // Require username and password.
    if (!username || !password) {
        return response.status(400).json({ message: 'All fields are required' });
    }

    // Check if the username already exists. 
    const existingUser = await User.findOne({ username })
        .collation({ locale: 'en', strength: 2 })
        .lean()
        .exec();

    if (existingUser) {
        return response.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password before saving with bcrypt with 10 rounds of salt.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance.
    const newUser = new User({ username, password: hashedPassword });

    // Create user in database.
    await newUser.save();

    if (newUser) {
        response.status(201).json({ message: `New user ${username} created` });
    } else {
        response.status(400).json({ message: 'Invalid user data received' });
    }
})

/**
 * @description Get all users
 */
const getAllUsers = asyncHandler (async (request, response) => {
    // Fetch all users from the database.
    const users = await User.find().select('-password').lean();

    // If no users exists, return 400
    if (!users?.length) {
        return response.status(400).json({ message: 'No users found' });
    }

    // Otherwise, return all users.
    response.status(200).json(users);
})

module.exports = {
    createNewUser,
    getAllUsers
}