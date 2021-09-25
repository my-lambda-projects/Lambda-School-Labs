const db = require('../../dbConfig.js');

module.exports = {
    findAllSeededRecipes,
    findById,
    add,
    removeSeededRecipe,
    updateSeededRecipe
  };
  
  function findAllSeededRecipes() {
    return db('seeded_recipes');
  }
  
  function findById(id) {
    return db('seeded_recipes')
      .where({ id })
      .first();
}

async function add(seeded_recipes) {
  const [id] = await db('seeded_recipes').insert(seeded_recipes);

  return findById(id);
}


function removeSeededRecipe(id) {
  return db('seeded_recipes')
    .where({ id })
    .del()
}

function updateSeededRecipe(id, changes) {
  return db('seeded_recipes').where({ id }).update(changes)
  .then(count => {
      return findById(id)
  })
}