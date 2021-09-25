const router = require("express").Router();
const Logs = require("../logs/logs_model");

router.get("/all", async (req, res) => {
  try {
    const allLogs = await Logs.findAll();
    if (allLogs) {
      res.status(200).json(allLogs);
    } else {
      res.status(404).json({ message: "Could not find logs" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get logs" });
    console.log("error", error);
  }
});

router.get("/:userString", async (req, res) => {
  const { userString } = req.params;
  try {
    let logs = await Logs.findByUser(userString);
    if (logs.length != 0) {
      res.status(200).json(logs);
    } else {
      res.status(404).json({ message: "Could not find logs for this user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get logs" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const logResult = await Logs.add(req.body);
    if (logResult) {
      res.status(201).json({ message: "Log successfully added" });
    } else {
      res.status(404).json({ message: "Unable to add log" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add log" });
    console.log("error", error);
  }
});

router.put("/:log_id", async (req, res) => {
  const { log_id } = req.params;
  const changes = req.body;
  try {
    const logResult = await Logs.update(log_id, changes);
    if (logResult) {
      res.status(200).json({ message: "Log successfully updated" });
    } else {
      res.status(404).json({ message: "Unable to update log" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update log" });
    console.log("error", error);
  }
});

router.delete("/:log_id", async(req, res)=> {
    const {log_id} = req.params
    try{
        const deleted = Logs.remove(log_id)
        if(deleted) {
            res.status(204).json({message: "Log successfully deleted"})
        } else {
            res.status(404).json({message: "Unable to delete log"})
        }
    } catch(error) {
        console.log("error", error)
        res.status(500).json({message: "Failed to delete log"})
    }
})

module.exports = router