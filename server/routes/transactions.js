const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactions");

//routes to the home route when a get request is send and call the getTrnsactions
router.route("/:id").get(getTransactions).patch(updateTransaction);

router.route("/").post(addTransaction);

//routes only after the route in main server like /api/v1/transactions/:id
router.route("/:userId/:id").patch(deleteTransaction);

module.exports = router;
