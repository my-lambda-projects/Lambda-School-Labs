require('dotenv').config();

// ------- Imports --------
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const globalErrorHandler = require('./controllers/errors.controller');

const staffRoutes = require('./routes/staff.routes');
const studentRoutes = require('./routes/student.routes');
const placementExamRoutes = require('./routes/placement.exam.routes');
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const courseEnrollmentRoutes = require('./routes/course_enrollment.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const userRoutes = require('./routes/user.routes');
const restricted = require('./middlewares/restricted.middleware.js');

// ------- Set up server -------
const server = express();

// ------- Middleware --------
server.use(helmet());
server.use(express.json());

server.use(
  cors({
    origin: [
      'https://thegardenedu.com',
      'http://localhost:3000',
      'https://speakout-now.com',
      'https://speak-out-bh.com',
      'https://www.speak-out-bh.com'
    ],
    credentials: true
  })
);

server.use(authRoutes);
server.use(restricted, staffRoutes);
server.use(restricted, studentRoutes);
server.use(restricted, placementExamRoutes);
server.use(restricted, courseRoutes);
server.use(restricted, courseEnrollmentRoutes);
server.use(restricted, attendanceRoutes);
server.use(restricted, userRoutes);

server.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'Find API documentation here: https://documenter.getpostman.com/view/10643459/T17AiAhf?version=latest'
    );
});

server.use(globalErrorHandler);
module.exports = server;
