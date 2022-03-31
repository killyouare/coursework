const { isEmpty } = require('lodash')
const errorExpression = require('../Expressions/error')
const Food = require('../Models/Food')
class supplyController {
    async addFood(req, res) {
        try {
            const { name, lifeTime } = req.body
            return res.status(201).json({ data: { name, lifeTime } })

        } catch (e) {
            console.log(e)
            return errorExpression(res, 401, 'Error')
        }
    }

}

module.exports = new supplyController;
