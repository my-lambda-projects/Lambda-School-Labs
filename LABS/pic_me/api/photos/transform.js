const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const aws = require('aws-sdk');
const sharp = require('sharp');
const Schema = mongoose.Schema;
const image = require('../photos/model');
const MLAB = JSON.parse(process.env.MLAB);
mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);

const server = express();

const awsAccessKey = process.env.AWS_KEY;
const awsSecretKey = process.env.AWS_SECRET;

aws.config.update({
	secretAccessKey: awsSecretKey,
	accessKeyId: awsAccessKey,
});

let s3 = new aws.S3();

exports.upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.BUCKET,
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		shouldTransform: true,
		transforms: [
			{
				id: 'original',
				key: function(req, file, cb) {
					let fileSplit = file.originalname.split('.');

					let filename = fileSplit.slice(0, fileSplit.length - 1);
					filename.push(Date.now());
					filename = filename.join('_') + '.' + fileSplit[fileSplit.length - 1];

					cb(null, filename);
				},
				transform: function(req, file, cb) {
					// better resizing and image enhancement
					cb(null, sharp().toFormat('jpg'));
					// cb(null, sharp().resize(401, 300).ignoreAspectRatio().toFormat('jpg'));
				},
			},
		],
		metadata: function(req, file, cb) {
			cb(null, { fieldName: 'image', fieldName: 'tags' });
		},
	}),
});

