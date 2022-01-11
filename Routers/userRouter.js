const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/userController')
const roleMiddleware = require('../Middlewares/roleMiddleware')

router.get('/all', roleMiddleware(['ADMIN']), controller.indexUsers)
router.post('/:id/dismiss', roleMiddleware(['ADMIN']), controller.dismissUser)





module.exports = router