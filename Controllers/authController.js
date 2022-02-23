const User = require('../Models/User')
const Role = require('../Models/Role')
const generateAccessToken = require('../Helpers/generateAccessToken')
const { isEmpty } = require('lodash')
const bcrypt = require('bcrypt')
const errorExpression = require('../Expressions/error')
const checkErrors = require('../Expressions/checkErrors')

class authController {
    async login(req, res) {
        try {
            checkErrors(req, res)

            const { username, password } = req.body
            const user = await User.findOne({ username })

            if (!user || bcrypt.compareSync(password, user.password) || user.staff === false) {
                return errorExpression(res, 401, 'Authentication failed')
            }

            const token = generateAccessToken(user._id, user.roles)

            return res.json({ data: { token, roles: user.roles } })
        } catch (e) {
            console.log(e);
            return errorExpression(res, 401, 'Authentication failed');
        }
    }

    async logout(req, res) {
        try {
            res.status(200).json({ data: { message: 'logout' } });

        } catch (e) {
            console.log(e);
            return errorExpression(res, 400, 'Unauthorized')
        }
    }

    async registration(req, res) {
        try {
            checkErrors(req, res)

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
            console.log(e);
            return errorExpression(res, 400, 'Registration failed')
        }
    }

    async addRole(req, res) {
        try {
            checkErrors(req, res)
            let { role } = req.body
            role = role.toUpperCase()
            const newRole = new Role({ value: role })

            await newRole.save()

            return res.status(201).json({
                data: {
                    message: `${role} created`
                }
            })

        } catch (e) {
            console.log(e)
            return errorExpression(res, 400, 'Creation failed')
        }
    }
}

module.exports = new authController;
