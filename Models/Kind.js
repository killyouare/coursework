const { model, Schema, ObjectId } = require('mongoose')


const Kind = new Schema({
    name: { required: true, type: String, maxlength: 30, unique: true },
    type: { required: true, type: ObjectID, ref: 'Type' }
})

module.exports = model('Kind', Kind)