const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

server.get('/skills', (req, res) => {
    db.skills_helpers.getAllSkills().then(skillsArr => {
        res.status(200).json(skillsArr)
    }).catch(err => {
        res.status(500).json({message: 'Error at GET list/skills.', err: err})
    })
})

//get skills from search 
server.get('/skills/search/:search', (req, res) => {
    db.skills_helpers.getSimilarSkills(req.params.search).then(skillsArr => {
        res.status(200).json(skillsArr)
    }).catch(err => {
        res.status(500).json({message: "Error searching skills", err: err})
    })
})

module.exports = server