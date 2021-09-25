var fs = require("fs");
var faker = require("faker/index");

var usersObject = {}; // empty Object
var key = "Employers";
usersObject[key] = []; //empty Array, values are push()-ed here

for (var userCount = 10; userCount > 0; userCount--) {
  //user
  var user = {
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    companyName: faker.company.companyName(),
    photo: faker.image.avatar(),
    summary: faker.company.catchPhrase(),
    confirmBeforeSpending: faker.random.boolean(),
    jobs: []
  };

  //job
  user["jobs"] = [];
  var numberOfJobs = faker.random.number({ min: 1, max: 5 });
  for (var jobsCount = numberOfJobs; jobsCount > 0; jobsCount--) {
    var job = {
      title: faker.name.jobTitle(),
      salary: faker.finance.amount(20000, 200000, 2),
      topSkills: [],
      additionalSkills: [],
      familiarWith: [],
      description: faker.lorem.paragraph(),
      requirements: faker.lorem.paragraph()
    };

    //topSkill
    job["topSkills"] = [];
    var numberOfTopSkills = faker.random.number({ min: 1, max: 5 });
    for (
      var topSkillsCount = numberOfTopSkills;
      topSkillsCount > 0;
      topSkillsCount--
    ) {
      var topSkill = faker.name.jobArea();
      job["topSkills"].push(topSkill);
    }

    //additionalSkill
    job["additionalSkills"] = [];
    var numberOfAdditionalSkills = faker.random.number({ min: 1, max: 5 });
    for (
      var additionalSkillsCount = numberOfAdditionalSkills;
      additionalSkillsCount > 0;
      additionalSkillsCount--
    ) {
      var additionalSkill = faker.hacker.ingverb();
      job["additionalSkills"].push(additionalSkill);
    }

    //familiarWith
    job["familiarWith"] = [];
    var numberOfFamiliarWith = faker.random.number({ min: 1, max: 5 });
    for (
      var familiarWithCount = numberOfFamiliarWith;
      familiarWithCount > 0;
      familiarWithCount--
    ) {
      var familiarWithSkill = faker.company.bsNoun();
      job["familiarWith"].push(familiarWithSkill);
    }

    user["jobs"].push(job);
  }

  usersObject[key].push(user);
}

fs.writeFile(`../${key}.data.json`, JSON.stringify(usersObject), err => {
  if (err) throw err;
  console.log(key + " data successfully written to file!");
});
