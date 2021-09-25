require('dotenv').config();
const server = require('./server/server');
// const configureServer = require('./StripeServer/server');
// const configureRoutes = require('./StripeServer/Routes');
const port = process.env.PORT || 5000


// configureServer(server)
// configureRoutes(server)
server.listen(port, () => {
    console.log(`server listening on ${port}`)
})