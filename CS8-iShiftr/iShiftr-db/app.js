const mongoose = require('mongoose');
const server   = require('./server');
const port     = process.env.PORT || 5000;
require("dotenv").config();

// .connect('mongodb://localhost/iShiftr')
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> {
        console.log('\n\n--Connected to the Database Successfully--\n\n');
    })
    .catch((error) => {
        console.log('\n\n--There was an error connecting to the database--\n\n', error);
    })


server.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`\n\n--Server rolling and chilling on port ${port} with y'all--\n\n`);
})