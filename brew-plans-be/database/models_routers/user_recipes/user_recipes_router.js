const router = require("express").Router();
const Recipes = require("./user_recipes_model");
const Instructions = require("../instructions/instructions_model");
const Ingredients = require("../ingredients/ingredientsModel");

router.get("/all", (req, res) => {
  Recipes.findAllRecipes()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => res.send(err));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let recipe = await Recipes.findById(id);
    recipe.instructions = await Instructions.findByRecipe(id);
    recipe.ingredients = await Ingredients.findByRecipe(id);
    if (recipe && recipe.instructions && recipe.ingredients) {
      res.json(recipe);
    } else {
      res
        .status(404)
        .json({ message: "Could not find user recipe with given id." });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to get user recipe" });
  }
});

router.post("/newrecipe", async (req, res) => {
  let recipe = req.body;
  let instructionsArray = recipe.instructions;
  // console.log("first instructions", instructions)
  delete recipe.instructions;
  let ingredientsArray = recipe.ingredients;
  delete recipe.ingredients;
  var recipeResult
  try {
    recipeResult = await Recipes.add(recipe);
    console.log("recipeResult 1", recipeResult)
  } catch (error) {
    console.log("Error", error)
    res.status(500).json({ message: "Error adding recipe" });
  }
  let ingredientsResult = [];
  if (ingredientsArray.length>0) {
    try {
      ingredientsResult = await Ingredients.handleArrayQuantity(
        "add",
        recipeResult,
        ingredientsArray
      );
    } catch (error) {
      console.log("Error", error)
      res.status(500).json({ message: "Error adding ingredients" });
    }
  } else {
    ingredientsResult = true;
  }
  let instructionsResult = [];
  if (instructionsArray.length>0) {
    try {
      console.log("if statement post request: recipeResult 2", recipeResult)
      instructionsResult = await Instructions.handleArrayInstructions(
        "add",
        recipeResult,
        instructionsArray
      );
    } catch (error) {
      console.log("Error", error)
      res.status(500).json({ message: "Error adding instructions" });
    }
  } else {
    instructionsResult = true;
  }
  
  // console.log("instructionsResult", instructionsResult)
  if (recipeResult && ingredientsResult && instructionsResult) {
    res.status(201).json({ message: "Recipe sucessfully added" });
  } else {
    res.status(404).json({ message: "Error adding recipe" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Recipes.removeRecipe(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find recipe with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete recipe" });
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let recipe = req.body;
  let instructionsArray = recipe.instructions;
  delete recipe.instructions;
  let ingredientsArray = recipe.ingredients;
  delete recipe.ingredients;

  try {
    const recipeResult = await Recipes.updateUserRecipe(id, recipe);
    // console.log("1. put/:id recipeResult", recipeResult);
    let ingredientsResult = [];
    if (ingredientsArray) {
      ingredientsResult = await Ingredients.handleArrayQuantity(
        "update",
        id,
        ingredientsArray
      );
      // console.log("2. ingredientResult", ingredientsResult);
    } else {
      ingredientsResult = true;
    }
    let instructionsResult = [];
    if (instructionsArray) {
      instructionsResult = await Instructions.handleArrayInstructions(
        "update",
        id,
        instructionsArray
      );
      // console.log("3. instructionResult", instructionsResult);
    } else {
      instructionsResult = true;
    }
    if (recipeResult && ingredientsResult && instructionsResult) {
      res.json({ message: "Successfully updated recipe" });
    } else {
      res.status(404).json({ message: "Could not find user recipe id" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to update user recipe" });
  }
});

router.get("/user/:userString", (req, res) => {
  const { userString } = req.params;
  Recipes.findPostsByUserId(userString)
    .then(recipe => {
      if (recipe) {
        console.log(recipe);
        res.json(recipe);
      } else {
        res
          .status(404)
          .json({ message: "Could not find recipes for given user" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Failed to get recipes" });
    });
});

module.exports = router;
