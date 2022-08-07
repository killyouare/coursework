const ApiError = require('../Expressions/error')
const { validationResult } = require('express-validator')


const errorsMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const errors = validationResult(req).formatWith(({ msg, param }) => {
            return {
                [param]: msg
            }
        })
        
        if (!errors.isEmpty()) {
            next(ApiError.BadRequest('Validation error', errors.array()))
        }

        next();
    } catch (e) {
        next(e)
    }
}

module.exports = errorsMiddleware