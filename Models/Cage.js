const { model, Schema } = require('mongoose')


const Cage = new Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true }
})

module.exports = model('Cage', Cage)