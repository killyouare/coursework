const { model, Schema, ObjectId } = require('mongoose')


const Feed = new Schema({
    food: { type: ObjectId, required: true, ref: 'Food' },
    dateTime: { type: Date, required: true, default: Date.now }
})

module.exports = model('Feed', Feed)