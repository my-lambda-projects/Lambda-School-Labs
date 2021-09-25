const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');
const dotenv = require('dotenv');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const request = require('superagent');

const configureRoutes = require('./routes/index');

dotenv.config();

const server = express();

const whitelist = [
  'https://workout-tracker-pt2.netlify.com',
  'http://localhost:3000'
];

const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

server.use(express.json());
server.use(cors(corsOptions));

const NON_INTERACTIVE_CLIENT_ID = '4h2Q9JyNTYzk8gHFD1BH55QLgKurtCH0';
const NON_INTERACTIVE_CLIENT_SECRET =
  'v-8R6RRNgOGPszr9qfgBd_ow6BaepyXJB83q-JxQPZQBBTO5yTNaBPr2sVje8O8Q';

const authData = {
  client_id: NON_INTERACTIVE_CLIENT_ID,
  client_secret: NON_INTERACTIVE_CLIENT_SECRET,
  grant_type: 'client_credentials',
  audience: 'https://workout-tracker-pt2.auth0.com/api/v2/'
};

function getAccessToken(req, res, next) {
  request
    .post('https://workout-tracker-pt2.auth0.com/oauth/token')
    .send(authData)
    .end(function(err, res) {
      if (res.body.access_token) {
        req.access_token = res.body.access_token;
        next();
      } else {
        res.send(401, 'Unauthorized');
      }
    });
}

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://workout-tracker-pt2.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://workout-tracker-pt2.herokuapp.com/',
  issuer: 'https://workout-tracker-pt2.auth0.com/',
  algorithms: ['RS256']
});

//custom middleware to check if resource exists

function checkForResource(req, res, resource) {
  if (resource.length) {
    res.status(200).json(resource);
  } else {
    res
      .status(404)
      .json({ message: 'The resource does not exist or is currently empty.' });
  }
}

server.get('/', (req, res) => {
  res.send({ message: 'working so far' });
});

configureRoutes(server);

//ENDPOINT TO GET USER INFO USING MANAGEMENT API

server.get('/userinfo', getAccessToken, checkJwt, (req, res) => {
  const user_id = req.user.sub;
  request
    .get(`https://workout-tracker-pt2.auth0.com/api/v2/users/${user_id}`)
    .set('Authorization', 'Bearer ' + req.access_token)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.send(403, '403 Forbidden');
      console.log(err);
    });
});

//ENDPOINT TO UPDATE USER INFO USING MANAGEMENT API

server.patch('/userupdate', getAccessToken, checkJwt, (req, res) => {
  const user_id = req.user.sub;
  const update = req.body;
  request
    .patch(`https://workout-tracker-pt2.auth0.com/api/v2/users/${user_id}`)
    .set('Authorization', 'Bearer ' + req.access_token)
    .send(update)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.send(403, '403 Forbidden');
      console.log(err);
    });
});

server.post('/api/userUpdate', checkJwt, (req, res) => {});

//ENDPOINT TO GET USER CATEGORIES AND EXERCISES
server.get('/api/users', checkJwt, (req, res) => {
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('categories as c')
        .join('users as u', 'u.id', 'c.userId')
        .select('c.id', 'c.categoryName')
        .whereIn('c.userId', [1, id.id])
        .pluck('c.id')
        .then(categories => {
          db('exercises as e')
            .join('categories as c', 'c.id', 'e.categoryId')
            .select(
              'e.id as id',
              'e.exerciseName as exerciseName',
              'c.id as categoryId',
              'c.categoryName as category'
            )
            .whereIn('e.categoryId', categories)
            .then(exercises => {
              checkForResource(req, res, exercises);
            })
            .catch(err => {
              console.log('error', err);
              res.status(500).json({
                error: 'The exercise information could not be retrieved.'
              });
            });
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The categories information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The specified user info could not be retrieved' });
    });
});

//ENDPOINT TO CREATE A USER V2

