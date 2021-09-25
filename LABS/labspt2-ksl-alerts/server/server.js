'use strict';

require('dotenv').config();
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const express    = require('express');
const server     = express();
const apiRouter  = require('./api/apiRouter.js');
const PORT       = process.env.PORT || 8080;

const appUrlArr = ['http://localhost:8080', 'https://belzy-alertifi.herokuapp.com'];

server.use(cors());
server.use(express.json());
server.use(apiRouter);

// kslScraper('https://classifieds.ksl.com/search?category[]=Home%20and%20Garden&subCategory[]=Bathroom&keyword=bath&priceFrom=&priceTo=&zip=&miles=25&sellerType[]=Private&marketType[]=Sale&hasPhotos[]=Has%20Photos&postedTime[]=30DAYS');

const routes = ['/', '/Home', '/AlertFeed', '/CreateAlert', '/Settings', '/SignOut', '/SignIn', '/SignUp', '/ForgotPassword', ];

server.use(routes, express.static(path.join(__dirname, '../client/build')));

server.get('/', (req, res, next) => {
  res.redirect('/Home');
});

server.get(routes, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${ PORT }...`);
});
