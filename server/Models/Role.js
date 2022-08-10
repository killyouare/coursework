const { model, Schema } = require('mongoose')

const Role = new Schema({
    value: { type: String, unique: true },
})
const role = model('Role', Role)

role.create({ value: "admin".toUpperCase() }, () => console.log())
role.create({ value: "supplier".toUpperCase() }, () => console.log())

module.exports = role