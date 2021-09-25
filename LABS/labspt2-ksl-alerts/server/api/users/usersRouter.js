const axios            = require('axios');
const stripe           = require('stripe')(process.env.STRIPE_SECRET_KEY);
const randomize        = require('randomatic');
const nodemailer       = require('nodemailer');
const shortid          = require('shortid');
const validator        = require('email-validator');
const isValidUsername  = require('is-valid-username');
const passwordValidate = require('password-validate');
const bcrypt           = require('bcryptjs');
const jwt              = require('jsonwebtoken');
const express          = require('express');
const router           = express.Router();
const helpers          = require('../../database/helpers/helpers.js');

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

/* VERIFYING EMAIL URL ROUTE */
/* router.post('/api/users/payment', authenticate, (req, res, next) => {

    const { email, } = req.body;
    const { tokenId, amount, } = req.body.charge;

    stripe.charges.create({
      amount,
      currency: 'usd',
      description: 'Alertifi Subscription',
      source: tokenId,
    }).then(({ status }) => {

      if (status === 'succeeded') {

        helpers.changeAccountType({ email, accountType: 'premium', }, (changeError, updatedUserData) => {
          if (changeError) {
            console.log(changeError);
            res.status(500).json({ error: changeError, });
          } else {
            console.log(updatedUserData);
            const user = updatedUserData;
            res.status(200).json({ status, user, });
          }
        });
      }

    }).catch(err => {

      console.log(err);

      res.status(500).json({ status: 'failed', });

    
    });

}); */

router.get('/api/users/email-verify/:url', (req, res, next) => {
  
  const { url } = req.params;

  helpers.findByUrlTemp({ url, }, (err, tempUserData) => {

    if (err) {
      res.send({ err });
    } else {

      const { _id, username, email, password, firstName, lastName, accountType, alerts, } = tempUserData;

      const token = jwt.sign({ _id, email, }, process.env.PRIVATE_KEY);

      helpers.createUser({ _id, username, email, password, firstName, lastName, accountType, alerts, }, (createError, createdUserData) => {
        if (createError) {
          console.log(createError);
          res.status(500).json({ createError, });
        } else {

          // Delete temp user
          helpers.deleteByUrlTemp({ url, }, (deleteError, deletedUserData) => {
            if (deleteError) {
              console.log(deleteError);
              res.redirect(`${ appUrl }/Home?success=false`);
            } else {
              res.redirect(`${ appUrl }/Home?success=true&token=${ token }`);
            }
          });
        }
      });
    }
  });
});


/* CHECK EMAIL */
router.post('/api/users/email-check', (req, res, next) => {
  const { email } = req.body;

  helpers.findByEmail({ email, }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (!user) {
      res.status(200).json({ message: 'Incorrect email', isValid: false, })
    } else {
      res.status(200).json({ message: 'Email already in use', isValid: true, })
    }
  });
});


/* CHECK PASSWORD */
router.post('/api/users/password-check', (req, res, next) => {

  const { email, password, } = req.body;

  helpers.findByEmail({ email, }, (error, user) => {

    if (error) res.status(500).json(error);
    if (!user) {
      res.status(200).json({ message: 'Incorrect password', isValid: false, });
    } else if (bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: 'success', isValid: true, });
    } else {
      res.status(200).json({ message: 'Incorrect password', isValid: false, });
    }

  });
});


/* CHECK USERNAME */
router.post('/api/users/username-check', (req, res, next) => {

  const { username, } = req.body;

  helpers.findByUsername({ username, }, (error, user) => {

    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else if (user) {
      res.status(200).json({ message: 'Username already in use', inUse: true, });
    } else {
      res.status(200).json({ message: 'Username is available', inUse: false, });
    }

  });

});


/* VALIDATE USERNAME ROUTE */
router.post('/api/users/username-validate', (req, res, next) => {

  const { username, } = req.body;

  if (isValidUsername(username)) {
    res.status(200).json({ message: 'Username is valid', isValid: true, });
  } else {
    res.status(200).json({ message: 'Username is not valid', isValid: false, });
  }
});


