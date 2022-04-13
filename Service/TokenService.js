const jwt = require('jsonwebtoken')
const Token = require('../Models/Token')




class TokenService {
  checkAccess(token) {
    try {
      return jwt.verify(token, process.env.accessToken)
    } catch {
      return null
    }
  }
  checkRefresh(token) {
    try {
      return jwt.verify(token, process.env.refreshToken)
    } catch {
      return null
    }
  }
  generateTokens(model) {
    return {
      refreshToken: jwt.sign(model, process.env.refreshToken, { expiresIn: "15d" }),
      accessToken: jwt.sign(model, process.env.accessToken, { expiresIn: '30m' })
    }
  }
  async createTokenDocument(user) {
    return await Token.create({ user })
  }

  async findToken(refreshToken) {
    return await Token.findOne({ refreshToken });
  }

  async saveToken(user, refreshToken) {
    return await Token.updateOne({ user }, { refreshToken })
  }

  async removeToken(refreshToken) {
    return await Token.updateOne({ refreshToken }, { refreshToken: null })
  }
}

module.exports = new TokenService;