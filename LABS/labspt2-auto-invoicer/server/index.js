require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const csrf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const { connect } = require('mongoose');
const graphqlHttp = require('express-graphql');
const serverless = require('serverless-http');

const GraphQLSchema = require('./graphql/schema');
const GraphQLResolvers = require('./graphql/resolvers');

const authRouter = require('./auth');
const stripeRouter = require('./stripe');
const welcomeRouter = require('./routers/welcomeRouter');
const taxRateRouter = require('./routers/taxRateRouter');

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// TODO: implement CSRF
// app.use(csrf({ cookie: true }));
app.use(
  session({
    name: 'SID',
    store: new MongoStore({
      url: `mongodb://${process.env.DB_USER}:${
        process.env.DB_PASSWORD
      }@autoinvoice-shard-00-00-evkdc.mongodb.net:27017,
      autoinvoice-shard-00-01-evkdc.mongodb.net:27017,
      autoinvoice-shard-00-02-evkdc.mongodb.net:27017/${
        process.env.DB_NAME
      }?ssl=true&replicaSet=AutoInvoice-shard-0&authSource=admin&retryWrites=true`
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
      // secure: true, // uncomment in development
      signed: true
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: 'You are not logged in.'
    });
  }
};

app.get('/user', isAuth, (req, res) => {
  res.json({ userId: req.user });
});
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout();
    res.clearCookie('SID', {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
      signed: true
    });
    res.send('Session destroyed');
  });
});
app.use('/stripe', bodyParser.text(), stripeRouter);
app.use('/auth', authRouter);
app.use('/welcome', welcomeRouter);
app.use('/taxes', taxRateRouter);
app.use(
  '/graphql',
  graphqlHttp({
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true
  })
);

connect(
  `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@autoinvoice-evkdc.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
  { useNewUrlParser: true }
)
  .then(app.listen(PORT, console.log(`Server is running on port ${PORT}!`)))
  .catch(err => console.log(err));

module.exports.sls = serverless(app);
