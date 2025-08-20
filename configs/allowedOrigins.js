// List of allowed origins for CORS requests
const allowedOrigins = [
    "http://localhost:5173", // Local development frontend origin
]

// Export the array so it can be used in CORS middleware configuration
module.exports = allowedOrigins;
