const jwt = require('jsonwebtoken');
const Employer = require('../models/EmployerModel');

mysecret = 'authentication isnt working';

const login = (req, res) => {
    const { username, password } = req.body;

    Employer
        .findOne( { username }, (error, employer) => {
            if(error) {
                return res.status(403).json({ error: 'Invalid Username/Password'});
            }
            if(employer === null) {
                return res.status(422).json( {error: 'No Employer with that username was found. :('});
            }
            employer.checkPassword(password, (nonmatch, hashMatch) => {
                if (nonmatch != null) {
                    return res.status(422).json({ error: 'Invalid Password!'});
                }
                if (hashMatch) {
                    const payload = {
                        username: employer.username,
                        admin: employer.admin
                    };
                    const token = jwt.sign(payload, mysecret);
                    let id = employer.id;
                    console.log("login: ",id, token);
                    res.status(200).json( {token, id})
                }
            });
        });
};

module.exports = {
    login
};