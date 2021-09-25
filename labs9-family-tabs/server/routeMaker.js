const express = require("express");

const routeMaker = (resource, requiredSchema, db, string) => {
  const route = express.Router();
  route.get("/", async (req, res) => {
    try {
      const items = await db(resource);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).send(`Server error. ${string} could not be found.`);
    }
  });

  if (resource !== "family") {
    route.get("/byfamily/:familyID", async (req, res) => {
      const { familyID } = req.params;
      try {
        const familyItems = await db(resource).where({familyID})
        res.status(200).json(familyItems)
      } catch (err) {
        res
          .status(500)
          .send(`Server error. Could not find ${string}s for family.`);
      }
    });
  }
  route.post("/create", async (req, res) => {
    const body = req.body;
    if (!requiredSchema.every(schema => body[schema])) {
      return res.status(400).json({
        error: "Please Provide all required fields."
      });
    }
    
    try {
      let id = await db(resource).insert(body);
      id = id[0];
      const event = await db(resource).where({ id });
      res.status(201).json(event);
    } catch (err) {
      console.log("this is running")
      res.status(500).json({ error: `could not add ${string}` });
    }
  });

  route.put("/edit/:id", async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    try {
      const count = await db(resource)
        .where({ id })
        .update(body);
      if (!count) {
        res
          .status(400)
          .json({ error: `${string} was not successfully changed.` });
      }
      const itemUpdated = await db(resource).where({ id });
      res.status(201).json({ updated: itemUpdated });
    } catch (err) {
      res.status(500).json({ error: `${string} could not be edited.` });
    }
  });

  route.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const count = await db(resource)
        .where({ id })
        .del();
      if (!count) {
        res
          .status(400)
          .json({ error: `${string} was not successfully removed.` });
      }
      res.status(200).json({ message: `${string} deleted` });
    } catch (err) {
      res.status(500).json({ error: `${string} could not be removed.` });
    }
  });

  return route;
};

module.exports = routeMaker;
