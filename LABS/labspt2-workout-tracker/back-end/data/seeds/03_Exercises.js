exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exercises')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('exercises').insert([
        {
          exerciseName: 'Front Lunges',
          reps: '12',
          sets: '1',
          weight: 'Bodyweight',
          categoryId: 1,
          userId: 1
        },
        {
          exerciseName: 'Bicep Curls with Dumbells',
          reps: '5-15',
          sets: '3',
          weight: '5-10 lb',
          categoryId: 2,
          userId: 1
        },
        {
          exerciseName: 'Bicep Curls with Barbells',
          reps: '5-15',
          sets: '3',
          weight: '10 lb',
          categoryId: 2,
          userId: 1
        },
        {
          exerciseName: 'Dips',
          reps: '5-12',
          sets: '3',
          weight: 'Bodyweight',
          categoryId: 2,
          userId: 1
        },
        {
          exerciseName: 'Wall Push-ups',
          reps: '5-12',
          sets: '3',
          weight: 'Bodyweight',
          categoryId: 2,
          userId: 1
        },
        {
          exerciseName: 'Push-ups',
          reps: '5-12',
          sets: '3',
          weight: 'Bodyweight',
          categoryId: 2,
          userId: 1
        },
        {
          exerciseName: 'Crunches',
          reps: '10-12',
          sets: '3',
          weight: 'Bodyweight',
          categoryId: 3,
          userId: 1
        },
        {
          exerciseName: 'Sit-ups',
          reps: '12-16',
          sets: '3',
          weight: 'Bodyweight',
          categoryId: 3,
          userId: 1
        },
        {
          exerciseName: 'Jogging',
          reps: '1',
          sets: '1',
          weight: 'Bodyweight',
          categoryId: 4,
          userId: 1
        },
        {
          exerciseName: 'Stationary Biking',
          reps: '1',
          sets: '1',
          weight: 'Bodyweight',
          categoryId: 4,
          userId: 1
        },
        {
          exerciseName: 'Various',
          reps: '1',
          sets: '1',
          weight: 'Bodyweight',
          categoryId: 5,
          userId: 1
        }
      ]);
    });
};
