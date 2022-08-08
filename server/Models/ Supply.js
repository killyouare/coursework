const { model, Schema, ObjectId } = require('mongoose')


const Supply = new Schema({
    food: { type: ObjectId, required: true, ref: 'Food' },
    count: { type: Number, required: true, default: 1 },
    date: { type: Date, required: true, default: new Date().toISOString().slice(0, 10) },
    supplier: { type: ObjectId, required: true, ref: 'Supplier' },
})

module.exports = model('Supply', Supply)