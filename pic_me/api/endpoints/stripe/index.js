/**
 * env config:
 * STRIPE_SECRET=sk_test_BQokikJOvBiI2HlWgH4olfQ2
 *
 * demo test secret key above, found below:
 * https://stripe.com/docs/charges
 *
 * to find your api keys:
 * https://dashboard.stripe.com/account/apikeys
 *
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET);

/**
 * general helper functions for all api endpoints
 */
const r = require('../../helpers/responses');

exports.process = (req, res, next) => {
	const token = req.body.stripeToken;
	const typeOfCharge = req.body.typeOfCharge;

	/**
	 * env config:
	 * STRIPE_PAYMENTS={"currency":"usd","sm":"199","lg":"999","description":{"sm":"small charge","lg":"large charge"}}
	 *
	 * remember that charges are in CENTS so:
	 * 199 = $1.99
	 * 999 = $9.99
	 *
	 * the minimum charge (as of June 1, 2018) is $0.50, or 50 cents
	 */
	const stripeSettings = JSON.parse(process.env.STRIPE_PAYMENTS);

	const amount = +stripeSettings[typeOfCharge];
	const currency = stripeSettings.currency;
	const description = stripeSettings.description[typeOfCharge];
	const balance = stripeSettings.balance[typeOfCharge];

	stripe.charges.create(
		{
			amount,
			currency,
			description,
			source: token,
		},
		(err, charge) => {
			if (err) {
				r.error(res, err, `error charging payment`);
				return;
			}

			req.captured = charge.captured;

			/**
			 * if there are no errors, check if charge was successful
			 */
			if (charge.captured) {
				req.parm = { $inc: { balance } };
				next();
				return;
			}

			/**
			 * charge was not captured
			 */
			r.error(res, err, `failed to capture payment`);
		},
	);
};
