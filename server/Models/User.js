const { model, Schema } = require('mongoose')
const tokenService = require('../Service/TokenService')
const User = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: Buffer },
    roles: [{ type: String, ref: 'Role', required: true, default: 'USER' }],
    staff: { type: Boolean, required: true, default: true },
})

User.post('save', async (document, next) => {
    console.log(document)
    await tokenService.createTokenDocument(document._id)
    next()
})

module.exports = model('User', User)