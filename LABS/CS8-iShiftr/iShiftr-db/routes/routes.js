const { authenticate, isAdmin } = require("../utils/middleware");
const stripe = require("stripe")('sk_test_fiAgEhHfF9hOFaVwxF15EKQ2');
const { employeeLogin } = require("../controllers/employeeLogin");
const { login } = require("../controllers/employerLogin");
const Employer = require("../models/EmployerModel");

const {
  createEmployer,
  getEmployer,
  editEmployerPassword
} = require("../controllers/Employer");

const {
  createEmployee,
  getEmployees,
  getOneEmployee,
  editEmployee,
  deleteEmployee,
  editEmployeePassword
} = require("../controllers/Employee");

const {
  createSchedule,
  getSchedule,
  getEmpsSched,
  deleteSchedule
} = require("../controllers/schedule");
const {
  paymentApi
} = require("../controllers/payment")

module.exports = server => {

  //--------------------------Employer Routes--------------------------//
  // create an employer
  server.route("/api/register").post(createEmployer);
  // login an employer
  server.route("/api/employerLogin").post(login);

  // creating an employee
  server.route("/api/:id/createEmployee").post(authenticate, isAdmin, createEmployee);
  
  // editing an employee
  server.route("/api/editEmployee/:id").put(authenticate, isAdmin, editEmployee);
  
  // deleting an employee
  server.route("/api/deleteEmployee/:id").delete(authenticate, isAdmin, deleteEmployee);
  
  // editing the employer's password
  server.route("/api/:id/editPassword").put(authenticate, isAdmin, editEmployerPassword);
  
  // get all the employees and their data
  server.route("/api/:id/employees").get(authenticate, isAdmin, getEmployees);

  // Employer settings
  server.route("/api/employer/:id").get(authenticate, isAdmin, getEmployer);

  // create a schedule for an employee
  server.route("/api/createSchedule/:id").post(authenticate, isAdmin, createSchedule);

  // get the general schedule
  server.route("/api/schedule/:id").get(authenticate, isAdmin, getSchedule);

  // get the schedule of every employee
  server.route("/api/:id/schedule").get(authenticate, isAdmin, getEmpsSched);
  
  // delete one schedule
  server.route("/api/schedule/:id").delete(authenticate, isAdmin, deleteSchedule);
  
  //--------------------------Employee Routes--------------------------//
  // Employee login
  server.route("/api/employeeLogin").post(employeeLogin);
  
  // get the employee's data and schedule
  server.route("/api/employee/:id").get(authenticate, getOneEmployee);

  // editing the employee's password
  server.route("/api/employee/:id/editPassword").put(authenticate, editEmployeePassword);
  
  //editing the employee
  server.route("/api/employee/:id/editEmployee").put(authenticate, editEmployee)

  // stripe
  server.post('/api/:id/charge', (req, res) => {
    console.log("Body: ", req.body)
    // stripe.charges.create(req.body, paymentApi);
    try{
      const charge = stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
      })
      Employer
      .findByIdAndUpdate(req.params.id, {
        $set: {paid: true}
      })
      .then(employer => {
        res.status(200).json({ employer })
      })
      .catch((error) => {
        res.status(500).json({ Error: 'There was an error getting the employer', error })
      })

    } catch(error){
      console.log(error)
    }
      
    
  });
};
