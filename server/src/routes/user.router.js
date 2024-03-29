const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const authHandler = require("../middlewares/common/authHandler.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authHandler, logoutUser);

module.exports = router;
