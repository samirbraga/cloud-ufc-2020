const responses = require('./responses')['pt-br'];

module.exports = {
    handleServerError: (res, debug=false) => (err) => {
        (debug || process.env.NODE_ENV === 'development') && console.log(err);

        res.status(500).json({
            status: 'error',
            ...responses.errors.serverFailed
        });
    }
}
