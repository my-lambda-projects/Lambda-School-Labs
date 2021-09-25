const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

function distance(lat1, lon1, lat2, lon2, miles) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return true;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;

        if (dist < miles) {
            return true;
        } else {
            return false;
        }
    }
}

filterJob = (allArray, params) => {
    let newArr = allArray.filter(user => {
        if(user.area_of_work){
            return params.filters.includes(user.area_of_work)
        }
    })
    return newArr
}

filterLocation = (allArray, params) => {    
    let newArr = allArray.filter(user => {
        if(user.current_location_lat && user.current_location_lon){
            return distance(
                params.locatedLat, 
                params.locatedLon, 
                user.current_location_lat, 
                user.current_location_lon, 
                params.milesFrom)
        }
    })
    return newArr
}
    
filterReLocation = (allArray, params) => {
    let newArr = allArray.filter(user => {
        if(user.interested_location_names){
            let arr = user.interested_location_names.split('|')
            return arr.includes(params.relocateName)
        }
        if(user.current_location_lat && params.relocateLat){
            return distance(
                params.relocateLat, 
                params.relocateLon, 
                user.current_location_lat, 
                user.current_location_lon, 
                40)
        }
    })
    return newArr
}

//get all users for card view
server.post('/filter', (req, res) => {
    db.user_helpers.getUsers().then(users => {
        req.body.users = users
        let filteredArr = []

        if(req.body.filters.length > 0){
            filteredArr = filterJob(users, req.body)
        } else {
            filteredArr = users
        }
        return filteredArr
    }).then(filteredArr => {
        if(req.body.relocateName){
            if(filteredArr.length > 0){
                filteredArr = filterReLocation(filteredArr, req.body)
            } else {
                filteredArr = filterReLocation(req.body.users, req.body)
            }
        }
        return filteredArr
    }).then(filteredArr => {
        if(req.body.locatedLat){
            if(filteredArr.length > 0){
                filteredArr = filterLocation(filteredArr, req.body)
            } else {
                filteredArr = filterLocation(req.body.users, req.body)
            }
        }
        return filteredArr
    }).then(filteredArr => {
        let count = 0;
        let shortendArr = filteredArr.filter(item => {
            count++
            if(count <= req.body.numOfResultsToReturn){
                return item
            }
        })

        let usersFound = filteredArr.length
        let usersReturned = shortendArr.length

        let returnPackage = {
            usersArr: shortendArr,
            usersFound: usersFound,
            usersReturned: usersReturned
        }

        res.status(200).json(returnPackage)
    }).catch(err => {
        console.log("there is an error in GET users/", err, err.message)
        res.status(500).json({message: "there is an error in GET users/", err: err, msg: err.message})
    })
})
//session maybe for optimization?

//get all users for card view
server.get('/', (req, res) => {
    db.user_helpers.getUsers().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.log("there is an error in GET users/", err)
        res.status(500).json({message: "there is an error in GET users/", err: err})
    })
})

//get specific user for user profile
server.get('/:email', (req, res) => {
    db.user_helpers.getUsers(req.params.email).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        console.log("error fetching data at GET users/:email", err)
        res.status(500).json({ message: "error fetching data at GET users/:email", err: err });
    })
})

//add user
//expects req.body with email, first_name, last_name at minimum
//email must be unique in database
//empty values will fill with null
server.post('/new', (req, res) => {
    db.user_helpers.getUsers(req.body.email).then(user => {
      if(user){
        res.status(200).json(user)
      } else {
        db.user_helpers.addUser(req.body).then(user2 => {
            res.status(200).json(user2)
        }).catch(err => {
            console.log(err)
        })
      }
    }).catch(err => {
      console.log("error posting data at POST users/new", err)
      res.status(500).json({ message: "error posting data at POST users/new", err: err });
    })
  })

server.put('/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    db.user_helpers.editUser(req.params.id, req.body).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message: "error editing user data", err: err})
    })
})

server.delete('/:id', (req, res) => {
    db.user_helpers.deleteUser(req.params.id).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message: "error deleting user", err: err})
    })
})

//get skills
//expects type in path param as either "top_skills" "add_skills" or "familiar" 
server.get('/:id/skills/:type', (req, res) => {
    db.getUserSkills(req.params.id, req.params.type).then(skills => {
        res.status(200).json(skills)
    }).catch(err => {
        console.log("there is an error in users/:id/:type", err)
        res.status(500).json({message: "there is an error in users/:id/:type", err: err})
    })
})

