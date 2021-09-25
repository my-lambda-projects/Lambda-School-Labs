
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {userName: 'Mike Jones', phone: '555-55555', email: 'mjones@gmail.com', isAdmin: true, familyID: 1},
        {userName: 'Barb Jones', phone: '555-55556', email: 'bjones@gmail.com', isAdmin: false, familyID: 1},
        {userName: 'Jenn Jones', phone: '555-55557', email: 'jjones@gmail.com', isAdmin: false, familyID: 1},
        {userName: 'Lenn Jones', phone: '555-55557', email: 'ljones@gmail.com', isAdmin: false, familyID: 1},
        {userName: 'Steve Smith', phone: '555-55558', email: 'ssmith@gmail.com', isAdmin: true, familyID: 2},
        {userName: 'Linda Smith', phone: '555-55559', email: 'lsmith@gmail.com', isAdmin: false, familyID: 2},
        {userName: 'Jack Smith', phone: '555-55550', email: 'jsmith@gmail.com', isAdmin: false, familyID: 2},
      ]);
    });
};
