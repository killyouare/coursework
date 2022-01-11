const { model, Schema } = require('mongoose')


const UserCage = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    cage: [{ type: ObjectId, ref: 'Cage', unique: true }],
})

module.exports = model('UserCage', UserCage)