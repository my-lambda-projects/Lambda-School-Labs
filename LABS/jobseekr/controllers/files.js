const AWS = require('aws-sdk');
require('dotenv').config();
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const mySecret = process.env.SECRET || 'random';
const User = require('../models/userModel');
const Job = require('../models/jobModel');
const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET_NAME;

AWS.config.update({ region });

const uploadFile = async (req, res) => {
  const { token, userdocument } = req.headers;
  const storedPayload = await jwt.verify(token, mySecret);
  const id_check = storedPayload.email;
  const file = req.files.file.data;
  const type = req.files.file.mimetype;
  let { name } = req.files.file;
  const fileId = uuidv4();
  name = fileId + name;

  const s3 = new AWS.S3();
  const s3Params = {
    Body: file,
    Bucket: bucket,
    Key: name,
    Expires: 60,
    ContentType: type,
    ACL: 'public-read'
  };

  // saves file on s3 server
  s3.putObject(s3Params, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });

  // gets info on the file and saves it to the user resume
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3-${region}.amazonaws.com/${bucket}/${name}`
    };
    res.write(JSON.stringify(returnData));
    const newURL = returnData.url;
    User.findOneAndUpdate(
      { email: id_check },
      {
        [userdocument]: {
          title: name,
          url: newURL
        }
      }
    )
      .then(res => {
        res.status(200).json(user[userdocument]);
      })
      .catch(err => console.log(err));
    res.end();
  });
};

const getUserFile = async (req, res) => {
  const { token, userdocument } = req.headers;
  const storedPayload = await jwt.verify(token, mySecret);
  const { email } = storedPayload;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Email/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that email in our records' });
      return;
    }
    res.status(200).json(user[userdocument]);
  })
    .then(res => res)
    .catch(err => console.log(err));
};

const uploadJobFile = async (req, res) => {
  const { currentjobid, jobdocument } = req.headers;
  const file = req.files.file.data;
  const type = req.files.file.mimetype;
  const name = uuidv4() + req.files.file.name;

  const s3 = new AWS.S3();
  const s3Params = {
    Body: file,
    Bucket: bucket,
    Key: name,
    Expires: 60,
    ContentType: type,
    ACL: 'public-read'
  };

  // saves file on s3 server
  s3.putObject(s3Params, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });

  // gets info on the file and saves it to the user resume
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3-${region}.amazonaws.com/${bucket}/${name}`
    };
    res.write(JSON.stringify(returnData));
    const newURL = returnData.url;
    Job.findOneAndUpdate({ _id: currentjobid }, { [jobdocument]: newURL })
      .then(job => res.status(200).json(job[jobdocument]))
      .catch(err => res.status(500).json({ 'error': err }));
  });
};

const getJobFile = async (req, res) => {
  const { token, jobdocument } = req.headers;
  const storedPayload = await jwt.verify(token, mySecret);
  const { email } = storedPayload;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Email/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that email in our records' });
      return;
    }
    res.status(200).json(user[jobdocument]);
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

module.exports = {
  uploadFile,
  getUserFile,
  uploadJobFile,
  getJobFile
};
