require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./Middlewares/error-middleware");
const { MONGO_URL } = require("./environment")
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  console.log("Request:", `${req.originalUrl} ${req.method}`);

  next();
});

router(app);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () =>
      console.log(`server running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
