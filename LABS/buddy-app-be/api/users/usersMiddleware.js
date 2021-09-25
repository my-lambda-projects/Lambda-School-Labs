const Users = require('./users');
module.exports = {
    validateUser,
    validateUpdatedUser
}

function validateUser(req, res, next) {
    const id = req.params.id;
    Users.getUserById(id)
    .then(user => {
        if(user) {
            next()
        } else {
            res.status(404).json({message: "User doesn't exist"})
        }
    })
}

function validateUpdatedUser(req, res, next) {
    const user = req.body;
    if(user.email) {
        next();
    } else if(user.first_name) {
        next()
    } else if(user.last_name) {
        next()
    } else if(user.location) {
        next()
    } else if(user.password) {
        next()
    } else {
        res.status(400).json({message: 'Please provide a valid field'})
    }
}