exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('level').del().then(function() {
    // Inserts seed entries
    return knex('level').insert([
      {
        textbook: 'Super Safari 1',
        description: 'SS 1',
        cef_equivalent: 'Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Super Safari Level 1'
      },
      {
        textbook: 'Super Safari 2',
        description: 'SS 2',
        cef_equivalent: 'Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Super Safari Level 2'
      },
      {
        textbook: 'Super Safari 3',
        description: 'SS 3',
        cef_equivalent: 'A1',
        pacing_guide_id: 1,
        certificate_text: 'Super Safari Level 3'
      },
      {
        textbook: 'Jolly Phonics 1',
        description: 'JP 1',
        cef_equivalent: 'Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Jolly Phonics Level 1'
      },
      {
        textbook: 'Jolly Phonics 2',
        description: 'JP 2',
        cef_equivalent: 'Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Jolly Phonics Level 2'
      },
      {
        textbook: 'Jolly Phonics 3',
        description: 'JP 3',
        cef_equivalent: 'Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Jolly Phonics Level 3'
      },
      {
        textbook: 'Kids Box 1',
        description: 'CB 1',
        cef_equivalent: 'Starters - Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Kids Box Level 1'
      },
      {
        textbook: 'Kids Box 2',
        description: 'CB 2',
        cef_equivalent: 'Starters - Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Kids Box Level 2'
      },
      {
        textbook: 'Kids Box 3',
        description: 'CB 3',
        cef_equivalent: 'Movers - A1',
        pacing_guide_id: 1,
        certificate_text: 'Kids Box Level 3'
      },
      {
        textbook: 'Kids Box 4',
        description: 'CB 4',
        cef_equivalent: 'Movers - A1',
        pacing_guide_id: 1,
        certificate_text: 'Kids Box Level 4'
      },
      {
        textbook: 'Kids Box 5',
        description: 'CB 5',
        cef_equivalent: 'Flyers - A2',
        pacing_guide_id: 1,
        certificate_text: 'Kids Box Level 5'
      },
      {
        textbook: 'Kids Box 6',
        description: 'CB 6',
        cef_equivalent: 'Flyers - A2',
        pacing_guide_id: 1,
        certificate_text: 'Kids Box Level 6'
      },
      {
        textbook: 'Ventures',
        description: 'V Beginner',
        cef_equivalent: 'Pre-A1',
        pacing_guide_id: 1,
        certificate_text: 'Ventures Beginner'
      },
      {
        textbook: 'English in Mind Starter',
        description: 'EiM Intro',
        cef_equivalent: 'A1',
        pacing_guide_id: 1,
        certificate_text: 'English in Mind Intro'
      },
      {
        textbook: 'English in Mind 1',
        description: 'EiM 1',
        cef_equivalent: 'A2',
        pacing_guide_id: 1,
        certificate_text: 'English in Mind Level 1'
      },
      {
        textbook: 'English in Mind 2',
        description: 'EiM 2',
        cef_equivalent: 'A2/B1',
        pacing_guide_id: 1,
        certificate_text: 'English in Mind Level 2'
      },
      {
        textbook: 'English in Mind 3',
        description: 'EiM 3',
        cef_equivalent: 'B1/B2',
        pacing_guide_id: 1,
        certificate_text: 'English in Mind Level 3'
      },
      {
        textbook: 'English in Mind 4',
        description: 'EiM 4',
        cef_equivalent: 'B2',
        pacing_guide_id: 1,
        certificate_text: 'English in Mind Level 4'
      },
      {
        textbook: 'English in Mind 5',
        description: 'EiM 5',
        cef_equivalent: 'C1',
        pacing_guide_id: 1,
        certificate_text: 'English in Mind Level 5'
      },
      {
        textbook: '4 Corners 1',
        description: '4C 1',
        cef_equivalent: 'A1',
        pacing_guide_id: 1,
        certificate_text: '4 Corners Level 1'
      },
      {
        textbook: '4 Corners 2',
        description: '4C 2',
        cef_equivalent: 'A2',
        pacing_guide_id: 1,
        certificate_text: '4 Corners Level 2'
      },
      {
        textbook: '4 Corners 3',
        description: '4C 3',
        cef_equivalent: 'B1',
        pacing_guide_id: 1,
        certificate_text: '4 Corners Level 3'
      },
      {
        textbook: '4 Corners 4',
        description: '4C 4',
        cef_equivalent: 'B2+',
        pacing_guide_id: 1,
        certificate_text: '4 Corners Level 4'
      }
    ]);
  });
};
