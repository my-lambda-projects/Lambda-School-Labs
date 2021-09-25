const db = require("../../dbConfig.js");

module.exports = {
  findAllIngredients,
  findById,
  add,
  removeIngredient,
  updateIngredient,
  findByRecipe,
  checkIngredient,
  addQuantity,
  updateQuantity,
  updateRecipe_Ingredients,
  deleteRecipe_Ingredients,
  handleArrayQuantity
};

//needs to add recipe_id to ingredient 
async function handleArrayQuantity(operation, recipeResult, quantityArray) {
  const results = [];
  for (let i = 0; i < quantityArray.length; i++) {
    let quantity = quantityArray[i];
    // console.log("handleArrayQuantity[i]", quantity)
    switch (operation) {
      case "add":
        const addResult = await addQuantity(quantity.quantity, recipeResult, quantity.ingredient);
        results.push(addResult);
        break;
      case "update":
        // console.log("update Quantity switch statement")
        const updateResult = await updateQuantity(  quantity.quantity,
          recipeResult,
          quantity.ingredient,
          quantity.id);
        results.push(updateResult);
        break;
      case "delete":
        const deleteResult = await deleteRecipe_Ingredients(quantity);
        results.push(deleteResult);
        break;
    }
  }
  // console.log("handle ingredients results", results)
  return results;
}

async function findByRecipe(recipe_id) {
  const ingredients = await db("recipe_ingredients as ri")
    .where({ recipe_id: recipe_id })
    .join("ingredients as i", "i.id", "ri.ingredient_id")
    .select("ri.quantity as quantity", "i.title as ingredient", "ri.id as id");
  return ingredients;
}

async function findByQuantity(quantity_id) {
  const quantity = await db("recipe_ingredients")
    .where({ id: quantity_id })
    .first();
  return quantity;
}

async function checkIngredient(ingredient_title) {
  // console.log("checkIngredient title", ingredient_title);
  const result = await db("ingredients")
    .where({ title: ingredient_title })
    .select("id")
    .first();
  if (result) {
    // console.log("checkIngredient id", result.id);
    return result.id;
  } else {
    return null;
  }
}

async function addQuantity(quantity, recipe_id, ingredient_title) {
  try {
    let ingredient_id = await checkIngredient(ingredient_title);
    if (!ingredient_id) {
      try {
        ingredient_id = await add(ingredient_title);
      } catch (error) {
        console.log(error);
      }
    }
    const result = await addRecipe_Ingredients(
      quantity,
      recipe_id,
      ingredient_id
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addRecipe_Ingredients(quantity, recipe_id, ingredient_id) {
  const ingredient = { quantity, recipe_id, ingredient_id };
  // console.log("addRecipeIngredients ingredient", ingredient);
  const [id] = await db("recipe_ingredients").insert(ingredient);
  // console.log("addRecipe_ingredients id", id);
  return id;
}

async function updateRecipe_Ingredients(id, quantity) {
  const result = await db("recipe_ingredients")
    .where({ id: id })
    .update(quantity);
  // console.log("result updateRecipe_Ingredients", result);
  return result;
}

async function deleteRecipe_Ingredients(quantity_id) {
  return await db("recipe_ingredients")
    .where({ id: quantity_id })
    .del();
}

async function updateQuantity(
  quantity,
  recipe_id,
  ingredient_title,
  quantity_id
) {
  let ingredient_id = await checkIngredient(ingredient_title);
  // console.log("1update quantity ingredient id", ingredient_id);
  if (!ingredient_id) {
    ingredient_id = await add(ingredient_title);
    // console.log("if statement quantity ingredient id", ingredient_id);
  }
  const changes = { quantity, recipe_id, ingredient_id };
  const result = await updateRecipe_Ingredients(quantity_id, changes);

  // console.log("2update result", result);
   return result;
}



function findAllIngredients() {
  return db("ingredients");
}

function findById(ingredient_title) {
  return db("ingredients").where({ title: ingredient_title });
}

async function add(ingredient) {
  const [id] = await db("ingredients").insert({ title: ingredient });
  return id;
}

function removeIngredient(id) {
  return db("ingredients")
    .where({ id })
    .del();
}

function updateIngredient(id, changes) {
  return db("ingredients")
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

