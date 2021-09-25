const db = require("../../dbConfig.js");

module.exports = {
  findAllRecipes,
  findById,
  add,
  removeRecipe,
  updateUserRecipe,
  findPostsByUserId,
  findFullRecipe,
};

function findAllRecipes() {
  return db("user_recipes");
}

function findById(id) {
  return db("user_recipes")
    .where({ id })
    .first();
}



async function add(recipe) {
  const [id] =  await db("user_recipes").insert(recipe);
  console.log("recipe_ID in model", id)
  return id
}

function removeRecipe(id) {
  return db("user_recipes")
    .where({ id })
    .del();
}

function updateUserRecipe(id, changes) {
  return db("user_recipes")
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

//returns truncated recipes with no ingredients/instructions
async function findPostsByUserId(userString) {
return db("user_recipes").where({userString})

}

//returns full recipe with instructions and ingredients
function findFullRecipe(recipe_id) {
  return db("user_recipes as u").where({"id": recipe_id})
    .join("instructions as i", "u.id", "i.recipe_id")
    .join("recipe_ingredients as q", "u.id", "q.recipe_id")
    .join("ingredients", "q.ingredient_id", "ingredients.title")
}

