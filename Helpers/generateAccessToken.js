const { secret } = require('../Config/config')
const jwt = require('jsonwebtoken')

module.exports = generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "30m" })
}