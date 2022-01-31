const { model, Schema, ObjectId } = require('mongoose')

const AnimalCage = new Schema({
    cage: { type: ObjectId, require: true },
    animal: [{ type: ObjectId, require: true }]
})

module.exports = model('AnimalCage', AnimalCage)