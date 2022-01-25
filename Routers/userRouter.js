const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/userController')
const roleMiddleware = require('../Middlewares/roleMiddleware')

router.post('/role', [
    check('role')
        .exists()
        .withMessage('Role required')
        .custom(value => {
            return Role.findOne({ value: value.toUpperCase() }).then(role => {
                if (role) {
                    return Promise.reject('Role already exists')
                }
            })
        })

], controller.addRole)
router.get('/all', roleMiddleware(['ADMIN']), controller.indexUsers)
router.post('/:id/dismiss', roleMiddleware(['ADMIN']), controller.dismissUser)
router.post('/register', roleMiddleware(['ADMIN']), [
    check('name', 'Name is required field').notEmpty(),
    check('role', 'Role is required field').notEmpty(),
    check('username', 'Username is required field').notEmpty(),
    check('username', 'Password must contain at least 4 characters').isLength({ min: 4 }),
    check('password', 'Password is required field').notEmpty(),
    check('password', 'Password must contain at least 4 and no more than 10 characters').isLength({ min: 4, max: 10 })
], controller.registration)




module.exports = router