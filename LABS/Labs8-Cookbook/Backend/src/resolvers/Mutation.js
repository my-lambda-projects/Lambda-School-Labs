//This file defines resolvers for Mutation

const stripe = require("../utils/stripe");
const { getUserId, getRecipe } = require("../utils/helper");
const { forwardTo } = require("prisma-binding");

const Mutation = {
  //use default resolvers from prisma db
  updateUser: forwardTo("db"),
  deleteRecipe: forwardTo("db"),
  deleteEvent: forwardTo("db"),

  //resolver for creating new user
  signup: async (_, args, context, info) => {
    //extract user auth0 id and email from context
    const auth0user = await context.user;
    const auth0Sub = auth0user.sub;
    const email = auth0user.email;

    try {
      //run createUser mutation, and return result
      const newUser = await context.db.mutation.createUser(
        {
          data: {
            auth0Sub: auth0Sub,
            email: email
          }
        },
        info
      );
      return newUser;
    } catch (error) {
      console.log("Signup Error: ", error.message);
      return error.message;
    }
  },

  //resolver for creating new recipe
  createRecipe: async (_, args, context, info) => {
    try {
      //get id of current logged in user
      const userId = await getUserId(context);

      let recipe;
      //check if user already saved this recipe in db.
      const existingRecipe = await getRecipe(context, args.title, userId);

      if (existingRecipe) {
        //If recipe already exists then use this recipe
        recipe = existingRecipe;
      } else {
        //else run mutation createRecipe to create a new one
        recipe = await context.db.mutation.createRecipe(
          {
            data: {
              title: args.title,
              prepTime: args.prepTime,
              servings: args.servings,
              image: args.image,
              url: args.url,
              createdBy: { connect: { id: userId } }
            }
          },
          info
        );
      }

      //If use chose a date and mealtype, then proceed to create new events for the recipe created above
      if (args.dates.length && args.mealType) {
        args.dates.forEach(async date => {
          //Check if user scheduled a meal for this recipe on the provided date
          const existingEvent = await context.db.query.events({
            where: {
              mealType: args.mealType,
              date: date,
              recipe: {
                id: recipe.id
              }
            }
          });

          //if there's already a meal scheduled then skip, if not then run createEvent mutation to create event
          if (!existingEvent.length) {
            const eventVariables = {
              mealType: args.mealType,
              date: date,
              recipe: { connect: { id: recipe.id } }
            };

            await context.db.mutation.createEvent(
              {
                data: eventVariables
              },
              info
            );
          }
        });
      }
      //return the recipe.
      return recipe;
    } catch (e) {
      console.log("createRecipe Error: ", e.message);
      return e.message;
    }
  },

  //resolver for creating new schedule meal for recipe
  createEvent: async (_, args, context, info) => {
    const data = {
      mealType: args.mealType,
      date: args.date,
      recipe: { connect: { id: args.recipe } }
    };
    try {
      //Check if user scheduled a meal for this recipe on the provided date
      const existingEvent = await context.db.query.events({
        where: {
          mealType: args.mealType,
          date: args.date,
          recipe: {
            id: args.recipe
          }
        }
      });
      //If event already exists then do nothing
      if (existingEvent.length) return;

      //else create new event
      const event = await context.db.mutation.createEvent(
        {
          data: data
        },
        info
      );
      return event;
    } catch (error) {
      console.log("createEvent Error: ", error.message);
      return error.message;
    }
  },

  //resolver for creating new instruction for the new recipe
  createInstruction: async (_, args, context, info) => {
    const data = {
      stepNum: args.stepNum,
      description: args.description,
      recipe: { connect: { id: args.recipe } }
    };
    try {
      //Check if this recipe already created before and has these instructions
      const instructions = await context.db.query.instructions({
        where: {
          stepNum: args.stepNum,
          description: args.description,
          recipe: {
            id: args.recipe
          }
        }
      });

      if (instructions.length) return;

      //If not then add instruction
      const instruction = await context.db.mutation.createInstruction(
        {
          data: data
        },
        info
      );
      return instruction;
    } catch (error) {
      console.log("createInstruction Error: ", error.message);
      return error.message;
    }
  },

  createIngredient: async (_, args, context, info) => {
    const data = {
      name: args.name,
      quantity: args.quantity,
      recipe: { connect: { id: args.recipe } }
    };
    try {
      //Check if this recipe already created before and has these ingredient
      const ingredients = await context.db.query.ingredients({
        where: {
          name: args.name,
          quantity: args.quantity,
          recipe: {
            id: args.recipe
          }
        }
      });
      if (ingredients.length) return;

      //If not then add ingredient
      const ingredient = await context.db.mutation.createIngredient(
        {
          data: data
        },
        info
      );
      return ingredient;
    } catch (error) {
      console.log("createIngredient Error: ", error.message);
      return error.message;
    }
  },

  //resolver to create subscription for user
  createSubscription: async (parent, args, context, info) => {
    try {
      //get id of current logged in user
      const userId = await getUserId(context);

      //submit the charge to stripe, and receive the charge id from stripe
      const charge = await stripe.charges.create({
        amount: 1000,
        currency: "usd",
        source: args.token
      });

      //run createSubsciption mutation to create subscription for user.
      const subscription = await context.db.mutation.createSubscription(
        {
          data: {
            amount: 10,
            currency: "USD",
            user: { connect: { id: userId } },
            charge: charge.id
          }
        },
        info
      );

      //After subscription create, change user to status isSubscribed to true
      await context.db.mutation.updateUser({
        data: {
          isSubscribed: true
        },
        where: {
          id: userId
        }
      });

      return subscription;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
};

module.exports = Mutation;
