const errorExpression = require('../Expressions/error')
const { validationResult } = require('express-validator')
const { isEmpty } = require('lodash')


const errorsMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const errors = validationResult(req).errors.map(err => {
            return {
                [err.param]: err.msg
            }
        })

        if (!isEmpty(errors)) {
            throw errorExpression(res, 422, 'Validation error', errors)
        }

        next();
    } catch (e) {
        console.log(e)
    }
}

module.exports = errorsMiddleware