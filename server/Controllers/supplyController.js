const Supplier = require('../Models/Supplier')

class SupplyController {
    async create(req, res, next) {
        try {
            const { supplier, food, count } = req.body

            return res.status(200).json({
                data: {
                    msg: "Supply created"
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async index(req, res, next) {
        try {
            const suppliers = (await Supplier.find()).map(item => {
                return {
                    name: item.name,
                    address: item.address,
                    id: item._id
                }
            })

            return res.status(200).json({ data: { suppliers } })
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new SupplyController;
