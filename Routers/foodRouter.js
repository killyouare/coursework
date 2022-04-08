const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/foodController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')

router.post('/add', roleMiddleware(['ADMIN']), [
    check(['name', 'fileTime'])
        .notEmpty().withMessage('Field are required'),
], errorsMiddleware, controller.addFood)
module.exports = router