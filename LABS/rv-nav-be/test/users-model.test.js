const db = require('../database/dbconfig.js');
const users = require('../users/users-model');

describe('user model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('add function', () => {
    it('inserts users into the DB', async () => {
      let userCount = await db('users');
      expect(userCount).toHaveLength(0);
      await users.add({ username: 'dev',
                        first_name: 'devin',
                        last_name: 'dims',
                        password: 'test',
                        email: 'dev@test.com'});
      userCount = await db('users');
      expect(userCount).toHaveLength(1);
    });

    it('inserts the provided user into the database', async () => {
      let user = await users.add({  
        username: 'Kev',
        first_name: 'Kevin',
        last_name: 'Sims',
        password: 'test',
        email: 'kev@test.com'
      });
      expect(user.username).toBe('Kev');
      expect(user.password).toBe('test');
      expect(user.email).toBe('kev@test.com');
    });
  });

//   describe('delete user function', () => {
//     it('deletes the specified user from the database', async () => {
//       let userCount = await db('users');
//       expect(userCount).toHaveLength(0);
//       await users.add({ username: 'sev',
//                         first_name: 'Sevin',
//                         last_name: 'Kims',
//                         password: 'test',
//                         email: 'Sev@test.com'});
//       userCount = await db('users');
//       expect(userCount).toHaveLength(1);
//       await users.deleteUser(1);
//       userCount = await db('users');
//       expect(userCount).toHaveLength(0);
//     });
//   });
describe('findUsers function', () => {
  it('returns list of all users ', async () => {
    await users.add({ username: 'ron',
                      first_name: 'ron',
                      last_name: 'kerr',
                      password: 'test',
                      email: 'ron@test.com'});
    await users.add({ username: 'jon',
                      first_name: 'jon',
                      last_name: 'doe',
                      password: 'test',
                      email: 'jon@test.com'});
    const user = await users.findUsers();
    expect(user).toHaveLength(2);
  });
});

  describe('findById function', () => {
    it('finds a specific user using provided id', async () => {
      await users.add({ username: 'chris',
                        first_name: 'chris',
                        last_name: 'maul',
                        password: 'test',
                        email: 'chris@test.com'});
      await users.add({ username: 'bob',
                        first_name: 'bob',
                        last_name: 'bob',
                        password: 'test',
                        email: 'bob@test.com'});
      const secondOne = await users.findById(2);
      expect(secondOne.username).toBe('bob');
    });
  });

});
