const asyncHandler = require("../utils/asyncHandler");
const ApiErrorHandler = require("../utils/apiErrorHandler");
const ApiResponseHandler = require("../utils/apiResponseHandler");
const Transaction = require("../models/transaction.model");

//get transactions
const getTransaction = asyncHandler(async (req, res, next) => {
  const transactionData = await Transaction.find({
    userid: req.body.userid,
  });

  //checking if any data available
  if (!transactionData) {
    throw new ApiErrorHandler(404, "No data available");
  }

  return res.status(200).json(transactionData);
});

//add transactions
const addTransaction = asyncHandler(async (req, res, next) => {
  const { amount, category, date, description, userid } = req.body;

  //checking if any field is unfilled
  if (!amount || !category || !date || !userid) {
    throw new ApiErrorHandler(400, "All fields are required !");
  }

  //adding new transaction
  const transaction = await Transaction.create({
    amount,
    category,
    date,
    description,
    userid,
  });

  //checking if transaction is added successfully
  const addedTransaction = await Transaction.findById(transaction._id);
  if (!addedTransaction) {
    throw new ApiErrorHandler(500, "Failed to add transaction !");
  }
  return res
    .status(200)
    .json(
      new ApiResponseHandler(
        201,
        "Transaction added successfully",
        addedTransaction
      )
    );
});

//delete transactions
const deleteTransaction = asyncHandler(async (req, res, next) => {
  const { transaction_id } = req.body;

  const deletedTransaction = await Transaction.findOneAndDelete({
    _id: transaction_id,
  });
  if (!deletedTransaction) {
    throw new ApiErrorHandler(500, "Failed to delete transaction !");
  }
  return res
    .status(200)
    .json(
      new ApiResponseHandler(
        201,
        "Transaction deleted successfully !",
        deletedTransaction
      )
    );
});

//update transactions
const updateTransaction = asyncHandler(async (req, res, next) => {
  const { _id: transaction_id, payload: payload } = req.body;

  const updatedTransaction = await Transaction.findOneAndUpdate({
    _id,
    payload,
  });
  if (!updatedTransaction) {
    throw new ApiErrorHandler(500, "Failed to update transaction !");
  }
  return res
    .status(200)
    .json(
      new ApiResponseHandler(
        201,
        "Transaction updated successfully !",
        deletedTransaction
      )
    );
});

module.exports = {
  getTransaction,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
