const userControllers = require("../controllers/userControllers");
const loanControllers = require("../controllers/loanControllers");
const thirdPartyApiControllers = require("../controllers/thirdPartyApiControllers");
const path = require("path");

module.exports = (app) => {
  // Returns all loans in the database. This is just for manual debugging,
  // frontend should never need to user it.
  app.route("/loans").get(loanControllers.loansGetAll);

  // Creates a new loan. Creates a new row for the loan in Loan collection.
  app.route("/newloan").post(loanControllers.loanCreate);

  // Returns all loans for the given client email.
  app.route("/getclientloans").post(loanControllers.loansGetAllByClientEmail);

  // Returns all loans for the given loanManagerId.
  app.route("/getmanagerloans").post(loanControllers.loansGetAllByManagerId);

  // Performs get/post/delete operations on the given loan.
  app
    .route("/loan/:id")
    .get(loanControllers.loanGetById)
    .post(loanControllers.loanEdit)
    .delete(loanControllers.loanDelete);

  app.route("/assignment").post(loanControllers.loanCreateAssignment);
  app.route("/assignmentedit").post(loanControllers.loanEditAssignment);
  app.route("/assignmentdelete").post(loanControllers.loanDeleteAssignment);
  app.route("/assignmentcomplete").post(loanControllers.loanCompleteAssignment);
  app.route("/saveassignments").post(loanControllers.loanSaveAssignments);

  app.route("/phaseedit").post(loanControllers.loanEditPhase);

  // Creates a new user. Creates a new row for the user in User collection.
  app.route("/newuser").post(userControllers.userCreate);

  // Checks log in credentials for a user.
  app.route("/login").post(userControllers.userLogin);

  // Returns all users in the database. This is just for manual debugging,
  // frontend should never need to user it.
  app.route("/users").get(userControllers.usersGetAll);

  // Performs get/delete operations on the given user.
  app
    .route("/user")
    .post(userControllers.userGetByUID)
    .delete(userControllers.userDelete);

  // Performs get operations on the given user.
  app.route("/userbyemail").post(userControllers.userGetByEmail);

  // Performs edit operations on the given user.
  app.route("/edituser").post(userControllers.userEdit);

  // Recieve client token after authentication
  app.route("/auth").post(userControllers.userToken);
  app.route("/stripe").post(userControllers.stripeTransaction);

  // Send email notification to the user
  app.route("/sendemail").post(thirdPartyApiControllers.sendEmailNotification);

  // Send sms notification to the user
  app.route("/sendsms").post(thirdPartyApiControllers.sendSmsNotification);

  // frontend proxy
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../../loanie-view/build", "index.html"));
  });
};
