const { UnauthorizedError } = require('../Expressions/error');
const tokenService = require('../Service/TokenService');
const UserService = require('../Service/UserService');

module.exports = async function (req, res, next) {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw UnauthorizedError();
        }

        const { _id: id } = tokenService.checkAccess(accessToken);

        const user = await UserService.checkUser(id)

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};