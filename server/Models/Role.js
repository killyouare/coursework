const { model, Schema } = require('mongoose')

const Role = new Schema({
    value: { type: String, unique: true, default: 'USER' },
})
const role = model('Role', Role)
module.exports = role