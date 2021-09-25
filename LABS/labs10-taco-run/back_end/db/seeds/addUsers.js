const faker = require("faker");

const createFakeUser = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email()
})

exports.seed = async function(knex, Promis) {
  const fakeUsers = []
  const desiredFakers = 500;
  for (let i = 0; i < desiredFakers; i++){
    fakeUsers.push(createFakeUser());
  }
  await knex("users")
    .insert(fakeUsers)
};
