const { model, Schema, ObjectId } = require('mongoose')


const UserCage = new Schema({
    user: { type: ObjectId, ref: 'User', required: true, unique: true },
    cage: [{ type: ObjectId, ref: 'Cage', required: true }],
})

module.exports = model('UserCage', UserCage)