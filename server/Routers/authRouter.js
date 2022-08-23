const Router = require("express");
const { check } = require("express-validator");
const authController = require("../Controllers/authController");
const errorsMiddleware = require("../Middlewares/errorsMiddleware");
const User = require("../Models/User");
const Role = require("../Models/Role");
const { checkEmpty } = require("../Helpers/helpers");
const authMiddleware = require("../Middlewares/authMiddleware");
const roleMiddleware = require("../Middlewares/roleMiddleware");

const router = new Router();

router.post(
  "/login",
  [
    checkEmpty(check(["password", "username"])).isString(),
  ],
  errorsMiddleware,
  authController.login
);

router.post(
  "/register",
  [
    checkEmpty(check(["name", "lastname", "username", "password", "role"])).isString(),
    check(["username", "password"])
      .isLength({
        min: 5,
        max: 25,
      })
      .withMessage("Field contain at least 5 and no more than 25 characters"),
    check("username")
      .custom(value => {
        return User.findOne({ username: value }).then(user => {
          if (user) {
            return Promise.reject("Field are exists");
          }
        })
      }),
    check("role").custom(async (value) => {
      if (
        !(await Role.find({ value: { $not: /ADMIN/i } }))
          .map(role => role.value)
          .includes(value)
      ) {
        return Promise.reject("Field not exists")
      }
    })
  ],
  errorsMiddleware,
  authController.registration
);

router.post(
  "/refreshToken",
  [
    checkEmpty(check("refreshToken"))
  ],
  errorsMiddleware,
  authController.refreshToken
);

router.post(
  "/test",
  authController.test
)

router.post(
  "/roles",
  authMiddleware,
  roleMiddleware("ADMIN"),
  authController.roles
)

module.exports = router;
