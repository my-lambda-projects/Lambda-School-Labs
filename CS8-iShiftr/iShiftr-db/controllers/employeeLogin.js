const jwt = require("jsonwebtoken");
const Employee = require("../models/EmployeeModel");

mysecret = 'authentication isnt working';
console.log(mysecret);
const employeeLogin = (req, res) => {
  const { username, password } = req.body;

  Employee.findOne({ username }, (error, employee) => {
    if (error) {
      console.log(error);
      return res.status(403).json({ error: "Invalid Username/Password" });
    }
    if (employee === null) {
      console.log("422");
      return res
        .status(422)
        .json({ error: "No Employee with that username was found." });
    }
    employee.checkPassword(password,
      (nonmatch, hashMatch) => {
        if (nonmatch != null) {
          return res.status(422).json({ error: "Invalid Password!" });
        }
        if (hashMatch) {
          const payload = {
            username: employee.username,
            admin: employee.admin
          };
          const token = jwt.sign(payload, mysecret);
          let id = employee.id;
          console.log(id);
          res.status(200).json({ token, id });
        }
    });
  });
};

module.exports = {
  employeeLogin
};
