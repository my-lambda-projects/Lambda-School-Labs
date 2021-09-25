const { createUser, changePassword, changeEmail } = require('./user');
const login = require('./login');
const { getAllJobs, createJob, createList, editJob, getList, updateStatus, deleteJob, deleteList } = require('./jobs');
const { createMeetup, getAllMeetups, destroyMeetup } = require('./meetups');
const {
  getAllContributions,
  createContribution,
  destroyContribution, } = require('./contributions')
const { billing } = require("./billing");
const { uploadFile, getUserFile, uploadJobFile, getJobFile, } = require('./files');

module.exports = {
  createUser,
  login,
  getAllJobs,
  changePassword,
  changeEmail,
  createMeetup,
  createJob,
  createList,
  editJob,
  getList,
  billing,
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
  deleteList
};
