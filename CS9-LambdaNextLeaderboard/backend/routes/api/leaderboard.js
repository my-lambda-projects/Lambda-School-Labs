const router = require("express").Router();
const Classd = require("../../models/Class");
const validateStudent = require("../../validation/students/studentValidation");


require("dotenv").config();
const axios = require("axios");
const _ = require("lodash");
let huntrData;
let storageData;
let huntrDataFech;

async function fetchGithubData(studentData) {
    // gitDataFetch = []
    console.log('students data:', studentData);

    return (studentData.forEach(async (each, i) => {

        let gitHubHandle = each.github;
        let authStr = "Bearer " + process.env.GITHUB_AUTH_TOKEN; // Add token
        console.log("Inside testing", i)
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
                const distinctSize = _.map(data, _.property('payload.distinct_size'));
                const size = _.map(data, _.property('payload.size'));
                let created_at = _.map(data, _.property('created_at'));
                let stats = _.map(data, _.property('type'));
                let avatar = _.map(data, _.property('actor.avatar_url'));
                stats.forEach((typed, i) => {
                    if (typed === 'PushEvent') {
                        pushCount++
                    } else if (typed === 'ForkEvent') {
                        forkCount++
                    } else if (typed === 'PullRequestEvent') {
                        pullRequestCount++
                    } else if (typed === 'CreateEvent') {
                        createCount++
                    } else {

                    }
                })
                size.forEach((each, i) => {
                    if (each) {
                        totalCommits += each
                    }
                })
                distinctSize.forEach((each, i) => {
                    if (each) {
                        commitsByUser += each
                    }
                })
                gitDataFetch[i] = {
                    'FullName': each.firstname + ' ' + each.lastname,
                    'totalCommits': totalCommits,
                    'commitsByUser': commitsByUser,
                    'pushCount': pushCount,
                    'forkCount': forkCount,
                    'pullRequestCount': pullRequestCount,
                    'createCount': createCount,
                    'size': size,
                    'distinct size': distinctSize,
                    'created': created_at,
                    'stats': stats,
                    'avatar': avatar[0]
                }
                return ({
                    'totalCommits': totalCommits,
                    'commitsByUser': commitsByUser,
                    'pushCount': pushCount,
                    'forkCount': forkCount,
                    'pullRequestCount': pullRequestCount,
                    'createCount': createCount,
                    'size': size,
                    'distinct size': distinctSize,
                    'created': created_at,
                    'stats': stats
                });
            })
            .catch(err => {
                gitDataFetch[i] = {
                    'FullName': each.firstname + ' ' + each.lastname,
                    'error': 'Github handle not found'
                }
                return ({
                    'FullName': each.firstname + ' ' + each.lastname,
                    'error': 'Github handle not found'
                })
            });

    }))

}


async function fetchHuntrData() {
    let token = process.env.huntr_token // Add token

    return await axios
        .get('https://api.huntr.co/org/events', {
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
                wholeData.push(each)
            })
            const givenNameArr = [...(new Set(dataDetails.map(({givenName}) => givenName)))];
            const idArr = [...(new Set(dataDetails.map(({id}) => id)))];
            const familyName = [...(new Set(dataDetails.map(({familyName}) => familyName)))];
            const email = [...(new Set(dataDetails.map(({email}) => email)))];
            const createdAt = [...(new Set(dataDetails.map(({createdAt}) => createdAt)))];
            const isActive = [...(new Set(dataDetails.map(({isActive}) => isActive)))];
            const eventType = [...(new Set(dataDetails.map(({isActive}) => isActive)))];
            const studentsObject = [];
            idArr.forEach((each, i) => {
                studentsObject.push({
                    'id': idArr[i],
                    'firstname': givenNameArr[i],
                    'familyName': familyName[i],
                    'email': email[i],
                    'createdAt': createdAt[i],
                    'isActive': isActive[i],
                    'count': 0,
                    'eventType': [],
                    'date': []
                })
            })
            wholeData.forEach((each) => {
                studentsObject.forEach((student, i) => {
                    if (student.id === each.member.id) {
                        if (each.eventType === "JOB_ADDED") {
                            studentsObject[i].count++
                        }
                        studentsObject[i].eventType.push(each.eventType)
                        studentsObject[i].date.push(each.date)
                    }
                })

            })
            huntrDataFech = studentsObject
            return studentsObject
        })
        .catch(err => console.log(err))
}

router.post("/data", (req, res) => {
    // const { _id } = req.body
    const _id = req.body.id;
    Classd.findById(_id)
        .populate('students')
        .then(async student => {
                gitDataFetch = []
                storageData = await fetchGithubData(student.students)
                huntrData = await fetchHuntrData()
                res.status(201).json({'gitData': gitDataFetch, 'huntr': huntrData})
            }
        )
        .catch(err => res.status(400).json({error: err}))
})

module.exports = router;
