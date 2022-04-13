
const Role = require('../Models/Role')
const { isEmpty } = require('lodash')
const errorExpression = require('../Expressions/error')
const UserService = require('../Service/UserService')
class authController {
    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const { user, refreshToken, accessToken } = await UserService.login(username, password)

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json({ data: { token: accessToken, roles: user.roles } })
        } catch (e) {
            return next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookie
            await UserService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.json({ data: { message: 'logout' } });

        } catch (e) {
            return next(e);
        }
    }

    async registration(req, res, next) {
        try {

            const { username, password, name, role, lastname } = req.body
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: role.toUpperCase() })
            const user = new User({ name, lastname, username, password: hashPassword, roles: [userRole.value] })
            await user.save()

            return res.status(201).json({
                data: {
                    id: user._id,
                    message: 'User successfully registered'
                }
            })

        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new authController;
