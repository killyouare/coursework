const User = require("../Models/User")
const UserService = require('../Service/UserService')
const bcrypt = require("bcrypt");
const TokenService = require('../Service/TokenService');
const ApiError = require('../Expressions/error');
const { getTokens } = require('../Service/UserService');
const Role = require("../Models/Role");

class authController {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            const tokens = await UserService.login(username, password)
            return res.json({ data: tokens })
        } catch (e) {
            return next(e);
        }
    }

    static async registration(req, res, next) {
        try {
            const { username, password, name, lastname, role } = req.body
            const hashPassword = bcrypt.hashSync(password, 7)

            const roleModel = await Role.findOne({ value: role })

            User.create({ name, lastname, username, password: hashPassword, roles: [roleModel.value] })

            return res.status(200).json({
                data: {
                    message: 'User successfully registered'
                }
            })

        } catch (e) {
            return next(e)
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body

            const payload = TokenService.checkRefresh(refreshToken)

            if (!payload) {
                throw ApiError.UnauthorizedError()
            }

            const tokens = getTokens(payload)

            return res.json({ data: tokens })
        } catch (e) {
            return next(e)
        }
    }
    static async test(req, res, next) {
        try {
            const roles = (await Role.find({ value: { $not: /ADMIN/i } })).map(role => role.value)
            return res.json(["xd"])
        } catch (e) {
            next(e)
        }
    }
}

module.exports = authController;
