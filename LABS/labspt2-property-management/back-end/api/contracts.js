const express = require("express");
const router = express.Router();
const db = require("../data/helper/contractsModal");

// Get all contracts
router.get("/", (req, res) => {
  db.getContracts()
    .then(contracts => res.status(200).json(contracts))
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

// Get a contract
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getContract(id)
    .then(contracts => {
      if (contracts) {
        res.status(200).json(contracts);
      } else {
        res
          .status(404)
          .json({ error: "The specified contract does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

// create contract
router.post("/", (req, res, next) => {
  const newContract = req.body;
  db.createContract(newContract)
    .then(ids => {
      db.getContract(ids[0])
        .then(newContract => {
          res.status(201).json({ newContract: newContract.id });
        })
        .catch(err => {
          console.log("error1", err);
          res.status(500).json({ error: `${err}` });
        });
    })
    .catch(err => {
      console.log("error2", err);
      next("h500", err);
    });
});

// edit contract
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const edit = req.body;

  db.editContract(id, edit)
    .then(updated => {
      if (updated) {
        res.status(200).json({
          message: "Contract updated."
        });
      } else {
        res.status(404).json({ error: "No contract found." });
      }
    })
    .catch(err => {
      next("h500", err);
    });
});

// delete contract
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.deleteContract(id)
    .then(contract => {
      if (contract) {
        res.status(202).json({ message: "Contract deleted." });
      } else {
        res
          .status(404)
          .json({ error: "The contract specified does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

module.exports = router;
