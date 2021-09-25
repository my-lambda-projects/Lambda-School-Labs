var fs = require("fs");
var faker = require("faker/index");

var usersObject = {}; // empty Object
var key = "Seekers";
usersObject[key] = []; //empty Array, values are push()-ed here

for (var userCount = 10; userCount > 0; userCount--) {
  //user
  var user = {
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    desiredTitle: faker.name.jobTitle(),
    photo: faker.image.avatar(),
    summary: faker.hacker.phrase(),
    topSkills: [],
    additionalSkills: [],
    familiarWith: [],
    experience: faker.lorem.paragraph(),
    education: faker.lorem.paragraph(),
    confirmBeforeSpending: faker.random.boolean()
  };
  //topSkill
  user["topSkills"] = [];
  var numberOfTopSkills = faker.random.number({ min: 1, max: 5 });
  for (
    var topSkillsCount = numberOfTopSkills;
    topSkillsCount > 0;
    topSkillsCount--
  ) {
    var topSkill = faker.name.jobArea();
    user["topSkills"].push(topSkill);
  }

  //additionalSkill
  user["additionalSkills"] = [];
  var numberOfAdditionalSkills = faker.random.number({ min: 1, max: 5 });
  for (
    var additionalSkillsCount = numberOfAdditionalSkills;
    additionalSkillsCount > 0;
    additionalSkillsCount--
  ) {
    var additionalSkill = faker.hacker.ingverb();
    user["additionalSkills"].push(additionalSkill);
  }

  //familiarWith
  user["familiarWith"] = [];
  var numberOfFamiliarWith = faker.random.number({ min: 1, max: 5 });
  for (
    var familiarWithCount = numberOfFamiliarWith;
    familiarWithCount > 0;
    familiarWithCount--
  ) {
    var familiarWithSkill = faker.company.bsNoun();
    user["familiarWith"].push(familiarWithSkill);
  }

  usersObject[key].push(user);
}

fs.writeFile(`../${key}.data.json`, JSON.stringify(usersObject), err => {
  if (err) throw err;
  console.log(key + " data successfully written to file!");
});
