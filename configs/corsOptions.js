const allowedOrigins = require('./allowedOrigins'); // Import list of allowed origins

const corsOptions = {
    origin: (origin, callback) => {
        // Allow request if origin is in the allowed list or if origin is undefined (e.g., from tools like Postman or curl)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true,                          // Allow credentials (cookies, authorization headers, TLS client certificates)
    optionsSuccessStatus: 200                   // Return 200 instead of 204 for preflight OPTIONS request (some legacy browsers choke on 204)
}

module.exports = corsOptions; // Export for use in your Express app
