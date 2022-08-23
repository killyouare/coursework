const { model, Schema } = require('mongoose')
const bcrypt = require("bcrypt")

const User = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: Buffer },
    roles: {
        type: [String], required: true
    },
    staff: { type: Boolean, required: true, default: true },
    confirm: { type: Boolean, default: false }
})

const user = model('User', User)

user.create({ name: "admin", lastname: "admin", username: "admin", password: bcrypt.hashSync("admin", 7), confirm: true, roles: "ADMIN" }, () => console.log())
user.create({ name: "supplier", lastname: "supplier", username: "supplier", password: bcrypt.hashSync("supplier", 7), confirm: true, roles: "SUPPLIER" }, () => console.log())

module.exports = user