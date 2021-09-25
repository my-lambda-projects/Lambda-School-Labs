const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 


const fetchUserId = (req, res) => {
    const email = req.body.email

    User.findOne({where: {email: email}}).then(user => {
        res.status(200).json(user.hashed_id) //sends hashed id instead of plain
        console.log(user.hashed_id)
    }).catch(err => {
        res.status(400).json({Err: "No user found"})
    })
}

module.exports = {
    fetchUserId
}