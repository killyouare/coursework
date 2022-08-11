const User = require('../Models/User')
const errorExpression = require('../Expressions/error')

class UserController {

    async getUser(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            return res.json({
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                img: user.img ? user.img : null,
                staff: user.staff,
                roles: user.roles
            })
        } catch (e) {
            next(e)
        }
    }

    async indexUsers(req, res, next) {
        try {
            const users = (await User.
                find())
                .map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        lastname: item.lastname,
                        username: item.username,
                        roles: item.roles
                    }
                })
            res.json({ data: { users } })
        } catch (e) {
            next(e)
        }
    }

    async dismissUser(req, res, next) {
        try {
            const { id } = req.params.id
            const user = await User.findOneByIdAndUpdate(id, { staff: false })

            return res.json({
                message: `${user.username} fiered`
            })
        } catch (e) {
            next(e)
        }

    }
    async updateRole(req, res) {
        try {

            const { id, roles } = req.body

            return res.json({
                data: {
                    message: 'da'
                }
            })
        } catch (e) {
            console.log(e)
            return errorExpression(res, 401, 'Error')
        }

    }

}


module.exports = new UserController;