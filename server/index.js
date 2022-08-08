require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  console.log("Request:", `${req.originalUrl} ${req.method}`);
  next();
});

router(app);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    app.listen(PORT, () =>
      console.log(`server running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
