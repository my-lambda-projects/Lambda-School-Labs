const router = require("express").Router();
const Demo = require('./demo-modal');

const restricted = require('../auth/restricted-middleware');

router.post('/', restricted,(req, res) => {
    const demoData = req.body;
    const userId = req.user.subject;
    demoData.user_id = userId;
    Demo.postDemo(demoData)
        .then((demo) => {
            res.status(200).json(demo)
        }).catch((err) => {
            res.status(500).json({message:'Could not grab demographics!'})
        });
});

module.exports = router;