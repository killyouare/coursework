const { model, Schema } = require('mongoose')

const AnimalCage = new Schema({
    cage: { type: ObjectId, require: true },
    animal: { type: ObjectId, require: true }
})