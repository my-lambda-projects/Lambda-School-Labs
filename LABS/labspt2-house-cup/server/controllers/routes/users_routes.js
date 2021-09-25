const express = require("express");
const { User, School, House } = require('../../Models');
const router = express.Router();
const request = require('superagent');

const sequelize = require("../../sequelize");
const {getTokenFromAuth0} = require("../../middleware/user_middleware");

const { jwtCheck } = require('../../auth/Express-jwt');



router.get("/", (req, res, next) => {
  getTokenFromAuth0();
  User.findAll({
    include: [{ model: School, include: [House] }],
    attributes: ["name", "email"]
  })
    .then(allUsers => {
      if (allUsers) {
        res.status(200).json({
          status: true,
          data: {
            allUsers
          }
        });
      } else {
        next({ code: 404 });
      }
    })
    .catch(err => {
      console.log(err, 'error!');
      next({ ...err, code: 500 });
      // res.status(500).json({err})
    });
});

router.post("/register",
  jwtCheck,
  (req, res) => {
    console.log(`Line 64`, req.user)
    req.body.user_id = req.user.sub;
    const userId = req.body.user_id;
    const userObj = req.body;
    User.findOne({ where: { user_id: userId } })
      .then(user => {
        if (user) {
          res
            .status(400)
            .json({ msg: `User with user_id ${userId} already registered.` });
          console.log(`User already registered`)
        } else {
          req.user = user;
          User.create(userObj)
            .then(user => {
              res.status(201).json({
                status: true,
                data: {
                  user
                }
              });
            })
            .catch(err => {
              console.log(`Error from the users/register`, err);
            });

        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: `Something went wrong` });
      });
  }
);

// Update user details -- settings page in the front-end
//1. Get the user details based on the valid token
router.get('/userCredentials', getTokenFromAuth0, jwtCheck, (req, res) => {
  const user_id = req.user.sub;
  request
    .get(`https://venky-yagatilee.auth0.com/api/v2/users/${user_id}`)
    .set('Authorization', 'Bearer ' + req.access_token)
    .then(async (data) => {
      const user = await User.findOne({
        where: {
          user_id: req.user.sub
        },
      })
      res.status(200).json({user: user});
    })
    .catch(err => {
      res.status(404).json({ msg: '403 Forbidden' });
      console.log(err);
    });
});
//2. Update the user payment details
router.patch('/updatebill',
  jwtCheck,
  async (req, res, next) => {
    try {
      const user_id = req.user.sub;
      const paymentDetails = req.body;

      const user = await User.findOne({
        where: {
          user_id: user_id
        },
      });
      console.log(`line 138-- updatebill`, user)
      const updatedUser = user.update(paymentDetails);
      res.status(200).json(updatedUser)
    } catch (err) {
      next({ ...err, code: 500 })
    }

  });


//3. Update the user details (password)
router.patch('/update',
  getTokenFromAuth0,
  jwtCheck,
  (req, res) => {
    const user_id = req.user.sub;
    const update = req.body;
    console.log(`user id`, user_id);
    console.log(`Update`, update)
    // const headers = { Authorization: `Bearer ${req.access_token}` };

    request.patch(`https://venky-yagatilee.auth0.com/api/v2/users/${user_id}`)
      .set('Authorization', 'Bearer ' + req.access_token)
      .send(update)
      .then(data => {
        console.log()
        res.status(200).json({ data: data, msg: `Password Changed Successfully` });
      })
      .catch(err => {
        res.send(403, '403 Forbidden');
        console.log(err);
      });
  });
//Get the paid member details
router.get('/member',
  jwtCheck,
  async (req, res, next) => {
    console.log(`Line 167 user`, req.user)
    try {
      const user_id = req.user.sub;

      const user = await User.findOne({
        where: {
          user_id: user_id
        },
      });
      console.log(`line 177-member`, user)
      // const updatedUser = user.update(paymentDetails);

      res.status(200).json(user)
    } catch (err) {
      next({ ...err, code: 500 })
    }
  });



module.exports = router;
