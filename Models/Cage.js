const { model, Schema } = require('mongoose')


const Cage = new Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    users: [
        Schema.ObjectId
    ],
    animals: [
        { type: Schema.ObjectId, required: false }
    ]
})

module.exports = model('Cage', Cage)