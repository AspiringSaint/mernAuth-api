const errorHandler = (error, request, response, next) => {
    console.log(error.stack);

    const status = error.statusCode ? error.statusCode : 500;

    response.status(status).json(
        {
            message: error.message || 'Internal Server Error',
            isError: true
        }
    )
}

module.exports = errorHandler;