const Loan = require("../models/loanModels");

const loanCreate = (req, res) => {
  const {
    clientEmail, loanManagerId, amount, loanType, assignments, phases, label,
  } = req.body;

  const newLoan = new Loan({
    clientEmail,
    loanManagerId,
    amount,
    loanType,
    assignments,
    label,
    phases,
  });
  newLoan.save(newLoan, (err, savedloan) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(savedloan);
  });
};

const loansGetAll = (req, res) => {
  Loan.find({})
    .then((loans) => {
      res.status(200).json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByClientEmail = (req, res) => {
  const { clientEmail } = req.body;
  Loan.find({ clientEmail })
    .then((loans) => {
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByManagerId = (req, res) => {
  const { loanManagerId } = req.body;
  Loan.find({ loanManagerId })
    .then((loans) => {
      res.status(200).json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loanGetById = (req, res) => {
  // console.log(req);
  const { id } = req.params;
  Loan.findById(id)
    .then((singleLoan) => {
      if (singleLoan === null) throw new Error();
      res.status(200).json(singleLoan);
    })
    .catch(err => res.status(422).json(err));
};

const loanEdit = (req, res) => {
  const setObj = {};
  if (req.body.currentStatus !== undefined) {
    setObj.currentStatus = req.body.currentStatus;
  }
  if (req.body.openLoan !== undefined) {
    setObj.openLoan = req.body.openLoan;
  }
  if (req.body.loanType !== undefined) {
    setObj.loanType = req.body.loanType;
  }
  if (req.body.amount !== undefined) {
    setObj.amount = req.body.amount;
  }
  if (req.body.label !== undefined) {
    setObj.label = req.body.label;
  }
  // find a single Loan
  // edit loan details
  // save Loan
  const { id } = req.params;
  Loan.updateOne(
    { _id: id },
    {
      $set: setObj,
    },
    (err, savedloan) => {
      if (err) {
        res.status(500).json(err);
      }
      res.json(savedloan);
    },
  ).catch(err => res.status(422).json({ error: "No Loan!", err }));
};

// find by loan id and add new assignment to array
const loanCreateAssignment = (req, res) => {
  const { loanId, assignments } = req.body;
  // find a single Loan
  // create loan assignment
  // save Loan
  Loan.findByIdAndUpdate(
    loanId,
    { $push: { assignments } },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

// find by loan id and add edit assignment in array
const loanEditAssignment = (req, res) => {
  const {
    loanId, assignmentId, text, phase, complete,
  } = req.body;
  // find a single Loan
  // edit loan assignment
  Loan.updateOne(
    { _id: loanId, "assignments._id": assignmentId },
    {
      $set: {
        "assignments.$.text": text,
        "assignments.$.phase": phase,
        "assignments.$.complete": complete,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

const loanCompleteAssignment = (req, res) => {
  const { loanId, assignmentId, complete } = req.body;
  // find a single Loan
  // edit loan assignment
  Loan.updateOne(
    { _id: loanId, "assignments._id": assignmentId },
    {
      $set: {
        "assignments.$.complete": complete,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

const loanSaveAssignments = (req, res) => {
  console.log("loan assignment completed");
  const { loanId, assignments } = req.body;
  console.log(loanId, assignments);
  // find a single Loan
  // edit loan assignment
  Loan.updateOne(
    { _id: loanId },
    {
      $set: {
        assignments,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        console.log("loan assignments updated successfully!");
        res.status(200).json(doc);
      }
    },
  );
};

// find by loan id and remove item in array
const loanDeleteAssignment = (req, res) => {
  const { loanId, assignmentId } = req.body;
  // find a single Loan
  // delete loan assignment
  Loan.findByIdAndUpdate(
    loanId,
    { $pull: { assignments: { _id: assignmentId } } },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

const loanDelete = (req, res) => {
  // find a single Loan
  // delete loan
  const { id } = req.params;
  Loan.findByIdAndRemove(id)
    .then((loan) => {
      if (loan === null) throw new Error();
      Loan.save(loan, (err, savedloan) => {
        if (err) {
          res.status(500).json(err);
          return savedloan;
        }
        return res.json("Loan has been completely deleted!");
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!", err }));
};

const loanEditPhase = (req, res) => {
  const {
    loanId, phaseId, phaseTitle, description,
  } = req.body;
  // find a single Loan
  // edit loan phase
  Loan.updateOne(
    { _id: loanId, "phases._id": phaseId },
    {
      $set: {
        "phases.$.phaseTitle": phaseTitle,
        "phases.$.description": description,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

module.exports = {
  loanCreate,
  loansGetAll,
  loanGetById,
  loanEdit,
  loanDelete,
  loansGetAllByClientEmail,
  loansGetAllByManagerId,
  loanEditAssignment,
  loanDeleteAssignment,
  loanCreateAssignment,
  loanCompleteAssignment,
  loanSaveAssignments,
  loanEditPhase,
};
