const fs = require('fs');

let savedLoans = null;

const Loan = require('../models/loanModels.js');

const readLoans = () => {
  // cache loans after reading them once
  if (!savedLoans) {
    const contents = fs.readFileSync('loan-seed-data.json', 'utf8');
    savedLoans = JSON.parse(contents);
  }
  return savedLoans;
};

const populateLoans = () => {
  // TODO: implement this
  const loans = readLoans();
  const promises = loans.map(p => new Loan(p).save());
  return Promise.all(promises);
};

populateLoans().then(() => {
  console.log("finished adding rows.");
});

module.exports = { readLoans, populateLoans };
