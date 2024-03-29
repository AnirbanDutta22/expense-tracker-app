const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const defaultErrorHandler = require("./middlewares/common/defaultErrorHandler");
const userRouter = require("./routes/user.router");
const transactionRouter = require("./routes/transaction.router");

//express app
const app = express();

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//cors setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//set static folder
app.use(express.static(path.resolve(__dirname, "./public")));

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/dashboard", transactionRouter);

//default error handler
app.use(defaultErrorHandler);

module.exports = app;
