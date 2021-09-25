const axios = require("axios");
require("dotenv").config();

async function fetchHuntrData() {
  let token = process.env.huntr_token; // Add token

  return await axios
    .get("https://api.huntr.co/org/events", {
      // Add user github handle
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const dataDetails = [];
      const wholeData = [];
      res.data.data.forEach((each, i) => {
        dataDetails.push(each.member);
        wholeData.push(each);
      });
      const givenNameArr = [
        ...new Set(dataDetails.map(({ givenName }) => givenName))
      ];
      const idArr = [...new Set(dataDetails.map(({ id }) => id))];
      const familyName = [
        ...new Set(dataDetails.map(({ familyName }) => familyName))
      ];
      const email = [...new Set(dataDetails.map(({ email }) => email))];
      const createdAt = [
        ...new Set(dataDetails.map(({ createdAt }) => createdAt))
      ];
      const isActive = [
        ...new Set(dataDetails.map(({ isActive }) => isActive))
      ];
      const studentsObject = [];
      idArr.forEach((each, i) => {
        studentsObject.push({
          id: idArr[i],
          firstname: familyName[i],
          givenNameArr: givenNameArr[i],
          familyName: familyName[i],
          email: email[i],
          createdAt: createdAt[i],
          isActive: isActive[i],
          count: 0
        });
      });
      wholeData.forEach(each => {
        studentsObject.forEach((student, i) => {
          if (student.id === each.member.id) {
            if (each.eventType === "JOB_ADDED") {
              studentsObject[i].count++;
            }
          }
        });
      });
      huntrDataFech = studentsObject;
      return studentsObject;
    })
    .catch(err => console.log(err));
}

module.exports.fetchHuntrData = fetchHuntrData