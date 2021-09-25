const router = require("express").Router();
const Instructions = require("./instructions_model");

router.get("/all", async (req, res) => {
  try {
    const result = await Instructions.findAllInstructions();
    // console.log(result)
    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get instructions" });
  }
});

router.post("/add", async (req, res) => {
  const instructionsArray = req.body;
  console.log("array", instructionsArray);
  try {
    const result = await Instructions.handleArrayInstructions(
      "add",
      instructionsArray
    );
    console.log("/add result", result);
    if (result) {
      res.status(201).json({ message: "Success adding instructions" });
    } else {
      res.status(404).json({ message: "Bad request" });
    }
  } catch (error) {
    console.log("/add error", error);
    res.status(500).json({ message: "Error adding instructions" });
  }
});

router.put("/update", async (req, res) => {
  const instructionsArray = req.body;
  try {
    const result = await Instructions.handleArrayInstructions(
      "update",
      instructionsArray
    );
    console.log("/update result", result);
    if (result) {
      res.status(200).json({ message: "Success updating instructions" });
    } else {
      res.status(404).json({ message: "Error updating instructions" });
    }
  } catch (error) {
    console.log("/delete error", error);
    res.status(500).json({ message: "Error deleting instructions" });
  }
});

router.delete("/delete", async (req, res) => {
  const instructionsArray = req.body;
  console.log("/delete array", instructionsArray);
  try {
    const result = await Instructions.handleArrayInstructions(
      "delete",
      instructionsArray
    );
    console.log("/delete result", result);
    if (result) {
      res.status(204).json({ message: "Success deleting instructions" });
    } else {
      res.status(404).json({ message: "Error deleting instructions" });
    }
  } catch (error) {
    console.log("/delete error", error);
    res.status(500).json({ message: "Error deleting instructions" });
  }
});

module.exports = router;
