const express = require('express');
const { School, User, House } = require('../../Models');
// we need the mergeParams set to true because the school id in the params is being set
// from server.js and by default we don't have access to that param, mergeParams makes sure
// that we get the params from the other handlers
const router = express.Router({ mergeParams: true, });
const { jwtCheck } = require('../../auth/Express-jwt.js');
// we need the "get" function from lodash
const _ = require('lodash');

router.get('/schools/houses/data', jwtCheck, async function (req, res, next) {
  try {

    const user = await User.findOne({
      where: {
        user_id: req.user.sub
      },
    });
    //  console.log(`Houses line 19`, user.id)
    const school = await School.findOne({
      where: {
        userId: user.id,
      }
    });
    //  console.log(`houses`, school)
    if (!school) return next({ code: 404 });
    const houses = await school.getHouses();
    //  console.log(`Line28`, houses)
    return res.status(200).json(houses);

  } catch (err) {
    next(err);
  }
});
// get all houses for a particular school
// remember we have a hidden "id" parameter in this url, we don't see it here because it is a nested route
// this is why we needed mergeParams set on the express Router
router.get('/schools/:id/houses', async function (req, res, next) {
  try {
    // find the school referenced by the ID
    console.log(`Line number 18`, req.params.id)
    const school = await School.findByPk(req.params.id);
    // if the school doesn't exist send a 404
    if (!school) return next({ code: 404 });
    // since we already established that schools have many houses - we can make use of the "getHouses"
    // function that sequelize has created for us - this will perform the necessary join
    const houses = await school.getHouses();
    const sortedHouses = houses.sort((a, b) => { return a.id - b.id });
    return res.json(sortedHouses);
  } catch (err) {
    next(err);
  }
});
// get details of just one house in a school
router.get('schools/:id/houses/:houseId', async function (req, res) {
  // first find the house by primary key, while getting the house let's also
  // include the school and the owner details for convenience
  const house = await House.findByPk(req.params.houseId, {
    include: [
      {
        model: School,
        // you can nest include properties to any number of levels, sequelize will do a join for every include
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'isAdmin'] }, // by default sequelize queries for all the fields, we don't want to reveal the password hash and the admin flag to the user, hence we exclude it here
          },
        ],
      },
    ],
  });

  // if the house doesn't exist send a 404
  if (!house) return next({ code: 404 });

  res.json(house);
});

// create a new house in that particular school
// again, we have the hidden "id" parameter from the parent route
router.post('/schools/:id/houses', jwtCheck, async function (req, res, next) {
  try {
    // find the school by primary key using the forwared "id" magic parameter
    const school = await School.findByPk(req.params.id);

    // if the school doesn't exists throw a 404
    if (!school) return next({ code: 404 });

    // get the details of the currently logged in user
    const user = await User.findOne({
      where: {
        user_id: req.user.sub,
      },
    });

    // check if this user is the owner of the school, we will only allow the owners to add houses
    if (Number(school.userId) !== Number(user.id)) {
      return res.status(403).json({
        message: 'You are not authorized to make changes to this school. ',
      });
    }
    // if it gets here then the user is good, lets create the house
    // here we make use of the special function sequelize has created for us,
    // this is possible because earlier we made the associations saying schools have many houses
    // calling this function will automatically populate the schoolId field in the houses table for us
    const newHouse = await school.createHouse(req.body);

    res.json(newHouse);

    // const newHouse = await House.findOrCreate({
    //   where: {
    //     name: req.body.name
    //   },
    //   defaults: {
    //     name: req.body.name,
    //     color: req.body.color,
    //     schoolId: req.body.schoolId
    //   }
    // });
    // return res.json({
    //   status: true,
    //   data: {
    //     newHouse,
    //   }
    // })
  } catch (err) {
    next(err);
  }
});


// update a house from a particular school
// even though the house ID is globally unique, we still need the user to specify the school Id and the house ID
// in the URL for uniformity
// again we have the hidden "id" paramater available to us
router.put('/:houseId', jwtCheck, async function (req, res, next) {
  // find the particular house with the primary key
  const house = await House.findByPk(req.params.houseId, {
    include: [
      {
        model: School,
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'isAdmin'] },
          },
        ],
      },
    ],
  });

  // if the house doesn't exist send a 404
  if (!house) return next({ code: 404 })

  // get the details of the currently logged in user
  const loggedInUser = await User.findOne({
    where: {
      user_id: req.user.sub
    },
  });

  // this is redundant but doesn't hurt us in any way
  if (!loggedInUser) return next({ code: 403 });


  // check if the logged in user is the owner of the school in which this house is present
  // here we take advantage of the lodash's "get" function, the get function takes an object
  // and a string and gets the value at that path, if the path is wrong it returns undefined
  // normally that would result in an error and cause the program to crash, but using get function is safe
  if (Number(loggedInUser.id) !== Number(_.get(house, 'school.user.id'))) {
    return res.status(403).json({
      message: 'You are not authorized to make changes to this school. ',
    });
  }
  // everything's good now we can just update the house calling the sequelize update method
  const selector = {
    where: {
      id: req.body.id
    },
  }

  const updatedHouse = await house.update(req.body, selector);
  res.json(updatedHouse);
});

// delete a particular house from a school
// again hidden "id" parameter is available for us to query the school
router.delete('/:houseId', jwtCheck, async function (req, res, next) {
  // find the house by primary key
  const house = await House.findByPk(req.params.houseId, {
    include: [
      {
        model: School,
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'isAdmin'] },
          },
        ],
      },
    ],
  });

  // if the house doesn't exist throw a 404
  if (!house) return next({ code: 404 });

  // get the details of the logged in user
  const loggedInUser = await User.findOne({
    where: {
      user_id: req.user.sub
    },
  });

  // redundant but safety check
  if (!loggedInUser) return next({ code: 403 });

  // check if the user is owner, here again we take advantage of the lodash get function to avoid any errors
  if (Number(loggedInUser.id) !== Number(_.get(house, 'school.user.id'))) {
    return res.status(403).json({
      message: 'You are not authorized to make changes to this school. ',
    });
  }

  // if we got here that means the user can delete the house
  // make use of the handy destroy method from sequelize
  await house.destroy();
  res.json(house);
});

module.exports = router;
