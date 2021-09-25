const axios = require("axios");
require("dotenv").config();

async function fetchGithubData(studentData) {
  // gitDataFetch = []

  return studentData.forEach(async (each, i) => {
    let gitHubHandle = each.github;
    let authStr = "Bearer " + process.env.GITHUB_AUTH_TOKEN; // Add token
    console.log("Inside testing", i);
    return await axios
      .get(`https://api.github.com/users/${gitHubHandle}/events/public`, {
        headers: {
          Authorization: authStr
        }
      })
      .then(res => {
        let pushCount = 0;
        let forkCount = 0;
        let pullRequestCount = 0;
        let createCount = 0;
        let commitsByUser = 0;
        let totalCommits = 0;
        const data = res.data;
        const distinctSize = _.map(data, _.property("payload.distinct_size"));
        const size = _.map(data, _.property("payload.size"));
        let created_at = _.map(data, _.property("created_at"));
        let stats = _.map(data, _.property("type"));
        stats.forEach((typed, i) => {
          if (typed === "PushEvent") {
            pushCount++;
          } else if (typed === "ForkEvent") {
            forkCount++;
          } else if (typed === "PullRequestEvent") {
            pullRequestCount++;
          } else if (typed === "CreateEvent") {
            createCount++;
          } else {
          }
        });
        size.forEach((each, i) => {
          if (each) {
            totalCommits += each;
          }
        });
        distinctSize.forEach((each, i) => {
          if (each) {
            commitsByUser += each;
          }
        });
        gitDataFetch[i] = {
          FullName: each.firstname + " " + each.lastname,
          totalCommits: totalCommits,
          commitsByUser: commitsByUser,
          pushCount: pushCount,
          forkCount: forkCount,
          pullRequestCount: pullRequestCount,
          createCount: createCount,
          size: size,
          "distinct size": distinctSize,
          created: created_at,
          stats: stats
        };
        return {
          totalCommits: totalCommits,
          commitsByUser: commitsByUser,
          pushCount: pushCount,
          forkCount: forkCount,
          pullRequestCount: pullRequestCount,
          createCount: createCount,
          size: size,
          "distinct size": distinctSize,
          created: created_at,
          stats: stats
        };
      })
      .catch(err => {
        gitDataFetch[i] = {
          FullName: each.firstname + " " + each.lastname,
          error: "Github handle not found"
        };
        return {
          FullName: each.firstname + " " + each.lastname,
          error: "Github handle not found"
        };
      });
  });
}

module.exports.fetchGithubData = fetchGithubData