/* VALIDATE EMAIL ROUTE */
router.post('/api/users/email-validate', (req, res, next) => {

  const { email, } = req.body;

  const isValid = validator.validate(email);

  if (isValid) {
    res.status(200).json({ message: 'Email is valid', isValid: true});
  } else {
    res.status(200).json({ message: 'Email is invalid', isValid: false, });
  }
});


/* VALIDATE PASSWORD ROUTE */
router.post('/api/users/password-validate', (req, res, next) => {

  const { password } = req.body;

  passwordValidate.minimumLength = 5;
  passwordValidate.hasLowerCase = true;
  passwordValidate.hasUpperCase = true;
  passwordValidate.hasSymbols = true;
  passwordValidate.hasNumbers = true;

  if (passwordValidate(password).is.valid()) {
    res.status(200).json({ message: 'Password is valid', isValid: true, });
  } else if (!passwordValidate(password).has.symbols()) {
    res.status(200).json({ message: 'Must contain a symbol', isValid: false, });
  } else if (!passwordValidate(password).has.numbers()) { 
    res.status(200).json({ message: 'Must contain a number', isValid: false, });
  } else if (!passwordValidate(password).has.lowerCase()) { 
    res.status(200).json({ message: 'Must contain a lowercase letter', isValid: false, });
  } else if (!passwordValidate(password).has.upperCase()) { 
    res.status(200).json({ message: 'Must contain an uppercase letter', isValid: false, });
  } else if (!passwordValidate(password).has.minimumLength()) { 
    res.status(200).json({ message: 'Must be longer than 4 characters', isValid: false, });
  } else {
    res.status(200).json({ message: 'Password is not valid', isValid: false, });
  }


});


/* SIGN UP FORM ROUTE */
router.post('/api/users/signup', (req, res, next) => {

  const _id = shortid.generate();
  const { username, email, password } = req.body;
  const firstName = '';
  const lastName = '';
  const accountType = 'standard';
  const alerts = [{
    
  }];

  const hash = bcrypt.hashSync(password, 10);

  const url = randomize('Aa0', 12);

  

  helpers.findByEmailTemp({ email, }, (error, foundUserData) => {

    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      if (!foundUserData) {
        
        helpers.createTempUser({_id, username, email, password: hash, url, firstName, lastName, accountType, alerts, }, (error, data) => {

          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.ALERTIFI_GMAIL_EMAIL,
              pass: process.env.ALERTIFI_EMAIL_PASSWORD,
            }
          });
      
          const linkUrl = `${ appUrl }/api/users/email-verify/${ url }/`;
      
          const mailOptions = {
            from: process.env.ALERTFIFI_GMAIL_EMAIL,
            to: email,
            subject: 'Confirm Account',
            html: `Click the following link to confirm your Alertifi account: ${ linkUrl }`,
            text: `Go to the following url to confirm your Alertifi account: ${ linkUrl } `,
          }
           
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({ error, sent: false, });
            } else {
              console.log(`Verification email has been sent ${ info.response }`);
              res.status(200).json({ message: 'Verification email has been sent', sent: true, response: info.response, });
            }
          });
      
        });
      } else {
        res.status(200).json({ message: 'A verification email has already been sent', sent: false, });
      }
    }

  });
});


/* SIGN IN FORM ROUTE */
router.post('/api/users/signin', (req, res, next) => {

  const { email, password, } = req.body;

  helpers.findByEmail({ email, }, (error, foundUserData) => {

    const foundUser = {
      _id:      foundUserData._id,
      username: foundUserData.username,
      email:    foundUserData.email,
      alerts:   foundUserData.alerts,
    };

    if (error) res.status(500).json(error);

    if (bcrypt.compareSync(password, foundUserData.password)) {
      const token = jwt.sign({ _id: foundUser._id, email: foundUser.email, }, process.env.PRIVATE_KEY);
      res.status(200).json({ foundUser, token, });
    } else {
      res.status(200).json({ error: 'incorrect password', });
    }
  });
});

