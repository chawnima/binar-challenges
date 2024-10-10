require("dotenv").config();
require("express-async-errors");
const express = require("express");
const router = require("./src/routes");
const {
  errorHandler,
  notFoundURLHandler,
} = require("./src/middlewares/errors");
const fileUpload = require("express-fileupload");

const app = express();
const port = 3000;
app.use(express.json());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "ping successfully" });
});

app.use("/", router);

app.use("*", notFoundURLHandler);
app.use(errorHandler);

//port listener
app.listen(port, () => {
  console.log(`app listening into port ${port}`);
});
