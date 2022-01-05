const { model, Schema } = require('mongoose')


const Food = new Schema({
    name: { type: String, required: true },
    lifeTime: { type: Date, required: true, min: '0-00-01', max: '5-00-01' }
})

module.exports = model('Food', Food)