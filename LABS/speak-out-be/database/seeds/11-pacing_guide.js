exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pacing_guide').del()
    .then(function () {
      // Inserts seed entries
      return knex('pacing_guide').insert([
        { name: 'Super Safari', 
        section: 'A', 
        lesson: '1', 
        content: 'Unit 3, Day 1' },
        { name: 'Super Safari', 
        section: 'A', lesson: '2', 
        content: 'Unit 3, Day 2' },
        { name: 'Super Safari', 
        section: 'A', lesson: '3', 
        content: 'Unit 3, Day 3' },
        { name: 'Jolly Phonics', 
        section: 'A', lesson: '4', 
        content: 'Unit 3, Day 4' },
        { name: 'Jolly Phonics', 
        section: 'A', lesson: '5', 
        content: 'Unit 3, Day 5' },
        { name: 'Jolly Phonics', 
        section: 'A', lesson: '6', 
        content: 'Unit 3, Day 6' }
      ]);
    });
};