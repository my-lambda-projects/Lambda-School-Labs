const getUserId = async ctx => {
  try {
    const authUser = await ctx.user;
    const auth0sub = authUser.sub;
    const currentUser = await ctx.db.query.user({
      where: {
        auth0Sub: auth0sub
      }
    });
    return currentUser.id;
  } catch (error) {
    console.log("getUserId error: ", error.message);
    return error.message;
  }
};

const getRecipe = async (ctx, title, userId) => {
  try {
    const recipes = await ctx.db.query.recipes({
      where: {
        title: title,
        createdBy: {
          id: userId
        }
      }
    });
    return recipes.length ? recipes[0] : null;
  } catch (error) {
    console.log("getRecipes error: ", error.message);
    return error.message;
  }
};

module.exports = { getUserId, getRecipe };
