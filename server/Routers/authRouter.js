const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const { isEmpty } = require("lodash");
const controller = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");
const errorsMiddleware = require("../Middlewares/errorsMiddleware");
const User = require("../Models/User");
const Role = require("../Models/Role");

router.post(
  "/login",
  [
    check(["password", "username"])
      .notEmpty()
      .withMessage("field are required"),
  ],
  errorsMiddleware,
  controller.login
);

router.get("/logout", authMiddleware, controller.logout);

router.post(
  "/register",
  [
    check(["name", "lastname", "username", "password", "role"])
      .notEmpty()
      .withMessage("Field are required"),
    check(["username", "password"])
      .isLength({
        min: 5,
        max: 25,
      })
      .withMessage("Field contain at least 5 and no more than 25 characters"),
    check("username").custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject("Username are exists");
        }
      });
    }),
    check("role").custom((value) =>
      Role.find({ value: value.toUpperCase() }).then((role) => {
        if (isEmpty(role)) {
          return Promise.reject("Role not exists");
        }
      })
    ),
  ],
  errorsMiddleware,
  controller.registration
);

module.exports = router;
