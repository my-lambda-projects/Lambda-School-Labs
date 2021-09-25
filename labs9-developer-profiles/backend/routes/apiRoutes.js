require('dotenv').config()
const db = require('../helpers/index.js')
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const stripe = require("stripe")(process.env.STRIPE_TEST);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// AWS image upload
aws.config.update({
    secretAccessKey: process.env.AWS_PIC_SECRET_KEY,
    accessKeyId: process.env.AWS_PIC_ACCESS_KEY,
    region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'dev-profile-user-profile-images',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const singleImageUpload = upload.single('image');

server.post('/image-upload', (req, res) => {
  singleImageUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    return res.json({'imgUrl': req.file.location})
  });
});


// google services
const key = process.env.GOOGLE_AUTO_COMPLETE

server.post('/location', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.inputLocation}&types=(cities)&key=${key}`;
  axios.post(url)
  .then(response => {
    res.send(response.data)
  })
  .catch(err => {
    res.send({ err })
  })
});

server.post('/gio', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.placeId}&fields=geometry&key=${key}`
  axios.post(url)
  .then(response => {
    res.send(response.data)
  })
  .catch(err => {
    res.send({ err })
  })
});


// acclaim
server.put("/acclaim/:id", (req, res) => {
    let id = req.params.id
    axios.get(`https://api.youracclaim.com/v1/obi/badge_assertions/${req.body.badge}`).then(response => {
        db.user_helpers.editUser(id, {badge: response.data.image, badgeURL: response.data.evidence}).then(data => {
        res.status(200).json(data)
        })
    }).catch(err => {
      res.send({ err })
    });
});


// stripe
server.post('/create-customer', (req, res) => {
  const { stripeToken, userEmail } = req.body;
  stripe.customers.create({
    description: `Customer for ${userEmail}`,
    source: stripeToken
  }, function(err, customer) {
      if (err) {
        res.send({ err })
      } else {
        res.send(customer)
      }
  });
});

server.post('/subscribe-customer', (req, res) => {
  const { customerId, packageSelected } = req.body;
  if (packageSelected === 'month') {
    stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_ET8f6n9L0GqW57",
        },
      ]
    }, function(err, subscription) {
      if (err) {
        res.send({ err })
      } else {
        res.send(subscription)
      }
    }
    );
  } else if (packageSelected === 'year') {
    stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_ET8hisB865nPaL",
        },
      ]
    }, function(err, subscription) {
      if (err) {
        res.send({ err })
      } else {
        res.send(subscription)
      }
    }
    );
  } else {
    res.send('Error')
  }
});

server.post('/get-customer', (req, res) => {
  const { customerId } = req.body;
  stripe.customers.retrieve(
    customerId,
    function(err, customer) {
      if (err) {
        console.log(err)
        res.send({ err })
      } else {
        console.log(customer)
        res.send(customer)
      }
    });
});


module.exports = server 
