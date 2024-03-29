const express = require("express");
const router = express.Router();
const {
  getTransaction,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transaction.controller");

router.route("/get-transaction").post(getTransaction);
router.route("/add-transaction").post(addTransaction);
router.route("/delete-transaction").post(deleteTransaction);
router.route("/update-transaction").post(updateTransaction);

module.exports = router;
