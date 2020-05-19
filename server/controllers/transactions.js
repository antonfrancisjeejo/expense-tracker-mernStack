const Transaction = require("../models/Transaction");

//used to get all the transactions
//Get request and uses the route /api/v1/transactions

exports.getTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//used to add a transaction
//Post request and uses the route /api/v1/transactions

exports.addTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};

//used to get all the transactions
//Delete request and uses the route /api/v1/transactions/:id

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.updateOne(
      { _id: req.params.userId },
      { $pull: { transactions: { _id: req.params.id } } }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.updateOne(
      { _id: req.params.id },
      { $push: { transactions: req.body } }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
