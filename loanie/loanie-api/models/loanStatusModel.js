const mongoose = require("mongoose");

// This table stores the history of all status changes for every loan.
// There can be multiple rows for a loadId in this table. loadId is a forgeing key
// column that refers to the unqique id of a loan in Loan model.
const LoanStatusSchema = new mongoose.Schema({
  loanId: {
    type: String,
    required: true,
  },
  currentStatus: {
    type: String,
    required: true,
  },
  startTimestamp: {
    type: String,
    required: true,
  },
  endTimestamp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("LoanStatus", LoanStatusSchema);

// {
//   type: Date,
//   // `Date.now()` returns the current unix timestamp as a number
//   default: Date.now
// }
