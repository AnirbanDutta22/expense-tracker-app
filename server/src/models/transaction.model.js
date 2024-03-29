const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User not found"],
    },
    amount: {
      type: Number,
      required: [true, "Enter amount"],
    },
    category: {
      type: String,
      required: [true, "Enter category"],
    },
    date: {
      type: Date,
      required: [true, "Enter transaction date"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
