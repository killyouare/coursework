const User = require("../Models/User");
const bcrypt = require("bcrypt");
const UserDto = require("../Dtos/UserDto");
const { BadRequest, UnauthorizedError } = require("../Expressions/error");
const { generateTokens } = require("./TokenService");

class UserService {
  static async login(username, password) {
    const user = await User.findOne({ username });

    if (
      !user ||
      !bcrypt.compareSync(password, user.password)
    ) {
      throw BadRequest("Incorrect Email or password!");
    }

    if (
      !user.confirm
    ) {
      throw BadRequest("User not confirmed")
    }

    if (
      !user.staff
    ) {
      throw BadRequest("User fired")
    }

    return this.getTokens(user);
  }

  static getTokens(user) {
    const userDto = new UserDto(user);

    const tokens = generateTokens({ ...userDto });

    return { ...tokens };
  }

  static async checkUser(id) {

    const user = await User.findById(id)

    if (!user
      || !user.confirm
      || !user.staff
    ) {
      throw UnauthorizedError()
    }

    return user;
  }
}
module.exports = UserService;