/* FORGOT PASSWORD ROUTE */
router.post('api/users/forgotpassword', (req, res, next) => {
	
	/*
	const { email, } = req.body;
	
	helpers.findByEmail({ email, }, (error, foundUserData) => {
		const foundUser = {
		
		
		}
	}); */
});

// Verifies user on refresh or when re visiting the application and when verifying by email.
router.get('/api/users/verify', (req, res, next) => {

  const token = req.get('Authorization');

  jwt.verify(token, process.env.PRIVATE_KEY, (jwtError, payload) => {

    if (jwtError) {
      res.status(500).json(jwtError);
    } else {
      const { email, } = payload;

      helpers.findByEmail({ email, }, (foundError, foundUserData) => {

        const foundUser = {
          _id: foundUserData._id,
          username: foundUserData.username,
          email: foundUserData.email,
          firstName: foundUserData.firstName,
          lastName: foundUserData.lastName,
          accountType: foundUserData.accountType,
          alerts: foundUserData.alerts,
        };


        foundError ? res.status(500).json(foundError) : res.status(200).json(foundUser);
      });
    }
  });
});

// Authorize GitHub user.
router.get('/oauth/github/redirect', (req, res, next) => {

  const requestToken = req.query.code;
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${ process.env.GITHUB_CLIENT_ID }&client_secret=${ process.env.GITHUB_CLIENT_SECRET }&code=${ requestToken }`,
    headers: {
      accept: 'application/json'
    }
  }).then(result => {
    const accessToken = result.data.access_token;
    res.redirect(`https://belzy-alertifi.herokuapp.com/Home?success=true&type=github&access_token=${ accessToken }`);
  }).catch(error => {
    console.log(error);
    res.json({ error });
  });
});

// Authorize Google user.
router.get('/oauth/google/redirect', (req, res, next) => {

  const requestToken = req.query.code;

  axios({
    method: 'post',
    url: `https://www.googleapis.com/oauth2/v4/token`,
    headers: {
      accept: 'application/json',
    },
    data: {
      code: requestToken,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'https://belzy-alertifi.herokuapp.com/oauth/google/redirect',
      grant_type: 'authorization_code',
    }
  }).then(result => {

    const { access_token, id_token, expires_in, token_type, } = result.data;

    res.redirect(`https://belzy-alertifi.herokuapp.com/Home?success=true&type=google&access_token=${ access_token }`);

  }).catch(console.log);

});

// Sign in with OAuth
router.post('/oauth/signin', authenticate, (req, res, next) => {

  let { _id, username, email, } = req.body;
  const token = req.get('Authorization');

  if (!_id) _id = shortid.generate();

  helpers.findByEmail({ email }, (emailError, foundUserData) => {
    if (emailError) {
      res.status(500).json({ Error: 'Find email error', });
    } else {

      if (foundUserData === null) {
        helpers.createUser({ _id, username, email, password: token, }, (createError, createdUserData) => {
          if (createError) {
            res.status(500).json({ Error: 'Create user error', });
          } else {

            const createdUser = {
              _id: createdUserData._id,
              username: createdUserData.username,
              email: createdUserData.email,
              alerts: createdUserData.alerts,
            };
            res.setHeader('Authorization', token);
            res.status(200).json(createdUser);
          }
        });
      } else {

        const foundUser = {
          _id: foundUserData._id,
          username: foundUserData.username,
          email: foundUserData.email,
          firstName: foundUserData.firstName,
          lastName: foundUserData.lastName,
          accountType: foundUserData.accountType,
          alerts: foundUserData.alerts,
        }
        res.setHeader('Authorization', token);
        res.status(200).json(foundUser);
      }
      

    }
  });


});

module.exports = router;
