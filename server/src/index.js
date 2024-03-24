const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const app = require("./app");
const DB_NAME = require("./constants");

//env config
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//database connection
(async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then(
      app.listen(process.env.PORT, () => {
        console.log(`Listening to the port ${process.env.PORT}`);
      })
    )
    .catch((err) => console.log(err));
})();
