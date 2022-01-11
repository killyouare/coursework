const { model, Schema } = require('mongoose')


const Supply = new Schema({
    food: { type: ObjectId, required: true, ref: 'Food' },
    count: { type: Number, required: true, default: 1 },
    date: { type: Date, required: true },
    supplier: { type: Number, required: true, ref: 'Supplier' },
})

module.exports = model('Supply', Supply)