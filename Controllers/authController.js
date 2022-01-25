const User = require('../Models/User')
const Role = require('../Models/Role')
const { isEmpty } = require('lodash')
const bcrypt = require('bcrypt')
const { secret } = require('../Config/config')
const jwt = require('jsonwebtoken')
const errorExpression = require('../Expressions/error')
const checkErrors = require('../Expressions/checkErrors')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async login(req, res) {
        try {
            checkErrors(req, res)

            const { username, password } = req.body

            const user = await User.findOne({ username })

            if (!user || bcrypt.compareSync(password, user.password || user.staff === false)) {
                return res.status(401).json({ message: 'Authentication failed' })
            }

            const token = generateAccessToken(user._id, user.roles)

            return res.json({ token })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'login failed' });
        }
    }

    async logout(req, res) {
        try {
            res.json('logout');
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'login failed' });
        }
    }
}

module.exports = new authController;
