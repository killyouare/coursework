const Router = require('express')
const router = new Router()
const errorExpression = require('../Expressions/error')
const { check, body } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const Supplier = require('../Models/Supplier')
router.post('/add', roleMiddleware(['ADMIN']), [
    check('name')
        .notEmpty().withMessage('Name are required'),
    check('address')
        .notEmpty().withMessage('Address are required'),
], controller.addSupplier)
router.get('/all', roleMiddleware(['ADMIN']), controller.indexSuppliers)
module.exports = router