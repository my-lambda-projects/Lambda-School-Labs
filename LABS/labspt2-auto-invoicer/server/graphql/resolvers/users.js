const User = require('../../models/user');
const Company = require('../../models/company');

const { findAllDocuments, findDocumentById } = require('../helpers/index');

const { formatData } = require('../helpers/format');

module.exports = {
  user: ({ userId }) => {
    return findDocumentById(userId, User);
  },
  users: () => {
    return findAllDocuments(User);
  },
  createUser: async args => {
    formatData(args.userInput);
    try {
      const { name, email, phoneNumber } = args.userInput;
      const userExists = await User.findOne({
        email
      });
      if (userExists) {
        throw new Error('Username already exists');
      }
      const user = new User({
        name,
        email,
        phoneNumber
      });
      const newUser = await user.save();
      return {
        ...newUser._doc
      };
    } catch (err) {
      throw err;
    }
  },
  editUser: async ({ editUserInput, userId }, req) => {
    try {
      const userExist = await User.findById(userId);
      if (!userExist) {
        throw new Error('user does not exist');
      }
      Object.keys(editUserInput).forEach(key => {
        if (!editUserInput[key]) {
          delete editUserInput[key];
        }
      });
      formatData(editUserInput);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            ...editUserInput
          }
        },
        {
          new: true
        }
      );
      return {
        ...updatedUser._doc
      };
    } catch (error) {
      throw error;
    }
  },
  buyPremium: async ({ userId }) => {
    const user = await User.findById(userId);
    user.premium = true;
    const date = new Date();
    user.premiumExpiresOn = date.setDate(date.getDate() + 30);
    const updatedUser = await user.save();
    return updatedUser._doc;
  }
};
