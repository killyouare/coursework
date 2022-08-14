const Router = require('express')
const { param, check } = require('express-validator')
const { indexUsers, updateRole, dismissUser, getUser } = require('../Controllers/userController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const User = require('../Models/User')
const Role = require('../Models/Role')
const authMiddleware = require('../Middlewares/authMiddleware')
const { checkEmpty } = require("../Helpers/helpers")

const router = new Router()

router.get('/all', authMiddleware, roleMiddleware(['ADMIN']), indexUsers)
router.get('/:id', authMiddleware, roleMiddleware(['ADMIN']), [
    param('id')
        .custom(value => {
            return User.findById(value).then(user => {
                if (!user) {
                    return Promise.reject('User not found')
                }
            })
        })
], errorsMiddleware, getUser)

router.get('/:id/dismiss',
    authMiddleware,
    roleMiddleware(['ADMIN']), [
    checkEmpty(check('id'))
        .custom(value => {
            return User.findById(value).then(user => {
                console.log(!user)
                if (!user || user.staff === false) {
                    return Promise.reject('User not found')
                }
            })
        })
], errorsMiddleware, dismissUser)

router.post('/role',
    roleMiddleware(['ADMIN'], [
        checkEmpty(check('roles'))
            .isArray()
            .bail()
            .custom(roles => {
                roles.forEach(role => {
                    Role.find({ value: role.toUpperCase() }).then(role => {
                        if (!role) {
                            return Promise.reject('Role not found')
                        }
                    })
                })
            })
    ], errorsMiddleware, updateRole))


module.exports = router