const express = require('express')
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const helpers = require('../../database/helpers/helpers.js');
const kslScraper = require('../../scripts/scraper.js');
const productionUrl = 'https://belzy-alertifi.herokuapp.com';
const developmentUrl = 'http://localhost:8080';

const appUrl = process.env.NODE_ENV ? productionUrl : developmentUrl;

const authenticate = (req, res, next) => {

  const token = req.get('Authorization');
  const { authType, username, email, } = req.body;

  switch (authType) {
    case 'alertifi':

      jwt.verify(token, process.env.PRIVATE_KEY, (jwtError, payload) => {
        if (jwtError) {
          res.status(403).json({ error: 'unable to authenticate'});
        } else {
          next();
        }
      });

      break;
    case 'google':

      axios({
        method: 'get',
        url: 'https://accounts.google.com/.well-known/openid-configuration',
      }).then(result => {

        axios({
          method: 'get',
          url: result.data.userinfo_endpoint,
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        })
        .then(result => {
          
          if (result.data.email === email) {
            next();
          } else {
            res.status(403).json({ Error: 'unable to authenticate' });
          }


        }).catch(err => {
          res.status(500).json(err);
        });
      }).catch(console.log);


      break;
    case 'github':

      axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
          'Authorization': 'token ' + token,
        }
      }).then(result => {

        const { login } = result.data;

        if ( login === username) {
          next();
        } else {
          res.status(403).json({ error: 'unable to authenticate'});
        }

      });

      break;
  }
  
}

router.post('/api/alerts/create', authenticate, (req, res, next) => {
    
  const { email, } = req.body;
  const { title, urlQuery, } = req.body.alert;

  helpers.createNewAlert({ email, title, urlQuery, }, (createError, data)=> {
    
    if (createError) {
      console.log(createError);
      res.status(500).json(createError);
    } else {

      // 20 minutes.
      const interval = 1200000



      setInterval(() => {
        
      }, interval);



      
    }
    


  });

  
});

module.exports = router;
