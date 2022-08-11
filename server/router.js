const authRouter = require("./Routers/authRouter");
const userRouter = require("./Routers/userRouter");
const supplyRouter = require("./Routers/supplyRouter");
const supplierRouter = require("./Routers/supplierRouter");
const foodRouter = require("./Routers/foodRouter");
const ApiError = require("./Expressions/error");

module.exports = (app) => {
  app.use("/", authRouter);
  app.use("/user/", userRouter);
  app.use("/supplier/", supplierRouter);
  app.use("/supply/", supplyRouter);
  app.use("/food/", foodRouter);
  app.use(function (req, res, next) {
    next(ApiError.NotFound());
  });
};
