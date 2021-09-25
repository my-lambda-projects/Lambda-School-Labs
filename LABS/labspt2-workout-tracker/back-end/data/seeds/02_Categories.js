exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { categoryName: 'Glutes', userId: 1 },
        { categoryName: 'Arms', userId: 1 },
        { categoryName: 'Abs', userId: 1 },
        { categoryName: 'Cardio', userId: 1 },
        { categoryName: 'HiiT', userId: 1 }
      ]);
    });
};
