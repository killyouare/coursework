const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const Role = require('../Models/Role')

router.post('/login', [
    check('password')
        .exists()
        .withMessage('Password required'),
    check('login')
        .exists()
        .withMessage('Login required')],
    controller.login)
router.get('/logout', authMiddleware, controller.logout)

module.exports = router