const bcrypt = require("bcrypt");
const TokenService = require('../Service/TokenService');
const ApiError = require('../Expressions/error');
const Role = require("../Models/Role");
const UserService = require("../Service/UserService");

class authController {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const tokens = await UserService.login(username, password)

            return res.json({ data: tokens })
        } catch (e) {
            return next(e);
        }
    }

    static async registration(req, res, next) {
        try {
            const { username, password, name, lastname, role } = req.body
            const hashPassword = await bcrypt.hash(password, 7)

            const roleModel = await Role.findOne({ value: role })

            const tokens = await User.create({ name, lastname, username, password: hashPassword, roles: [roleModel.value] })

            return res.status(200).json({
                data: tokens
            })

        } catch (e) {
            return next(e)
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body

            const { _id: id } = TokenService.checkRefresh(refreshToken)

            if (!id) {
                throw ApiError.UnauthorizedError()
            }

            const user = await UserService.checkUser(id);

            const tokens = UserService.getTokens(user)

            return res.json({ data: tokens })
        } catch (e) {
            return next(e)
        }
    }

    static async roles(req, res, next) {
        try {
            const roles = await Role.find()
            return res.json({ data: { roles } })
        } catch (e) {
            next(e)
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
