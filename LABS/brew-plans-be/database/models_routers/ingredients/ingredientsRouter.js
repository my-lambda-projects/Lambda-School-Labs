const router = require("express").Router();
const Ingredient = require("./ingredientsModel");

router.get("/all", (req, res) => {
  Ingredient.findAllIngredients()
    .then(ingredients => {
      res.json(ingredients);
    })
    .catch(err => res.send(err));
});

//id refers to recipe_id, returns array of ingredients
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Ingredient.findByRecipe(id)
    // Ingredient.findById(id)
    .then(ingredient => {
      if (ingredient) {
        res.json(ingredient);
      } else {
        console.log(ingredient);
        res
          .status(404)
          .json({ message: "Could not find ingredient with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get ingredient" });
    });
});

router.post("/:recipe_id/newingredient", async (req, res) => {
  let badResults = [];
  const postArray = req.body;
  const { recipe_id } = req.params;
  try {
    for (let i = 0; i < postArray.length; i++) {
      const { quantity, ingredient_title } = postArray[i];
      result = await Ingredient.addQuantity(
        quantity,
        recipe_id,
        ingredient_title
      );
      if (!result) {
        badResults.push(ingredient_title);
      }
      // console.log("result", result);
    }
    // console.log("badResults", badResults);
    if (badResults.length === 0) {
      res.status(201).json({ message: "Ingredient successfully added" });
    } else {
      res
        .status(404)
        .json({
          message: `Something went wrong while trying to add ${badResults}`
        });
    }
  } catch (error) {
    // console.log("error", error);
    res.status(500).json({ message: "Unable to add ingredients" });
  }
});
//id refers to quantity_id
router.delete("/:quantity_id", async (req, res) => {
  const { quantity_id } = req.params;
  try {
    const deleted = await Ingredient.deleteRecipe_Ingredients(quantity_id);
    // console.log("deleted", deleted);
    if (deleted) {
      res.status(204).json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: "Could not find ingredient with given id" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ingredient" });
  }
});

router.put("/:recipe_id", async (req, res) => {
  let countResults = 0;
  const { recipe_id } = req.params;
  const updateArray = req.body;
  // console.log("req.body", req.body)
  try {
    for (let i = 0; i < updateArray.length; i++) {
      const { quantity, ingredient_title, quantity_id } = updateArray[i];
      // console.log("Array Item", updateArray[i]);
      result = await Ingredient.updateQuantity(
        quantity,
        recipe_id,
        ingredient_title,
        quantity_id
      );
      // console.log("RESULT", result);
      countResults += result;
    }
    // console.log("results array", countResults);
    if (countResults === updateArray.length) {
      res.status(200).json({ message: "Ingredients successfully updated" });
    } else {
      // console.log("PUT ELSE", ingredient);
      res
        .status(404)
        .json({ message: "Something went wrong with this update" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update ingredient" });
  }
});

module.exports = router;
