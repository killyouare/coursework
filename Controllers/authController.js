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
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registering error", errors })
            }
            const { username, password } = req.body
            const candidate = await User.findOne({ username })
            if (candidate) {
                res.status(400).json({ message: 'User already exists' })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: 'USER' })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save()
            return res.status(200).json({ message: 'User successfully registered' })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration failed' });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: 'Wrong login or password' })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: 'wrong login or password' })
            }

            const token = generateAccessToken(user._id, user.roles)

            return res.json({ token })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'login failed' });
        }
    }
    async indexUsers(req, res) {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Error' })
        }
    }

    async logout(req, res) {
        try {
            console.log()

            res.json('logout');
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'login failed' });
        }
    }
}

module.exports = new authController;
