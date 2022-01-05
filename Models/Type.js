const { model, Schema } = require('mongoose')


const Type = new Schema({
    name: { required: true, type: String, unique: true, maxlength: 30 }
})

module.exports = model('Type', Type)