exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('course').del().then(function() {
    // Inserts seed entries
    return knex('course').insert([
      {
        // 1
        term: 'Spring', // Spring 2018
        course_type: 'General', // General
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 'N/A', // N/A
        level: '1', // Super Safari 1
        section: 'A',
        hourly_rate: '10.00',
        course_schedule: 'Sat / Sun', // Sat / Tue
        room: '6',
        start_time: '09:00',
        end_time: '10:30',
        start_date: new Date(2018, 3, 3),
        end_date: new Date(2018, 5, 28),
        teacher_id: 1,
        notes: '',
        status: 'Completed'
      },
      {
        // 2
        term: 'Fall', // Fall 2018
        course_type: 'Goverment',
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 'N/A', // N/A
        level: '1', // Super Safari 1
        section: 'B',
        hourly_rate: '10.00',
        course_schedule: 'Mon / Tue / Fri', // Sun / Wed
        room: '6',
        start_time: '11:00',
        end_time: '12:30',
        start_date: new Date(2018, 9, 7),
        end_date: new Date(2018, 11, 26),
        teacher_id: 2,
        notes: '',
        status: 'Completed'
      },
      {
        // 3
        term: 'Winter', // Winter 2019
        course_type: 'General',
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 'N/A', // N/A
        level: '1', // Super Safari 1
        section: 'C',
        hourly_rate: '10.00',
        course_schedule: 'Thur / Fri', // Mon / Thu
        room: '5',
        start_time: '16:30',
        end_time: '18:00',
        start_date: new Date(2019, 0, 7),
        end_date: new Date(2019, 2, 28),
        teacher_id: 3,
        notes: '',
        status: 'Completed'
      },
      {
        // 4
        term: 'Spring', // Spring 2019
        course_type: 'General',
        group_type: 'Pri 1-3', // Pri 1-3
        school_grade: 'N/A', // N/A
        level: '7', // Kids Box 1
        section: 'A',
        hourly_rate: '10.000',
        course_schedule: 'Wed / Sat', // Sat / Wed
        room: '4',
        start_time: '10:30',
        end_time: '09:00',
        start_date: new Date(2019, 2, 6),
        end_date: new Date(2019, 4, 26),
        teacher_id: 4,
        notes: '',
        status: 'Completed'
      },
      {
        // 5
        term: 'Spring', // Spring 2019
        course_type: 'Private',
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 'N/A', // N/A
        level: '2', // Super Safari 2
        section: 'A',
        hourly_rate: '10.00',
        course_schedule: 'Mon / Tue / Fri', // Mon / Wed
        room: '4',
        start_time: '16:30',
        end_time: '18:30',
        start_date: new Date(2020, 3, 1),
        end_date: new Date(2020, 4, 6),
        teacher_id: 1,
        notes: '',
        status: 'Completed'
      },
      {
        // 6
        term: 'Fall', // Fall 2019
        course_type: 'Goverment', // Government
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 'N/A', // KG 2
        level: '2', // Super Safari 2
        section: 'B',
        hourly_rate: '10.00',
        course_schedule: 'Mon / Wed / Fri', // Sun / Tue / Wed
        room: '3',
        start_time: '11:00',
        end_time: '12:30',
        start_date: new Date(2019, 9, 5),
        end_date: new Date(2019, 11, 25),
        teacher_id: 2,
        notes: 'Some notes about this course',
        status: 'Completed'
      },
      {
        // 7
        term: 'Winter', // Winter 2020
        course_type: 'General', // General
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 'N/A', // N/A
        level: '2', // Super Safari 2
        section: 'C',
        hourly_rate: '10.00',
        course_schedule: 'Mon / Fri', // Sat / Tue
        room: '2',
        start_time: '09:00',
        end_time: '10:30',
        start_date: new Date(2020, 0, 4),
        end_date: new Date(2020, 2, 30),
        teacher_id: 3,
        notes: '',
        status: 'Completed'
      },
      {
        // 8
        term: 'Spring', // Spring 2020
        course_type: 'General', // General
        group_type: 'KG 1-3', // KG 1-3
        school_grade: 1, // N/A
        level: 'N/A', // Super Safari 3
        section: 'A',
        hourly_rate: '10.00',
        course_schedule: 'Sun / Wed', // Sun / Wed
        room: '1',
        start_time: '16:30',
        end_time: '18:30',
        start_date: new Date(2020, 3, 4),
        end_date: new Date(2020, 5, 24),
        teacher_id: 4,
        notes: '',
        status: 'Waitlist'
      }
    ]);
  });
};
