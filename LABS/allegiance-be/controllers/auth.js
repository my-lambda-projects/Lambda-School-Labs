const express = require("express");

const Users = require("../models/users");
const GroupsUsers = require("../models/groups_users");
const UsersAllegiances = require("../models/users_allegiances");

const router = express.Router();

router.route("/").post(async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      error: `Error during ${req.method} at ${req.originalUrl}: email is required.`,
    });
  }
  // Check if email of user exists to decide whether to create new user
  console.log();
  const currentUser = await Users.find({
    email: req.body.email,
  }).first();
  if (currentUser) {
    // Check if current user is a member of any groups
    const userGroups = await GroupsUsers.find({ user_id: currentUser.id });
    // Check if current user is a member of any allegiances
    const userAllegiances = await UsersAllegiances.find({
      user_id: currentUser.id,
    });
    let basicGroupInfo = [];
    let basicAllegianceInfo = [];
    if (userGroups) {
      // If user is a member of groups, map group info to conform names to front end component structure
      basicGroupInfo = userGroups.map(group => {
        return {
          name: group.group_name,
          image: group.group_image,
          id: group.group_id,
          user_type: group.user_type,
        };
      });
    }
    if (userAllegiances) {
      // If user is a member of allegiances, map allegiance info to conform names to front end component structure
      basicAllegianceInfo = userAllegiances.map(allegiance => {
        return {
          name: allegiance.allegiance_name,
          image: allegiance.allegiance_image,
          id: allegiance.allegiance_id,
        };
      });
    }
    // Return user, group, and allegiance information
    const userInfo = { currentUser, basicGroupInfo, basicAllegianceInfo };
    return res.status(200).json({ userInfo });
  } else {
    // Add user to database if email does not exist
    const newUser = await Users.add(req.body);
    const userInfo = { newUser };
    res.status(201).json({ userInfo });
  }
});

router.route("/profile").post(async (req, res) => {
  // Check if id of user exists to decide whether to create new user
  console.log();
  const currentUser = await Users.find({
    id: Number(req.body.id),
  }).first();
  if (currentUser) {
    // Check if current user is a member of any groups
    const userGroups = await GroupsUsers.find({ user_id: currentUser.id });
    // Check if current user is a member of any allegiances
    const userAllegiances = await UsersAllegiances.find({
      user_id: currentUser.id,
    });
    let basicGroupInfo = [];
    let basicAllegianceInfo = [];
    if (userGroups) {
      // If user is a member of groups, map group info to conform names to front end component structure

      // basicGroupInfo = userGroups
      //   .filter(group => group.privacy_setting !== "hidden")
      //   .map(group => {
      //     return {
      //       ...group,
      //       name: group.group_name,
      //       image: group.group_image,
      //       id: group.group_id,
      //       user_type: group.user_type,
      //     };
      //   });

      basicGroupInfo = userGroups.reduce((acc, currentGroup) => {
        if (currentGroup.privacy_setting !== "hidden") {
          acc.push({
            ...currentGroup,
            name: currentGroup.group_name,
            image: currentGroup.group_image,
            id: currentGroup.group_id,
            user_type: currentGroup.user_type,
          });
          return acc;
        } else {
          return acc;
        }
      }, []);

      // basicGroupInfo = userGroups.filter(group => {
      //   if (group.privacy_setting !== "hidden") {
      //     return {
      //       ...group,
      //       name: group.group_name,
      //       image: group.group_image,
      //       id: group.group_id,
      //       user_type: group.user_type,
      //     };
      //   }
      // });
    }
    if (userAllegiances) {
      // If user is a member of allegiances, map allegiance info to conform names to front end component structure
      basicAllegianceInfo = userAllegiances.map(allegiance => {
        return {
          name: allegiance.allegiance_name,
          image: allegiance.allegiance_image,
          id: allegiance.allegiance_id,
        };
      });
    }
    // Return user, group, and allegiance information
    const userInfo = { currentUser, basicGroupInfo, basicAllegianceInfo };
    return res.status(200).json({ userInfo });
  } else {
    // Add user to database if email does not exist
    const newUser = await Users.add(req.body);
    const userInfo = { newUser };
    res.status(201).json({ userInfo });
  }
});

module.exports = router;
