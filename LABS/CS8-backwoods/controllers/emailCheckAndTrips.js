const models = require('../models');

const emailCheckAndTrips = (req, res, next) => {
    models.User.findOne(
        {
            where: {
                email: req.params.user
            }
        }
    ).then((user) => {
        if (!user) {
            res.status(423).json({ "error": "User does not exist" })
            return
        }
        // res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName })
        next();
    })
        .catch((err) => {
            console.log('Hello from catch', err)
        });
}

module.exports = { emailCheckAndTrips }