const { isEmpty } = require('lodash')
const errorExpression = require('../Expressions/error')
const Supplier = require('../Models/Supplier')

class supplyController {
    async addSupplier(req, res) {
        try {

            const { name, address } = req.body
            const checkSupplier = await Supplier.find({ name: name, address: address })

            if (!isEmpty(checkSupplier)) {
                return errorExpression(res, 400, 'Supplier already exists')
            }

            const supplier = await Supplier.create({ name, address })
            supplier.save()

            return res.status(200).json({ data: { message: 'Supplier created' } })
        } catch (e) {
            console.log(e)
            return errorExpression(res, 401, 'Error')
        }
    }

    async addSupply(req, res) {
        try {
            checkErrors(req, res)

            const { supplier, food, count } = req.body


        } catch (e) {
            console.log(e)
            return errorExpression(res, 401, 'Error')
        }
    }

    async indexSuppliers(req, res) {
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
            console.log(e)
            return errorExpression(res, 401, 'Error')
        }
    }

}

module.exports = new supplyController;
