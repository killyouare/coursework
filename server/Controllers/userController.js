const User = require('../Models/User');

class UserController {
    async confirm(req, res, next) {
        try {
            const { id } = req.params;

            await User.findByIdAndUpdate(id, { confirm: true })

            return res.status(200).json({
                data: {
                    msg: `User ${id} confirmed`
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async get(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            return res.status(200).json({
                data: {
                    id: user._id,
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    img: user.img ? user.img : null,
                    staff: user.staff,
                    roles: user.roles,
                    confirm: user.confirm
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async index(req, res, next) {
        try {
            const users = (await User.
                find())
                .map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        lastname: item.lastname,
                        username: item.username,
                        roles: item.roles,
                        staff: item.staff,
                        confirm: item.confirm
                    }
                })
            res.json({ data: { users } })
        } catch (e) {
            next(e)
        }
    }

    async dismiss(req, res, next) {
        try {
            const { id } = req.params
            await User.findByIdAndUpdate(id, { staff: false })

            return res.status(200).json({
                data: {
                    message: `User ${id} fiered`
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async updateRoles(req, res, next) {
        try {
            const { id } = req.params
            const { roles } = req.body
            await User.findByIdAndUpdate(id, { roles: roles.map(i => i.toUpperCase()) })

            return res.status(200).json({
                data: {
                    message: `User ${id} updated`
                }
            })
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new UserController;