const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/userController')
const roleMiddleware = require('../Middlewares/roleMiddleware')
const User = require('../Models/User')


router.get('/all', roleMiddleware(['ADMIN']), controller.indexUsers)
router.get('/:id', roleMiddleware(['ADMIN']), [
    check('id')
        .notEmpty().withMessage('Id required')
        .custom(value => {
            return User.findById(value).then(user => {
                console.log(!user)
                if (!user || user.staff === false) {
                    return Promise.reject('User not found')
                }
            })
        })
], controller.getUser)

router.get('/:id/dismiss',
    roleMiddleware(['ADMIN']), [
    check('id')
        .notEmpty().withMessage('Id required')
        .custom(value => {
            return User.findById(value).then(user => {
                console.log(!user)
                if (!user || user.staff === false) {
                    return Promise.reject('User not found')
                }
            })
        })
], controller.dismissUser)




module.exports = router