const Router = require('express')
const { check } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const { checkEmpty } = require('../Helpers/helpers')

const router = new Router()

router.post('/create', roleMiddleware(['SUPPLIER']), [
  checkEmpty(check(['supplier', 'food']))
],
  errorsMiddleware,
  controller.create
)

router.get('/index',
  roleMiddleware(['ADMIN']),
  controller.index
)

module.exports = router