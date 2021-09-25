exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('meeting').del().then(function() {
    // Inserts seed entries
    return knex('meeting').insert([
      {
        course_id: 1,
        meeting_date: new Date(2018, 3, 3),
        teacher_id: 1,
        material_covered:
          'Description of material covered.',
        notes: 'Notes describing meeting',
        unpaid: false
      },
    
      {
        course_id: 1,
        meeting_date: new Date(2018, 3, 7),
        teacher_id: 1,
        material_covered:
          'Description of material covered.',
        notes: 'Notes describing meeting',
        unpaid: false
      }
    ]);
  });
};
