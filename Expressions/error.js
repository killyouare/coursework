const { isEmpty } = require('lodash')

const errorExpression = (res, code = 422, message = 'validation error', errors = []) => {
    const data = {
        error: {
            code: code,
            message: message,
        }
    };
    if (!isEmpty(errors)) {
        data['error']['errors'] = errors;
    }

    return res.status(code).send(data);
}

module.exports = errorExpression