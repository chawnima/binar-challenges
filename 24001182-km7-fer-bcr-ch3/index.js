const express = require("express");
const { z } = require("zod");
const carsData = require("./cars.json");
const router = require("./src/routes");
const { errorHandler } = require("./src/middlewares/errors");
require("express-async-errors");

const app = express();
const port = 3000;

app.use(express.json());

//app
app.get("/", (req, res) => {
  res.status(200).json({ message: "ping successfully" });
});

//get all cars data
app.use("/", router);

//error handler
app.use(errorHandler);
//port listener
app.listen(port, () => {
  console.log(`app listening into port ${port}`);
});
