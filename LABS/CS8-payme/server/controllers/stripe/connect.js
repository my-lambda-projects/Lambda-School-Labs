const querystring = require('querystring');
const request = require('request');
const User = require('../../models/users');

const authorizeConnect = (req, res) => {
  // console.log(req);
  req.state = req.user.username;
  // Math.random()
  //   .toString(32)
  //   .slice(2);

  req.userId = req.user._id;
  console.log(`userid/req state: ${req.state}`);

  const { companyName, phone } = req.user;
  const fullName = req.user.fullName.split(' ');

  const email = req.user.username || undefined;

  // const phone = req.user.phone.number || undefined;

  let parameters = {
    client_id: process.env.STRIPE_CLIENT_ID,
    state: req.state,
    scope: 'read_write',
    redirect_uri: `${process.env.HOST}/stripe/token`,
    // user: req.userId,
    response_type: 'code',
  };
  parameters = Object.assign(parameters, {
    'stripe_user[first_name]': fullName[0] || undefined,
    'stripe_user[last_name]': fullName[fullName.length - 1] || undefined,
    'stripe_user[email]': email || undefined,
    'stripe_user[business_name]': companyName || undefined,
    'stripe_user[phone]': phone || undefined,
  });

  res.redirect(
    'https://dashboard.stripe.com/oauth/authorize?' +
      querystring.stringify(parameters)
  );
};

const connectToken = (req, res) => {
  // if (req.state != req.query.state) {
  //   res.redirect('/signin');
  // }
  console.log('query from token');
  console.log(req.query);
  request.post(
    'https://connect.stripe.com/oauth/token',
    {
      form: {
        grant_type: 'authorization_code',
        client_id: process.env.STRIPE_CLIENT_ID,
        client_secret: process.env.STRIPE_SK,
        code: req.query.code,
      },
      json: true,
    },
    (err, response, body) => {
      if (err || body.error) {
        console.log('The Stripe onboarding process has not succeeded.');
      } else {
        // Update the model and store the Stripe account ID in the datastore.
        // This Stripe account ID will be used to pay out to the pilot.

        // req.user.stripeAccountId = body.stripe_user_id;
        // req.user.save();

        const stripe = {
          code: body.stripe_user_id,
          scope: body.scope,
        };
        console.log(stripe);
        console.log(`body: `);
        console.log(body);
        console.log('req.query');
        console.log(req.query);

        User.findOneAndUpdate(
          { username: req.query.state },
          { stripe: stripe },
          { new: true }
        )
          .select('-password')
          .populate('invoices')
          .then(user => console.log('USERNAME', user.username))
          .catch(err => err);
      }
      // Redirect to the final stage.
      res.redirect('/billing');
    }
  );
};
module.exports = { authorizeConnect, connectToken };
