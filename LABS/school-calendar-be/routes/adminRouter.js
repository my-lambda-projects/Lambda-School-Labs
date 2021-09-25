const router = require('express').Router();
const Admin = require('../model/adminModel');

// middleware to check whether user exists
const {checkforAdmin} = require('../api/middleware/authenticator');


// post endpoint to add admin to the table
router.post('/', checkforAdmin, (req, res) => {
    // get the admin info from request body
    const adminInfo = {
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId
    }
    // add the admin to database
    Admin.addAdmin(adminInfo)
        .then(response => {
            console.log('Posted?', response);
            // respond with the adminId for admin created
            res.status(200).json({ message: 'admin posted', adminId: response[0].id});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Error posting the admin'})
        })
})

module.exports = router;
