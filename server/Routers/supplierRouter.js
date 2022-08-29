const Router = require('express')
const { check } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const { checkEmpty } = require('../Helpers/helpers')

const router = new Router()

router.post('/create', roleMiddleware(['ADMIN']), [
    checkEmpty(check(['name', 'address'])),
], errorsMiddleware,
    controller.create)

router.post('/index',
    roleMiddleware(['ADMIN']),
    controller.index)
module.exports = router