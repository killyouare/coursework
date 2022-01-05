const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')
const roleMiddleware = require('../Middlewares/roleMiddleware')

router.post('/register', [
    check('username', 'Username is required field').notEmpty(),
    check('username', 'Password must contain at least 4 and no more than 10 characters').isLength({ min: 4 }),
    check('password', 'Password must contain at least 4 and no more than 10 characters').isLength({ min: 4, max: 10 })
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN'], controller.indexUsers))
router.get('/logout', authMiddleware, controller.logout)

module.exports = router