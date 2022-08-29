require("dotenv").config();
const express = require("express");
const router = require("./router");
const errorMiddleware = require("./Middlewares/error-middleware");
const { MONGO_URL } = require("./Config/environment")
const PORT = process.env.PORT || 5000;
const app = express();
const Connector = require("./Database/Connector")

app.use(express.json());

app.use(function (req, res, next) {
  let date = new Date();
  console.time(`Request: ${req.originalUrl} ${req.method}; Date: ${date.getTime()}; RequestTime`);
  next();
  console.timeEnd(`Request: ${req.originalUrl} ${req.method}; Date: ${date.getTime()}; RequestTime`)
});

router(app);

app.use(errorMiddleware);

(async () => {
  try {
    const dbConnector = new Connector(MONGO_URL, {})

    await dbConnector.connect()

    app.listen(PORT, () =>
      console.log(`server running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
})();


