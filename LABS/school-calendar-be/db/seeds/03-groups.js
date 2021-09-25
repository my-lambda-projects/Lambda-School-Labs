
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {
          groupName: 'A Group',
          groupDescription: 'Group for those in A ;D',
          adminId: 1,
          groupColor: '#f65b1c',
          groupIcon: 'fas fa-star'
        },
        {
          groupName: 'B Group',
          groupDescription: 'Group for those in B >:D',
          adminId: 1,
          groupColor: '#2f95f9',
          groupIcon: 'fas fa-square'
        },
        {
          groupName: 'C Group',
          groupDescription: 'Group for those in C :(',
          adminId: 1,
          groupColor: '#218047',
          groupIcon: 'fas fa-circle'
        },
      ]);
    });
};
