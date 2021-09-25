const {
  createUser,
  login,
  getAllJobs,
  changePassword,
  changeEmail,
  billing,
  createMeetup,
  createJob,
  createList,
  editJob,
  getList,
  getAllMeetups,
  destroyMeetup,
  getAllContributions,
  createContribution,
  destroyContribution,
  uploadFile,
  getUserFile,
  uploadJobFile,
  getJobFile,
  updateStatus,
  deleteJob,
  deleteList,
} = require('../controllers');

module.exports = (server) => {
  // GET ROUTES
  server.route('/api/jobs').get(getAllJobs);
  server.route('/api/jobslist').get(getList);
  server.route('/api/meetups').get(getAllMeetups);
  server.route('/api/contributions').get(getAllContributions);
  server.route('/api/files').get(getUserFile);
  server.route('/api/jobfiles').get(getJobFile);
  
  // PUT ROUTES
  server.route('/api/changepassword').put(changePassword);
  server.route('/api/changeemail').put(changeEmail);
  server.route('/api/jobs').put(editJob);
  server.route('/api/updateStatus').put(updateStatus);
  
  // DELETE ROUTES
  server.route('/api/meetups').delete(destroyMeetup);
  server.route('/api/contributions').delete(destroyContribution);
  server.route('/api/jobs').delete(deleteJob);
  server.route('/api/lists').delete(deleteList);
  
  // POST ROUTES
  server.route('/api/signup').post(createUser);
  server.route('/api/login').post(login);
  server.route('/api/meetups').post(createMeetup);
  server.route('/api/jobs').post(createJob);
  server.route('/api/jobslist').post(createList);
  server.route('/api/contributions').post(createContribution);
  server.route("/api/billing").post(billing);
  server.route("/api/files").post(uploadFile);
  server.route("/api/jobfiles").post(uploadJobFile);
};
