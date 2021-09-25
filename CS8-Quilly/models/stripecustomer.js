let Stripe = require('stripe'), stripe;

module.exports = exports = function stripeCustomer(schema, options) {
  stripe = Stripe(options.secretKey);

  schema.add({
    stripe: {
      customerId: String,
      subscriptionId: String,
      last4: String,
      plan: {
        type: String,
        default: options.defaultPlan
      }
    }
  });

  schema.pre('save', function (next) {
    let user = this;
    console.log(user.isNew);
    console.log(user.stripe);
    console.log(!user.isNew || user.stripe.customerId);
    if (user.stripe.customerId) return next();
    user.createCustomer(err => {
      if (err) return next(err);
      next();
    });
  });

  schema.statics.getPlans = () => {
    return options.planData;
  };

  schema.methods.createCustomer = function(cb) {
    let user = this;

    stripe.customers.create({
        email: user.email
      },
      (err, customer) => {
        if (err) return cb(err);

        user.stripe.customerId = customer.id;
        return cb();
      }
    );
  };

  schema.methods.setCard = function(stripe_token, cb) {
    let user = this;

    const cardHandler = (err, customer) => {
      if (err) return cb(err);

      if (!user.stripe.customerId) {
        user.stripe.customerId = customer.id;
      }

      let card = customer.cards
        ? customer.cards.data[0]
        : customer.sources.data[0];

      user.stripe.last4 = card.last4;
      console.log("PRINTING USER:\n", user);
      user.save((err) => {
        if (err) return cb(err);
        return cb(null);
      });
    };

    if (user.stripe.customerId) {
      stripe.customers.update(
        user.stripe.customerId,
        { card: stripe_token },
        cardHandler
      );
    } else {
      stripe.customers.create(
        {
          email: user.email,
          source: stripe_token
        },
        cardHandler
      );
    }
  };

  schema.methods.setPlan = function(plan, stripe_token, cb) {
    let user = this,
      customerData = {
        plan: plan
      };

    const subscriptionHandler = (err, subscription) => {
      if (err) return cb(err);

      user.stripe.plan = plan;
      user.stripe.subscriptionId = subscription.id;
      user.save(err => {
        if (err) return cb(err);
        return cb(null);
      });
    };

    const createSubscription = () => {
      stripe.customers.createSubscription(
        user.stripe.customerId,
        { plan: plan },
        subscriptionHandler
      );
    };

    if (stripe_token) {
      user.setCard(stripe_token, err => {
        if (err) return cb(err);
        createSubscription();
      });
    } else {
      if (user.stripe.subscriptionId) {
        // update subscription
        stripe.customers.updateSubscription(
          user.stripe.customerId,
          user.stripe.subscriptionId,
          { plan: plan },
          subscriptionHandler
        );
      } else {
        createSubscription();
      }
    }
  };

  schema.methods.updateStripeEmail = function(cb) {
    let user = this;

    if (!user.stripe.customerId) return cb();

    stripe.customers.update(
      user.stripe.customerId,
      { email: user.email },
      (err, customer) => {
        cb(err);
      }
    );
  };

  schema.methods.cancelStripe = function(cb) {
    let user = this;

    if (user.stripe.customerId) {
      stripe.customers.del(user.stripe.customerId).then(
        confirmation => {
          cb();
        },
        err => {
          return cb(err);
        }
      );
    } else {
      cb();
    }
  };
};
