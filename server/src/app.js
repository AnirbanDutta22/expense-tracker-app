const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const defaultErrorHandler = require("./middlewares/common/defaultErrorHandler");
const userRouter = require("./routes/user.router");

//express app
const app = express();

//cors setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//set static folder
app.use(express.static(path.resolve(__dirname, "./public")));

//routes
app.use("/api/v1/user", userRouter);

//default error handler
app.use(defaultErrorHandler);

module.exports = app;
