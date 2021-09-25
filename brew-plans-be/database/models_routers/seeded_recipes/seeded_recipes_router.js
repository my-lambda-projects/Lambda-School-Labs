const router = require('express').Router();
const seededRecipes = require('./seeded_recipes_model');

router.get('/all', (req, res) => {
  seededRecipes.findAllSeededRecipes()
      .then(recipes => {
        res.json(recipes);
      })
      .catch(err => res.send(err));
  });

  
  
router.get('/:id', (req, res) => {
    const { id } = req.params;
    seededRecipes.findById(id)
    .then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: 'Could not find seeded recipe with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get recipe' });
    });
  });

  router.post('/newseeded', (req, res) => {

    let recipe = req.body;

    seededRecipes.add(recipe)
      .then(saved => {
        res.status(201).json({
          recipe: saved
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  

  router.delete('/:id', (req, res) => {
    const { id }  = req.params; 
  
    seededRecipes.removeSeededRecipe(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find seeded recipe with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete seeded recipe' });
    });
  });

  router.put('/:id', (req, res) => {

    const { id } = req.params;
    const changes = req.body;
  
    seededRecipes.updateSeededRecipe(id, changes)
      .then(recipe => {
        if (recipe) {
          res.json({ updated: recipe });
        } else {
          res.status(404).json({ message: 'Could not find seeded recipe id' })
        }
      })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get seeded recipe ' });
    });
  });
  
module.exports = router;

