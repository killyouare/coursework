const User = require('../Models/User')
const errorExpression = require('../Expressions/error')

class UserController {

    async getUser(req, res) {
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
            console.log(e)
            return errorExpression(res, 401, 'Registration failed')
        }
    }

    async indexUsers(req, res) {
        try {
            const users = (await User.
                find())
                .filter(user => user.staff === true)
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
            console.log(e);
            return errorExpression(res, 401, 'Error')
        }
    }

    async dismissUser(req, res) {
        try {

            const { id } = req.params.id
            const user = await User.findById(id)

            user.staff = false
            user.save()

            return res.json({
                message: `${user.username} fiered`
            })
        } catch (e) {
            console.log(e)
            return errorExpression(res, 401, 'Error')
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