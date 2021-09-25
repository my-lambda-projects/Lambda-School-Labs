const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const Invoice = require('./invoiceSchema');
const invoiceRouter = express.Router();
const moment = require('moment');
const Client = require('../client/clientSchema');
const Vendor = require('../vendor/vendorSchema');
const cloudinary = require('cloudinary');
const { cloud_name, api_key, api_secret } = require('../config/config');
const authenticate = require('../utils/middlewares');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

// invoiced api
invoiceRouter.post('/new', (req, res) => {
  const { timestamps, hourlyRate, name, total } = req.body;
  const vendorNum = timestamps[0].vendor;
  const clientNum = timestamps[0].client;
  const invoiceNum = moment(Date.now()).format('MMDDYYYY-HHMM');
  Client.findOne({ _id: clientNum }).then(client => {
    const generateInvoice = (invoice, filename, success, error) => {
      var postData = JSON.stringify(invoice);
      var options = {
        hostname: 'invoice-generator.com',
        port: 443,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      var file = fs.createWriteStream(filename);

      var req = https.request(options, function(res) {
        res
          .on('data', function(chunk) {
            file.write(chunk);
          })
          .on('end', function() {
            file.end();

            if (typeof success === 'function') {
              success();
            }
          });
      });
      req.write(postData);
      req.end();

      if (typeof error === 'function') {
        req.on('error', error);
      }
    };
    const invoice = {
      items: timestamps.map(timestamp => {
        const minutes = timestamp.duration.split(':')[1] / 60 * 100;
        const quantity = `${timestamp.duration.split(':')[0]}.${minutes}`;
        return {
          name: moment(timestamp.startTime).format('MM/DD/YYYY'),
          quantity,
          unit_cost: hourlyRate
        };
      }),
      from: name,
      to: client.name,
      currency: 'usd',
      number: invoiceNum
    };
    generateInvoice(
      invoice,
      `${invoiceNum}_invoice.pdf`,
      function() {
        const filePath = path.join(
          __dirname,
          '../',
          `${invoiceNum}_invoice.pdf`
        );
        cloudinary.uploader.upload(filePath, function(result) {
          fs.unlinkSync(
            path.join(__dirname, '../', `${invoiceNum}_invoice.pdf`)
          );
          // generate invoice with pic url
          const newInvoice = new Invoice({
            invoiceNum,
            clientNum,
            vendorNum,
            total,
            url: result.secure_url
          });
          // push each timestamp into invoice and should update to invoiced
          for (let i = 0; i < timestamps.length; i++) {
            newInvoice.hoursLogged.push(timestamps[i]._id);
          }

          Vendor.findOneAndUpdate(
            { _id: vendorNum },
            { $push: { invoices: newInvoice._id } },
            { new: true }
          )
            .then(vendor => {
              client.invoices.push(newInvoice._id);
              client.save();
              newInvoice.save();
              res.status(200).json({ result });
            })
            .catch(err => {
              res.status(500).json(err);
            });
        });
      },
      function(error) {
        res.send(error);
      }
    );
  });
});

module.exports = invoiceRouter;
