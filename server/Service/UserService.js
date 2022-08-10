const User = require("../Models/User");
const bcrypt = require("bcrypt");
const ApiError = require("../Expressions/error");
const UserDto = require("../Dtos/UserDto");
const tokenService = require("./TokenService");

class UserService {
  static async login(username, password) {
    const user = await User.findOne({ username });

    if (
      !user ||
      !bcrypt.compareSync(password, user.password) ||
      user.staff === false
    ) {
      throw ApiError.UnauthorizedError();
    }

    return this.getTokens(user);
  }

  static async registration(user) {
    user = await User.create(user);
    return this.getTokens(user);
  }

  static getTokens(user) {
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    return { ...tokens };
  }
}
module.exports = UserService;
