const { model, Schema } = require('mongoose')


const User = new Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: Buffer },
    roles: [{ type: String, ref: 'Role', required: true, default: 'USER' }],
    staff: { type: Boolean, required: true, default: true },
})

module.exports = model('User', User)