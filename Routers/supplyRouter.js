const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../Controllers/supplyController')
const roleMiddleware = require('../Middlewares/roleMiddleware')



module.exports = router