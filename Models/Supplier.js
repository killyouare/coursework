const { model, Schema } = require('mongoose')


const Supplier = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
})

module.exports = model('Supplier', Supplier)