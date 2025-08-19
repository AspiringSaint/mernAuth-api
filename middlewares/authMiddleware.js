const jwt = require('jsonwebtoken');

const authenticate = (request, response, next) => {
    const header = request.headers.authorization || request.headers.Authorization;

    if (!header?.startsWith('Bearer ')) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    const token = header.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return response.status(403).json({ message: 'Forbidden' });
        }

        request.user = decoded.user;
        request.roles = decoded.roles;

        next();
    });
}

const authorize = (...roles) => {
    return (request, response, next) => {
        if (!request.user || !roles.includes(request.user.role)) {
            return response.status(403).json({ message: 'Forbidden: You do not have the right permissions' });
        }

        next();
    }
}

module.exports = { authenticate, authorize };