const faker = require("faker");
const createFakerUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email()
});
exports.seed = async function(knex, Promise) {
  await knex("users").del();
  // Users
  const fakeUsers = [];
  const desiredFakeUsers = 200;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakerUser());
  }

  await knex("users").insert(fakeUsers);
};
