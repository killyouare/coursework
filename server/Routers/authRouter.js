const Router = require("express");
const { check } = require("express-validator");
const authController = require("../Controllers/authController");
const errorsMiddleware = require("../Middlewares/errorsMiddleware");
const User = require("../Models/User");
const Role = require("../Models/Role");
const { checkEmpty } = require("../Helpers/helpers")

const router = new Router();

router.post(
  "/login",
  [
    checkEmpty(check(["password", "username"])),
  ],
  errorsMiddleware,
  authController.login
);

router.post(
  "/register",
  [
    checkEmpty(check(["name", "lastname", "username", "password"])),
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

module.exports = router;
