const User = require('../Models/User')
const Role = require('../Models/Role')
const bcrypt = require('bcrypt')
const { secret } = require('../Config/config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async addRole(req, res) {
        try {
            const errors = validationResult(req)

            if (errors) {
                return res.status(400).json({ message: "Vadilation error", errors })
            }

            let { role } = req.body
            role = role.toUpperCase()
            const existRole = await Role.findOne({
                value: role
            })

            if (existRole) {
                res.status(400).json({ message: 'Role already exists' })
            }

            const newRole = new Role({
                value: role
            })

            await newRole.save()
            return res.status(200).json(`${role} created`)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Fail' })
        }
    }
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (errors) {
                return res.status(400).json({ message: "Vadilation error", errors })
            }

            const { username, password, name, role } = req.body
            const candidate = await User.findOne({ username })

            if (candidate) {
                res.status(400).json({ message: 'User already exists' })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: role.toUpperCase() })

            if (!userRole) {
                res.status(400).json({ message: 'Role does not exist' })
            }

            const user = new User({ name, username, password: hashPassword, roles: [userRole.value] })

            await user.save()


            return res.status(201).json({ message: 'User successfully registered' })

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration failed' });
        }
    }
    async login(req, res) {
        try {
            const errors = validationResult(req)

            if (errors) {
                return res.status(400).json({ message: "Vadilation error", errors })
            }

            const { username, password } = req.body
            const user = await User.findOne({ username })

            if (!user) {
                return res.status(400).json({ message: 'Wrong login or password' })
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({ message: 'Wrong login or password' })
            }

            if (user.staff === false) {
                return res.status(400).json({ message: 'User fired' })
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
