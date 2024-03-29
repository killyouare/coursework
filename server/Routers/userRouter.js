const Router = require('express')
const { check } = require('express-validator')
const { index, updateRoles, dismiss, get, confirm } = require('../Controllers/userController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const User = require('../Models/User')
const Role = require('../Models/Role')
const authMiddleware = require('../Middlewares/authMiddleware')
const { checkEmpty, checkObjectId } = require("../Helpers/helpers")

const router = new Router()

router.post('/all', authMiddleware, roleMiddleware(['ADMIN']), index)
router.post('/:id', authMiddleware, roleMiddleware(['ADMIN']), [
    checkObjectId(
        checkEmpty(
            check('id')
        )
    )
        .custom(value => {
            return User.findById(value).then(user => {
                if (!user) {
                    return Promise.reject('User not found')
                }
            })
        })
], errorsMiddleware, get)

router.post('/:id/confirm',
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    [
        checkObjectId(
            checkEmpty(
                check('id')
            )
        )
            .custom(value => {
                return User.findById(value).then(user => {
                    if (!user) {
                        return Promise.reject('User not found')
                    }

                    if (!user.staff) {
                        return Promise.reject('User fired')
                    }

                    if (user.confirm) {
                        return Promise.reject('User confirmed')
                    }
                })
            })
    ],
    errorsMiddleware,
    confirm
)

router.post('/:id/dismiss',
    authMiddleware,
    roleMiddleware(['ADMIN']), [
    checkObjectId(
        checkEmpty(
            check('id')
        )
    )
        .custom(value => {
            return User.findById(value).then(user => {
                if (!user) {
                    return Promise.reject('User not found')
                }

                if (!user.staff) {
                    return Promise.reject('User fired')
                }
            })
        })
],
    errorsMiddleware,
    dismiss
)

router.post('/:id/role',
    authMiddleware,
    roleMiddleware(['ADMIN']), [
    checkObjectId(
        checkEmpty(
            check('id')
        )
    )
        .custom(value => {
            return User.findById(value).then(user => {
                if (!user) {
                    return Promise.reject('User not found')
                }

                if (!user.staff) {
                    return Promise.reject('User fired')
                }
            })
        }),
    checkEmpty(check('roles'))
        .isArray()
        .bail()
        .custom(async (roles) => {
            return Role.find({ value: roles.map(i => i.toUpperCase()) }).then(queryRoles => {
                if (queryRoles.length !== roles.length) {
                    return Promise.reject(`Roles are invalid`);
                }
            })

        })
],
    errorsMiddleware,
    updateRoles)


module.exports = router