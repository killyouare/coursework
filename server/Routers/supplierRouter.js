const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const { checkEmpty } = require('../Helpers/helpers')

router.post('/add', roleMiddleware(['ADMIN']), [
    checkEmpty(check(['name', 'address'])),
], errorsMiddleware, controller.addSupplier)

router.get('/all', roleMiddleware(['ADMIN']), controller.indexSuppliers)
module.exports = router