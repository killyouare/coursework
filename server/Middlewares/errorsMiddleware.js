const { BadRequest } = require('../Expressions/error')
const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        let errors = {};

        validationResult(req).errors.forEach(element => {
            const { msg, param } = element;

            errors.hasOwnProperty(param) ? errors[param].push(msg) : errors[param] = [msg]
        })

        if (Object.keys(errors).length) {
            throw BadRequest('Validation error', errors)
        }

        next();
    } catch (e) {
        next(e)
    }
}