server.post('/api/users', checkJwt, (req, res) => {
  req.body.user_id = req.user.sub;
  const user = req.body;
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .then(rows => {
      if (rows.length === 0) {
        db('users')
          .returning('id')
          .insert(user)
          .then(id => {
            db('categories as c')
              .join('users as u', 'u.id', 'c.userId')
              .select('c.id', 'c.categoryName')
              .whereIn('c.userId', [1, id[0]])
              .pluck('c.id')
              .then(categories => {
                db('exercises as e')
                  .join('categories as c', 'c.id', 'e.categoryId')
                  .select(
                    'e.id as id',
                    'e.exerciseName as exerciseName',
                    'c.id as categoryId',
                    'c.categoryName as category'
                  )
                  .whereIn('e.categoryId', categories)
                  .whereIn('e.userId', [1, id[0]])
                  .then(exercises => {
                    checkForResource(req, res, exercises);
                  })
                  .catch(err => {
                    console.log('error', err);
                    res.status(500).json({
                      error: 'The exercise information could not be retrieved.'
                    });
                  });
              })
              .catch(err => {
                console.log('error', err);
                res.status(500).json({
                  error: 'The categories information could not be retrieved.'
                });
              });
          })
          .catch(err => {
            console.log('error', err);
            res.status(500).json({
              error: 'There was an error saving the user to the database.'
            });
          });
      } else {
        db('users')
          .select('id')
          .where('user_id', req.user.sub)
          .first()
          .then(id => {
            db('categories as c')
              .join('users as u', 'u.id', 'c.userId')
              .select('c.id', 'c.categoryName')
              .whereIn('c.userId', [1, id.id])
              .pluck('c.id')
              .then(categories => {
                db('exercises as e')
                  .join('categories as c', 'c.id', 'e.categoryId')
                  .select(
                    'e.id as id',
                    'e.exerciseName as exerciseName',
                    'c.id as categoryId',
                    'c.categoryName as category'
                  )
                  .whereIn('e.categoryId', categories)
                  .whereIn('e.userId', [1, id.id])
                  .then(exercises => {
                    checkForResource(req, res, exercises);
                  })
                  .catch(err => {
                    console.log('error', err);
                    res.status(500).json({
                      error: 'The exercise information could not be retrieved.'
                    });
                  });
              })
              .catch(err => {
                console.log('error', err);
                res.status(500).json({
                  error: 'The categories information could not be retrieved.'
                });
              });
          })
          .catch(err => {
            res.status(500).json({
              error: 'The specified user info could not be retrieved'
            });
          });
      }
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The specified user info could not be retrieved' });
    });
});

//ENDPOINT TO GET USER FROM DB

server.get('/api/userid', checkJwt, (req, res) => {
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      if (!id) {
      } else {
        res.status(200).json(id.id);
      }
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The specified user info could not be retrieved' });
    });
});

// ENDPOINT TO GET CATEGORIES

server.get('/api/categories', checkJwt, (req, res) => {
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('categories as c')
        .orderBy('id')
        .join('users as u', 'u.id', 'c.userId')
        .select('c.id', 'c.categoryName')
        .whereIn('c.userId', [1, id.id])
        .then(categories => {
          checkForResource(req, res, categories);
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The categories information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The specified user info could not be retrieved' });
    });
});

//ENDPOINT TO POST A NEW CATEGORY

server.post('/api/categories', checkJwt, (req, res) => {
  const { categoryName } = req.body;
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('categories')
        .returning('userId')
        .insert({ categoryName: categoryName, userId: id.id })
        .then(userId => {
          db('categories as c')
            .orderBy('id')
            .join('users as u', 'u.id', 'c.userId')
            .select('c.id', 'c.categoryName')
            .whereIn('c.userId', [1, userId[0]])
            .then(categories => {
              checkForResource(req, res, categories);
            })
            .catch(err => {
              console.log('error', err);
              res.status(500).json({
                error: 'The categories information could not be retrieved.'
              });
            });
        })
        .catch(err => {
          console.log('error', err);
          res
            .status(500)
            .json({ error: 'The user information could not be retrieved.' });
        });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'There was an error saving the user to the database.'
      });
    });
});

//ENDPOINT TO GET USER EXERCISES
server.get('/api/exercises', checkJwt, (req, res) => {
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('exercises as e')
        .orderBy('e.categoryId')
        .join('users as u', 'u.id', 'e.userId')
        .select(
          'e.id as id',
          'e.exerciseName as exerciseName',
          'e.reps as reps',
          'e.weight as weight',
          'e.sets as sets',
          'e.categoryId as categoryId'
        )
        .whereIn('e.userId', [1, id.id])
        .then(exercises => {
          checkForResource(req, res, exercises);
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The exercises information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The specified user info could not be retrieved' });
    });
});

//ENDPOINT TO POST A NEW EXERCISE

server.post('/api/exercises', checkJwt, (req, res) => {
  const { exerciseName, reps, weight, sets, categoryId } = req.body;
  //query user table to get user w req.user.sub
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('exercises')
        .returning('userId')
        .insert({
          exerciseName: exerciseName,
          reps: reps,
          weight: weight,
          sets: sets,
          categoryId: categoryId,
          userId: id.id
        })
        .then(userId => {
          db('exercises as e')
            .orderBy('e.userId')
            .select(
              'e.id as id',
              'e.exerciseName as exerciseName',
              'e.reps as reps',
              'e.weight as weight',
              'e.sets as sets',
              'e.categoryId as categoryId'
            )
            .whereIn('e.userId', [1, userId[0]])
            .then(exercises => {
              checkForResource(req, res, exercises);
            })
            .catch(err => {
              console.log('error', err);
              res.status(500).json({
                error: 'The exercises information could not be retrieved.'
              });
            });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The specified user info could not be retrieved' });
    });
});

//ENDPOINT TO POST A NEW PROGRESS NOTE

