const { model, Schema } = require('mongoose')


const Medical = new Schema({
    animal: { type: ObjectId, required: true, ref: 'Animal' },
    date: { type: Date, required: true },
})

module.exports = model('Medical', Medical)