const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN, ACCESS_TOKEN } = require("../environment")

class TokenService {
  static checkAccess(token) {
    try {
      return jwt.verify(token, ACCESS_TOKEN);
    } catch {
      return null
    }
  }

  static checkRefresh(token) {
    try {
      return jwt.verify(token, REFRESH_TOKEN);
    } catch {
      return null
    }
  }

  static generateTokens(model) {
    return {
      refreshToken: jwt.sign(model, REFRESH_TOKEN, {
        expiresIn: "15d",
      }),
      accessToken: jwt.sign(model, ACCESS_TOKEN, {
        expiresIn: "5s",
      }),
    };
  }
};
module.exports = TokenService;
