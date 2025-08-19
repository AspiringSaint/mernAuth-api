const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const login = asyncHandler (async (request, response) => {
    const { username, password } = request.body;

    // Require username and password.
    if (!username || !password) {
        return response.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user exists.
    const user = await User.findOne({ username }).exec();

    if (!user || !user.active) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    // Generate a JWT token.
    const token = jwt.sign(
        {
            username: user.username,
            roles: user.roles
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '15m'
        }
    )

    // Generate a refresh token.
    const refresh = jwt.sign(
        {
            'username': user.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d'
        }
    )

    // Create a secure cookie with refresh token.
    response.cookie('jwt', refresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    response.json({ token })
})


const logout = async (request, response) => {
    const cookies = request.cookies;

    if (!cookies?.jwt) {
        return response.sendStatus(204);
    }

    // Clear the cookie.
    response.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });

    response.json({ message: 'Cookie cleared' });
}

module.exports = {
    login,
    logout
}