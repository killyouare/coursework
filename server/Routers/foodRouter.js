const Router = require('express')
const { check } = require('express-validator')
const controller = require('../Controllers/foodController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const errorsMiddleware = require('../Middlewares/errorsMiddleware')
const authMiddleware = require('../Middlewares/authMiddleware')
const { checkEmpty } = require('../Helpers/helpers')

const router = new Router()

router.post('/create',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    [
        checkEmpty(check(['name', 'manufacture'])),
        checkEmpty(check(['lifetime']))
            .isISO8601()
            .toDate(),
    ],
    errorsMiddleware,
    controller.create)

module.exports = router