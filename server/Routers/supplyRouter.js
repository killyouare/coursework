const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')

router.post('/add', roleMiddleware(['ADMIN']), [
  check(['supplier', 'count', 'food'])
    .notEmpty().withMessage("Field are required")
], errorsMiddleware, controller.addSupply)

module.exports = router