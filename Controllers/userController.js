const User = require('../Models/User')
const UserCage = require('../Models/UserCage')
const Cage = require('../Models/Cage')
const { validationResult } = require('express-validator')

class UserController {
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
                staff: user.staff
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
}


module.exports = new UserController