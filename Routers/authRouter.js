const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')
const roleMiddleware = require('../Middlewares/roleMiddleware')

router.post('/register', roleMiddleware(['ADMIN']), [
    check('name', 'Name is required field').notEmpty(),
    check('role', 'Role is required field').notEmpty(),
    check('username', 'Username is required field').notEmpty(),
    check('username', 'Password must contain at least 4 characters').isLength({ min: 4 }),
    check('password', 'Password is required field').notEmpty(),
    check('password', 'Password must contain at least 4 and no more than 10 characters').isLength({ min: 4, max: 10 })
], controller.registration)
router.post('/login', [
    check('username', 'Username is required field').notEmpty,
    check('password', 'Password is required field').notEmpty
], controller.login)
router.get('/logout', authMiddleware, controller.logout)
router.post('/role', roleMiddleware(['ADMIN']), controller.addRole)
module.exports = router