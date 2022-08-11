const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN, ACCESS_TOKEN } = require("../environment");

class TokenService {
  static checkAccess(token) {
    return jwt.verify(token, ACCESS_TOKEN);
  }

  static checkRefresh(token) {
    return jwt.verify(token, REFRESH_TOKEN);
  }

  static generateTokens(model) {
    return {
      refreshToken: jwt.sign(model, REFRESH_TOKEN, {
        expiresIn: "15d",
      }),
      accessToken: jwt.sign(model, ACCESS_TOKEN, {
        expiresIn: "15m",
      }),
    };
  }
};
module.exports = TokenService;
