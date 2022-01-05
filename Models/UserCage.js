const { model, Schema } = require('mongoose')


const UserCage = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    cage: [{ type: ObjectId, ref: 'Cage' }],
})

module.exports = model('UserCage', UserCage)