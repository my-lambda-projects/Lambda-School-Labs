const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

server.get('/register', (req, res) => {
    res.send('registration endpoint')
})

server.get('/login', (req, res) => {
    res.send('login endpoint')
})

module.exports = server