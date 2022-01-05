const { model, Schema } = require('mongoose')


const Kind = new Schema({
    name: { required: true, type: String, maxlength: 30 },
    type: { required: true, type: ObjectID, ref: 'Type' }
})

module.exports = model('Kind', Kind)