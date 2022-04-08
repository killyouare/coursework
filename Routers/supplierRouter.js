const Router = require('express')
const router = new Router()
const errorExpression = require('../Expressions/error')
const { check, body } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const Supplier = require('../Models/Supplier')
const { isEmpty } = require('lodash');

router.post('/add', roleMiddleware(['ADMIN']), [
    check(['name', 'address'])
        .notEmpty().withMessage(`Field are required`),
    check('suppier')
        .bail()
        .custom((value, req) =>
            Supplier.findOne({ name: req.body.name, address: req.body.address }).then(supp =>
                !isEmpty(supp) ? Promise.reject('Supplier already exists') : true
            )
        )
], errorsMiddleware, controller.addSupplier)

router.get('/all', roleMiddleware(['ADMIN']), controller.indexSuppliers)
module.exports = router