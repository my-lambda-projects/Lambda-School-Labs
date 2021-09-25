const express = require("express");
const moment = require("moment");
const populateUser = require("../middlewares/populateUser");
const db = require("../data/dbconfig.js");
const router = express.Router();
router.use(populateUser);

// Required fields: {
//    title,
//    addressee
// }
router.post("/", async (req, res) => {
  try {
    const { email, version } = req.body;
    email.user_id = req.user.id;
    if (email.id) {
      const { title, addressee, id } = email;
      await db("emails")
        .where({ id })
        .update({ title, addressee });
    } else {
      email.id = (await db("emails")
        .insert(email)
        .returning("id"))[0];
    }

    if (version) {
      // Remove unnecessary fields
      delete version.id;
      delete version.date_created;
      version.email_id = email.id;
      version.tone_analysis = JSON.stringify(version.tone_analysis);
      await db("versions").insert(version);
    }

    res.json({ id: email.id });
  } catch (err) {
    res.json({ err });
    throw err;
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db("versions")
    .where({ email_id: id })
    .del();
  const count = await db("emails")
    .where({ id })
    .del();
  res.json({ count });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const email = await db("emails")
    .where({ id })
    .first();
  // Fetch all versions, and parse their tone analyses
  email.versions = await db("versions")
    .where({ email_id: id })
    .then(vs => {
      return vs.map(v => {
        // Postgres will give us an already-parsed JSON object, but SQLite will not
        try {
          v.tone_analysis = JSON.parse(v.tone_analysis);
        } finally {
          return v;
        }
      });
    });
  res.json({ email });
});

router.get("/", async (req, res) => {
  const emails = await db("emails")
    .leftJoin("versions", "versions.email_id", "emails.id")
    .where({ "emails.user_id": req.user.id })
    .select(
      "emails.id",
      "title",
      "addressee",
      "versions.date_created as updated",
      "versions.text as text"
    )
    // Postgres doesn't like groupBy, so we will group them ourselves
    .then(emails => {
      // Convert the list of emails into a hashtable indexed by email ID
      const hashed = {};
      emails.forEach(email => {
        if (!hashed[email.id]) {
          hashed[email.id] = email;
        } else {
          // Replace the existing entry if the associated version is newer
          const updated = moment(email.updated);
          const hashed_updated = moment(hashed[email.id].updated);
          if (updated.isAfter(hashed_updated)) {
            hashed[email.id] = email;
          }
        }
      });
      // Return a list of emails
      return Object.values(hashed);
    })
    // Convert database dates into something readable
    .then(emails => emails.map(processEmail));
  res.json({ emails });
});

processEmail = email => {
  const { updated } = email;

  const m = moment.utc(updated);
  if (m.isValid()) {
    email.updated = m.toISOString();
  } else {
    email.updated = "No versions.";
  }
  return email;
};

module.exports = router;
