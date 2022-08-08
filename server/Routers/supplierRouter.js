const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')

router.post('/add', roleMiddleware(['ADMIN']), [
    check(['name', 'address'])
        .notEmpty().withMessage(`Field are required`),
], errorsMiddleware, controller.addSupplier)

router.get('/all', roleMiddleware(['ADMIN']), controller.indexSuppliers)
module.exports = router