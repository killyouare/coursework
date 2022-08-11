const { UnauthorizedError } = require('../Expressions/error');
const ApiError = require('../Expressions/error');
const User = require('../Models/User');
const tokenService = require('../Service/TokenService');

module.exports = async function (req, res, next) {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const { _id: id } = tokenService.checkAccess(accessToken);

        const user = await User.findById(id)

        if (!user) {
            throw UnauthorizedError()
        }

        req.user = user;
        next();
    } catch (e) {
        return next(e);
    }
};