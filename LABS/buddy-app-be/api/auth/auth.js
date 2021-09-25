const db = require('../../data/dbconfig');

module.exports = {
    getUserByEmail,
    addUser
}

function getUserByEmail(email) {
    return db('users')
    .where({email})
    .first()
    
}

function addUser(user) {
    return db('users')
    .insert(user, 'id')
    .then(res => {
        return getUserByEmail(user.email).then(newUser => newUser)
    })
}