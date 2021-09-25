const models = require('../models');

const changePassword = (req, res) => {
    models.User.update(req.body, {
        where: {
            email: req.body.email,
        },
        individualHooks: true
    }).then(user => {
        res.json(user)
    }).catch(err => {
        res.send(err)
    })
};

module.exports = { changePassword };

