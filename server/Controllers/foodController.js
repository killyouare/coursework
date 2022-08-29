const { isEmpty } = require('lodash')
const Food = require('../Models/Food')
class supplyController {
    static async create(req, res, next) {
        try {
            const { name, manufacture, lifeTime } = req.body

            await Food.create(name, manufacture, lifeTime)
            return res.status(201).json({ data: { name, lifeTime } })
        } catch (e) {
            next(e)
        }
    }

}

module.exports = supplyController;
