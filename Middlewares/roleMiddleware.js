module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const { roles: userRoles } = req.user;
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({ message: "User dont have access" })
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(401).json({ message: "User not authorized" })
        }
    }
};