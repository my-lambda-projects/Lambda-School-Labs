const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

// This table stores current status of all loans. There should always be exactly 1 row
// for a loan in this table. ClientId and loanManagerId columns are forgeing keys that refer
// to the unqique id of a user in User model.
const PhaseSchema = new mongoose.Schema({
  phaseTitle: String,
  description: {
    type: String,
  },
  phase: {
    type: String,
    require: true,
  },
});
const AssignmentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: String,
  },
  phase: {
    type: String,
    require: true,
  },
  complete: {
    type: Boolean,
    require: true,
    default: false,
  },
});
const LoanSchema = new mongoose.Schema({
  clientEmail: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
  },
  loanType: {
    type: String,
    required: true,
  },
  currentStatus: {
    type: String,
    default: "1",
    required: true,
  },
  loanManagerId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  phases: [PhaseSchema],
  assignments: [AssignmentSchema],
  openLoan: {
    type: Boolean,
    default: true,
    required: true,
  },
  label: {
    type: String,
  },
});

module.exports = mongoose.model("Loan", LoanSchema);
