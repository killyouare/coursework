const { model, Schema, ObjectId } = require('mongoose')


const Animal = new Schema({
    kind: { type: ObjectId, required: true, ref: 'Kind' },
    name: { type: String, required: true },
    birth: { type: Date, required: true },
    sex: { type: String, required: true, enum: ['male', 'female'] },
    image: { type: Buffer },
    father: { type: ObjectId, ref: 'Animal' },
    mother: { type: ObjectId, ref: 'Animal' }
})
module.exports = model('Animal', Animal)