const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

//routes to the home route when a get request is send and call the getTrnsactions
router.route("/").get(getTransactions).post(addTransaction);

//routes only after the route in main server like /api/v1/transactions/:id
router.route("/:id").delete(deleteTransaction);

module.exports = router;
