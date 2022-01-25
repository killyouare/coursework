const errorExpression = require('./error')
const { validationResult } = require('express-validator')
const { isEmpty } = require('lodash')


const checkErrors = (req, res) => {
    const errors = validationResult(req).errors.map(err => {
        return {
            [err.param]: err.msg
        }
    })

    if (!isEmpty(errors)) {
        return errorExpression(res, 422, 'Validation error', errors)
    }

}

module.exports = checkErrors