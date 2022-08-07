const User = require('../Models/User')
const bcrypt = require('bcrypt')
const ApiError = require('../Expressions/error')
const UserDto = require('../Dtos/UserDto')
const tokenService = require('./TokenService')
class UserService {
  async login(username, password) {
    try {
      const user = await User.findOne({ username })

      if (!user || bcrypt.compareSync(password, user.password) || user.staff === false) {
        return new ApiError.UnauthorizedError();
      }

      return this.getTokens(user);
    } catch (e) {
      console.log(e)
    }

  }
  async registration(user) {
    await User.create(user)
    await tokenService.createTokenDocument(user)
    return this.getTokens(user)
  }
  async getTokens(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {

  }
}

module.exports = new UserService;