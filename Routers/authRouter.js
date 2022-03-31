const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const { isEmpty } = require('lodash')
const controller = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const User = require('../Models/User')
const Role = require('../Models/Role')

router.post('/role', roleMiddleware(['ADMIN']), [
    check('role')
        .notEmpty().withMessage('Role required')
        .custom(value => {
            return Role.findOne({ value: value.toUpperCase() }).then(role => {
                if (role) {
                    return Promise.reject('Role already exists')
                }
            })
        })

], errorsMiddleware, controller.addRole)

router.post('/login', [
    check('password')
        .notEmpty()
        .withMessage('Password required'),
    check('username')
        .notEmpty()
        .withMessage('Username required')
], errorsMiddleware,
    controller.login)

router.get('/logout', authMiddleware, controller.logout)

router.post('/register', [
    check('name', 'Name is required field').notEmpty(),
    check('lastname', 'Lastname is required field').notEmpty(),
    check('username')
        .notEmpty().withMessage('Username is required field')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters')
        .custom(value => {
            return User.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject('Username must be unique')
                }

            })
        }),
    check('password')
        .notEmpty().withMessage('Password required')
        .isLength({ min: 5, max: 10 }).withMessage('Password contain at least 5 and no more than 10 characters'),
    check('role')
        .notEmpty().withMessage('Role is required field')
        .custom(value => Role.find({ value: value.toUpperCase() }).then(role => {
            if (isEmpty(role)) {
                return Promise.reject('Role not exists')
            }
        }))
], errorsMiddleware, controller.registration)

module.exports = router