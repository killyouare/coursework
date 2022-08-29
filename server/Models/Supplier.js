const { model, Schema, ObjectId } = require('mongoose')

const Supplier = new Schema({
    user: { type: ObjectId, Ref: "User", unique: true, required: true },
    organizationName: { type: String, required: true },
    address: { type: String, required: true, unique: true },
})

module.exports = model('Supplier', Supplier)