server.post('/api/notes', checkJwt, (req, res) => {
  const { weight, waist, arms, legs } = req.body;
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('notes')
        .returning('userId')
        .insert({
          weight: weight,
          waist: waist,
          arms: arms,
          legs: legs,
          userId: id.id
        })
        .then(userId => {
          console.log(userId);
          db('notes as n')
            .join('users as u', 'u.id', 'n.userId')
            .select('n.id', 'n.weight', 'n.waist', 'n.arms', 'n.legs')
            .where('n.userId', userId[0])
            .then(notes => {
              checkForResource(req, res, notes);
            })
            .catch(err => {
              console.log('error', err);
              res.status(500).json({
                error: 'The notes information could not be retrieved.'
              });
            });
        })
        .catch(err => {
          console.log('error', err);
          res
            .status(500)
            .json({ error: 'The notes information could not be retrieved.' });
        });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'The notes information could not be retrieved.'
      });
    });
});

//ENDPOINT TO GET PROGRESS NOTES

server.get('/api/notes', checkJwt, (req, res) => {
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('notes as n')
        .orderBy('id')
        .join('users as u', 'u.id', 'n.userId')
        .select('n.id', 'n.weight', 'n.waist', 'n.arms', 'n.legs')
        .where('n.userId', id.id)
        .then(notes => {
          res.status(200).json(notes);
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The notes information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The notes information could not be retrieved.' });
    });
});

// ENDPOINT TO UPDATE PREMIUM STATUS

server.get('/api/users/premium', checkJwt, (req, res) => {
  db('users')
    .where('user_id', req.user.sub)
    .first()
    .update({
      premium: true
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'Could not set user to premium.' });
    });
});

// ENDPOINT TO CHECK IF USER IS PREMIUM

server.get('/api/user/ispremium', checkJwt, (req, res) => {
  db('users')
    .where('user_id', req.user.sub)
    .first()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'User provided either not found or not Premium' });
    });
});

// ENDPOINT TO DELETE A NOTE

server.delete('/api/notes', checkJwt, (req, res) => {
  const { notesId } = req.body;
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(id => {
      db('notes')
        .where('id', notesId)
        .del()
        .then(notes => {
          checkForResource(req, res, notes);
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The notes information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The notes information could not be retrieved.' });
    });
});

// ENDPOINT TO EDIT NOTE

server.put('/api/notes', checkJwt, (req, res) => {
  //const noteId = req.body.id;
  const { weight, waist, arms, legs, id } = req.body;
  db('users')
    .select('id')
    .where('user_id', req.user.sub)
    .first()
    .then(note => {
      db('notes')
        .where('id', id)
        .update({
          weight: weight,
          waist: waist,
          arms: arms,
          legs: legs
        })
        .then(note => {
          console.log('UPDATED NOTE: ', note);
          res.status(200).json(note);
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The notes information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The notes information could not be retrieved.' });
    });
});

//WARNING, FOLLOWING ENDPOINT FOR TEST PURPOSES ONLY: GET ALL USERS CATEGORIES AND EXERCISES BY ID

server.get('/api/:id/categories', checkJwt, (req, res) => {
  const { id } = req.params;
  db('categories as c')
    .join('users as u', 'u.id', 'c.userId')
    .select('c.id', 'c.categoryName')
    .whereIn('c.userId', [1, id])
    .pluck('c.id')
    .then(categories => {
      console.log(categories);
      db('exercises as e')
        .join('categories as c', 'c.id', 'e.categoryId')
        .select(
          'e.id as id',
          'e.exerciseName as exerciseName',
          'c.id as categoryId',
          'c.categoryName as category'
        )
        .whereIn('e.categoryId', categories)
        .then(exercises => {
          console.log(exercises);
          checkForResource(req, res, exercises);
        })
        .catch(err => {
          console.log('error', err);
          res.status(500).json({
            error: 'The exercise information could not be retrieved.'
          });
        });
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The categories information could not be retrieved.' });
    });
});

//ENDPOINTS BELOW NOT YET FUNCTIONAL AND/OR REDUNDANT

server.get('/api/users/:id/workouts', (req, res) => {
  db('workouts')
    .select()
    .where('id', id)
    .then(workouts => {
      res.status(200).json(workouts);
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The workout information could not be retrieved.' });
    });
});

server.get('/api/users/:id/progress', (req, res) => {
  db('progress')
    .select()
    .where('id', id)
    .then(progress => {
      res.status(200).json(progress);
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The progress information could not be retrieved.' });
    });
});

server.get('/api/users/:id/excercises', (req, res) => {
  db('excercises')
    .select()
    .where('id', id)
    .then(excercises => {
      res.status(200).json(excercises);
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The excercises information could not be retrieved.' });
    });
});

server.get('/api/users/:id/notes', checkJwt, (req, res) => {
  const { id } = req.params;
  db('notes')
    .where('id', id)
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      console.log('error', err);
      res
        .status(500)
        .json({ error: 'The specified note could not be retrieved.' });
    });
});

module.exports = server;
