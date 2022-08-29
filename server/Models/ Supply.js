const { model, Schema, ObjectId } = require('mongoose')

const Supply = new Schema({
    supply: {
        type: [
            {
                food: { type: ObjectId, required: true, ref: 'Food' },
                manufactureDate: { type: Date, required: true }
            }
        ]
    },
    date: { type: Date, required: true, default: new Date().toISOString().slice(0, 10) },
    supplier: { type: ObjectId, required: true, ref: 'Supplier' },
})

module.exports = model('Supply', Supply)