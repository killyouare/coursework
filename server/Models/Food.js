const { model, Schema } = require('mongoose')


const Food = new Schema({
    name: { type: String, required: true, unique: true },
    manufacture: { type: String, required: true },
    lifeTime: { type: Date, required: true, min: '0-00-01', max: '5-00-00' }
})

module.exports = model('Food', Food)