//add a skill *from* the skill bank
//expects user id and skill type in path params
//expects skill id in req.body ex."id":"1"
server.post('/:user_id/addskills/:type', (req, res) => {
    db.user_helpers.getUserSkillID(req.params.user_id, req.params.type).then(oldSkillsList => {
        if (oldSkillsList[req.params.type] === null) {
            db.addKeywords(req.params.user_id, req.params.type, `${req.body['id']}`).then(resdata => {
                res.status(200).json(resdata)
            })
        } else {
        let newSkills = oldSkillsList[req.params.type] + `,${req.body['id']}`
        db.addKeywords(req.params.user_id, req.params.type, newSkills).then(data => {
            res.status(200).json(data)
        })}}).catch(err => {
            console.log("error adding from skill bank", err)
            res.status(500).json({message: "error adding from skill bank", err: err})
    })
})

//add a completely new skill to the skill bank
//expects user id and skill type in path params
//expects skill name in req.body ex. "skill": "Python" 
server.post('/:user_id/createskill/:type', (req, res) => {
    db.createKeywords(req.body).then(async function(data) {
        let oldSkills = await db.user_helpers.getUserSkillID(req.params.user_id, req.params.type);
        if (oldSkills[req.params.type] === null) {
            db.addKeywords(req.params.user_id, req.params.type, `${data}`).then(resdata => {
                res.status(200).json(resdata)
            })
        } else {
            oldSkills = oldSkills[req.params.type] + `,${data}`
            db.addKeywords(req.params.user_id, req.params.type, oldSkills).then(resdata => {
                res.status(200).json(resdata)
            }).catch(err => {
                res.status(500).json({message: "there is an error in users/addskill/:id/:type at addKey", err: err})
            })
        }
    }).catch(err => {
        res.status(500).json({message: "there is an error in users/createskill/:id/:type at createKey", err: err})
    })
})

//delete skill from user (cannot remove from skillbank as other users may be using it)
server.post('/:user_id/deleteskill/:skillType/:skillID', (req, res) => {
    db.user_helpers.getUserSkillID(req.params.user_id, req.params.skillType).then(oldSkillList => {

        let oldskillarr = oldSkillList[req.params.skillType].split(",")
        oldskillarr.splice(oldskillarr.indexOf(`${req.params.skillID}`), 1)
        oldskillarr = oldskillarr.join(",")
        db.addKeywords(req.params.user_id, req.params.skillType, oldskillarr).then(response => {
            res.status(200).json(response)
        })
    }).catch(err => {
        res.status(500).json({err: err})
    })
})

//gets projects, experience, or education 
//expects one of the above terms in place of "extras" in path param. ex. '/:userid/education'
server.get('/:user_id/:extras', (req, res) => {
    db.getExtras(req.params.user_id, req.params.extras).then(extras => {
        res.status(200).json(extras)
    }).catch(err => {
        res.status(500).json({message: "error fetching data", err: err})
    })
})

//add project, experience, or education
//req.body expectations for project: "user_id", "project_title", "project_description"
//"link", "project_img" 
//for experience: "user_id", "job_title", "job_description", "job_dates"
//for education: "user_id", "school", "school_dates", "degree", "course"
//only user_id and title/school are required for a post
server.post('/:user_id/:extras', (req, res) => {
    db.addExtra(req.params.extras, req.body).then(extra => {
        res.status(200).json(extra)
    }).catch(err => {
        res.status(500).json({message: "error adding extras data", err: err})
    })
})

//edit project/experience/education
//expects project/experience/education ID as param extrasID
//expects edited fields in req.body
server.put('/:user_id/:extras/:extras_id', (req, res) => {
    console.log(req.params)
    console.log(req.body)
    db.editExtra(req.params.extras_id, req.params.extras, req.body).then(extra => {
        res.status(200).json(extra)
        console.log("updated")
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: "error editing extras data", err: err})
    })
})

server.delete('/:user_id/:extras/:extras_id', (req, res) => {
    db.deleteExtra(req.params.extras_id, req.params.extras).then(extra => {
        res.status(200).json(extra)
    }).catch(err => {
        res.status(500).json({message: "error deleting extras data", err: err})
    })
})

module.exports = server