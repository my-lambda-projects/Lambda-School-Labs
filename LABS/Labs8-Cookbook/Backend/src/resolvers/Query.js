//This file defines resolvers for Query
const { forwardTo } = require("prisma-binding");
const { getUserId } = require("../utils/helper");

const Query = {
  recipe: forwardTo("db"),
  event: forwardTo("db"),

  events: async (_, args, context, info) => {
    try {
      const userid = await getUserId(context);

      const events = await context.db.query.events(
        {
          where: {
            recipe: {
              createdBy: {
                id: userid
              }
            }
          }
        },
        info
      );

      return events;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  },

  recipes: async (_, args, context, info) => {
    try {
      const userId = await getUserId(context);
      const recipes = await context.db.query.recipes(
        {
          where: {
            createdBy: {
              id: userId
            }
          }
        },
        info
      );
      return recipes;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  },

  currentUser: async (_, args, context, info) => {
    try {
      const auth_user = await context.user;
      const auth0sub = args.auth0sub || auth_user.sub || "";
      const currentUser = await context.db.query.user(
        {
          where: {
            auth0Sub: auth0sub
          }
        },
        info
      );
      return currentUser;
    } catch (e) {
      console.log("currentUser error: ", e.message);
      return e.message;
    }
  }
};

module.exports = Query;
