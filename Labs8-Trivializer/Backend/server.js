require('dotenv').config()          // dotenv allows you to use environment variables, which allows you to swap out sensitive information like passwords wuth variable sin a .env file
const server = require('express')() // Create instance of Express
require('./api/middleware')(server) // Pass that instance to both middleware and route handlers
require('./api/apiRouter')(server)

const port = 3300
server.listen((process.env.PORT || port), () => {          // Uses port 3300 locally, or server assigned port when deployed
    console.log(`server running on port ${port}\n`)
})
