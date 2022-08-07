const ApiError = require('../Expressions/error');

module.exports = function (err, req, res) {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({ error: { message: err.message, errors: err.errors } })
    }

    return res.status(500).json({ error: { message: 'Server error' } })
};
