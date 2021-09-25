const express = require("express");
const server = express();
const cors = require("cors");

const InterestsRoute = require("./interests/interestsRouter");
const UsersRoute = require("./users/usersRouter");
const AuthRoute = require("./auth/authRouter");
const ActivitiesRoute = require("./activities/activitiesRouter");
const UserActivitiesRoute = require("./user_activities/user_activitiesRouter");

const { jwtauth } = require("./auth/authMiddleware");

server.use(express.json());

server.use("/useractivities", jwtauth, UserActivitiesRoute);
server.use("/activities", jwtauth, ActivitiesRoute);
server.use("/interests", jwtauth, InterestsRoute);
server.use("/users", jwtauth, UsersRoute);
server.use("/auth", AuthRoute);
server.use(cors());

module.exports = server;
