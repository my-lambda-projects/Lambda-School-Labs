
exports.seed = function(knex, Promise) {
  return knex('users').insert([   
    { username: 'testing1', password: 'testingseed1', email: 'testing1@gmail.com', userString: "123456" },
    { username: 'testing2', password: 'testingseed2', email: 'testing2@gmail.com', userString: "123457"},
    { username: 'testing3', password: 'testingseed3', email: 'testing3@gmail.com', userString: "123458"},
    { username: 'testing4', password: 'testingseed4', email: 'testing4@gmail.com', userString: "123459"},
    { username: 'testing5', password: 'testingseed5', email: 'testing5@gmail.com', userString: "123455"},
    { username: 'testing6', password: 'testingseed6', email: 'testing6@gmail.com', userString: "123454"},
    { username: 'testing7', password: 'testingseed7', email: 'testing7@gmail.com', userString: "123453"},
  ]);
};
