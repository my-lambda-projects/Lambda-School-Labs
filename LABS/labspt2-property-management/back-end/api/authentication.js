const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const dbt = require("../data/helper/tenants");
const dbl = require("../data/helper/landlords");
const { generateToken } = require("../auth/bcrypt");

function validate(req, res, next) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json("Missing Email!");
  }

  next();
}

router.post("/register", validate, (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 14);
  let user = {
    firstName: creds.firstName,
    lastName: creds.lastName,
    password: hash,
    email: creds.email,
    phone: creds.phone
  };

  let regtenant = {
    firstName: creds.firstName,
    lastName: creds.lastName,
    password: hash,
    email: creds.email,
    landlord_id: creds.landlord_id,
    property_id: creds.property_id,
    phone: creds.phone
  };

  if (creds.isLandlord === false) {
    console.log("tenant", user);
    dbt
      .getByEmail(creds.email)
      .then(tenant => {
        if (tenant) {
          console.log(tenant);
          res.status(400).json("Email already exists.");
        } else {
          dbt
            .create(regtenant)
            .then(res => {
              res.status(201).json("Tenant has been created successfully.");
            })
            .catch(err => res.status(500).json({ error: err }));
        }
      })
      .catch(err => res.status(500).json({ error: err }));
  } else {
    dbl
      .getByEmail(creds.email)
      .then(landlord => {
        console.log(landlord);

        if (landlord) {
          res.status(400).json("Email already exists.");
          console.log(landlord, "register");
        } else {
          console.log(user);
          dbl
            .create(user)
            .then(res => {
              res.status(201).json("Landlord has been created successfully.");
            })
            .catch(err => res.status(500).json({ error: "else" }));
        }
      })
      .catch(err => res.status(500).json({ error: "then" }));
  }
});

router.post("/login", (req, res, next) => {
  const creds = req.body;
  if (creds.isLandlord === false) {
    dbt
      .getByEmail(creds.email)
      .then(tenants => {
        tenant = tenants;
        console.log(tenant);
        console.log(
          "bycrypt result",
          tenant.id && bcrypt.compareSync(creds.password, tenant.password)
        );
        if (tenant.id && bcrypt.compareSync(creds.password, tenant.password)) {
          const token = generateToken(tenant, creds.isLandlord);
          console.log(token);
          res.json({
            Welcome: tenant.firstName,
            userId: tenant.id,
            token,
            isLandlord: creds.isLandlord
          });
        } else {
          res.status(401).json({ message: "Not Authorized" });
        }
      })
      .catch(err => {
        next("h500", err);
      });
  } else {
    dbl
      .getByEmail(creds.email)
      .then(landlords => {
        landlord = landlords;

        console.log("before if", landlords);
        console.log(
          "bycrypt result",
          landlord.id && bcrypt.compareSync(creds.password, landlord.password)
        );
        if (
          landlord.id &&
          bcrypt.compareSync(creds.password, landlord.password)
        ) {
          const token = generateToken(landlord, creds.isLandlord);

          res.json({
            Welcome: landlord.firstName,
            userId: landlord.id,
            token,
            isLandlord: creds.isLandlord
          });
        } else {
          res.status(401).json({ message: "Not Authorized" });
        }
      })
      .catch(err => {
        console.log("500", err);
        next("h500", err);
      });
  }
});

module.exports = router;
