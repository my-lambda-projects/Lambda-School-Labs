const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);

const friendAction = async (req, res) => {

  const { email, friend, action } = req.body;

  const currentUser = await User.findOne({ where: { email: email } });

  switch(action) {
    case 'requestFriend':
      await currentUser.friendRequest(friend);
      break;
    case 'unFriend':
      await currentUser.unFriend(friend);
      break;
    case 'accept':
      await currentUser.acceptFriendRequest(friend);
      break;
    case 'decline':
      await currentUser.declineFriendRequest(friend);
      break;

    default:
      console.log(`Error, ${action} is an invalid action`);
  }

  try {
    let users = {};
    users['noRelationship'] = await currentUser.usersWithNoRelationship();
    users['pending'] = await currentUser.usersRequestingFriendshipWithMe();
    users['requests'] = await currentUser.usersIamRequestingFriendshipWith();
    users['friends'] = await currentUser.friendsList();

    res.status(200).json(users);
  } catch(err) {
    console.log(`Friend action error: ${err}`);
  }
}

module.exports = {
  friendAction
};
