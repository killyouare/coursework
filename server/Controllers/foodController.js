const { isEmpty } = require('lodash')
const errorExpression = require('../Expressions/error')
const Food = require('../Models/Food')
class supplyController {
    async addFood(req, res, next) {
        try {
            const { name, lifeTime } = req.body
            return res.status(201).json({ data: { name, lifeTime } })

        } catch (e) {
            next(e)
        }
    }

}

module.exports = new supplyController;
