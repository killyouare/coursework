const Supplier = require("../Models/Supplier");

class SupplierController {
    async create(req, res, next) {
        try {
            const { name, address, user } = req.body

            await Supplier.create({ name, address, user })

            return res.status(200).json({ data: { message: 'Supplier created' } })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new SupplierController;
