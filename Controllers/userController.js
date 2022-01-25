const User = require('../Models/User')
const UserCage = require('../Models/UserCage')
const Cage = require('../Models/Cage')
const { validationResult } = require('express-validator')

class UserController {
    async addRole(req, res) {
        try {
            checkErrors(req, res)

            let { role } = req.body
            role = role.toUpperCase()

            const newRole = new Role({
                value: role
            })

            await newRole.save()
            return res.status(201).json({
                data: {
                    message: `${role} created`
                }
            })

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Fail' })
        }
    }
    async getUser(req, res) {
        try {
            const { id } = req.params.id
            const user = await User.findById(id)

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }
            return res.json({
                name: user.name,
                username: user.username,
                img: user.img ? user.img : null,
                staff: user.staff,
                roles: user.roles
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Error' })
        }
    }

    async indexUsers(req, res) {
        try {
            const users = (await User.
                find()).
                map(item => {
                    return {
                        name: item.name,
                        username: item.username,
                        roles: item.roles
                    }
                })
            res.json(users)
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Error' })
        }
    }

    async dismissUser(req, res) {
        try {
            const { id } = req.params.id
            const user = await User.findById(id)

            if (!user) {
                return res.status(400).json({ message: "User not found" })
            }

            user.staff = false
            user.save()

            return res.json({
                message: `${user.username} fiered`
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Error' })
        }

    }

    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (errors) {
                return res.status(422).json({ message: "Vadilation error", errors })
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
}


module.exports = new UserController