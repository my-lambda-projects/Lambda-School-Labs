const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Email Settings
const {
  mysecret,
  adminemail,
  adminusername,
  adminpassword,
} = process.env;

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: adminusername,
    pass: adminpassword,
  },
});

// Importing relevant Models
const User = require('../../auth/models/UserModel');
const School = require('../../schools/models/SchoolModel');

// create a Teacher in USer Model
const createTeacher = async (req, res) => {
  const { username } = req.body;
  const { email, lastName, firstName, schoolID } = req.decoded;
  const { hashedPassword } = req;
  try {
    const adminAsteacher = await User.findOne({ email });
    let teacher;
    if (adminAsteacher) {
      teacher = await User.findOneAndUpdate(
        { email },
        { firstName, lastName, isTeacher: true },
      );
    } else {
      teacher = await User.create({
        username,
        email,
        schoolID,
        lastName,
        firstName,
        isTeacher: true,
        passwordHash: hashedPassword,
      });
    }
    await School.findOneAndUpdate(
      { _id: schoolID },
      { $push: { teachers: teacher } },
    );
    res.status(200).json(teacher);
  } catch (error) {
    res.status(422).json({ message: error });
  }
};
// Send a signup request to added Teachers
const sendTeacherSignupRequest = async (req, res) => {
  const { schoolID } = req.decoded;
  const { firstName, lastName, email } = req.body;
  const payload = { firstName, lastName, email, schoolID };
  const token = await jwt.sign(payload, mysecret, { expiresIn: '48h' });
  const mailOptions = {
    to: email,
    from: adminemail,
    subject: 'Teacher Signup Request for Housecups',
    text:
      `Hi ${firstName}\n\n` +
      'You are receiving this because your school admin has added you to the list of teachers for school.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      `http://localhost:3000/teachersignup?${token}\n\n` +
      '\n\n' +
      'Thanks Team Housecups',
  };
  try {
    await smtpTransport.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(422).json({ message: 'Email could not be sent' });
  }
};

// delete teacher
const deleteTeacher = async (req, res) => {
  const teacherID = req.params.id;
  try {
    const teacher = await User.findById(teacherID);
    const { schoolID } = teacher;
    const removedTeacher = await User.findByIdAndRemove(teacherID);
    const schoolDeleteRequest = await School.findOneAndUpdate(
      { _id: schoolID },
      { $pull: { teachers: teacherID } },
    );
    res.status(200).json({ success: true, removedTeacher });
  } catch (error) {
    res.status(500).json({ message: 'No such teacher in database', error });
  }
};
// get Teachers by School.
const getTeachersBySchool = async (req, res) => {
  const { schoolID } = req.decoded;
  try {
    const school = await School.findById(schoolID).populate('teachers');
    
    const { teachers } = school;
    console.log(teachers);
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'No teachers in database for this school', error });
  }
};

module.exports = {
  createTeacher,
  deleteTeacher,
  getTeachersBySchool,
  sendTeacherSignupRequest,
};
