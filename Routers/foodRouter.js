const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/foodController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const authMiddleware = require('../Middlewares/authMiddleware')
router.post('/add', authMiddleware, roleMiddleware(['ADMIN']), [
    check(['name', 'fileTime'])
        .notEmpty().withMessage('Field are required'),
], errorsMiddleware, controller.addFood)
module.exports = router