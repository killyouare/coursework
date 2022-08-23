const { ForbiddenError } = require("../Expressions/error");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const { roles: userRoles } = req.user;

            const filter = userRoles.filter(role => roles.includes(role))

            if (!filter.length) {
                throw ForbiddenError()
            }

            next();
        } catch (e) {
            next(e)
        }
    }
};