const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const db = require("../data/dbConfig");
const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Used with multer to provide storage location of image which in this case is Cloudinary
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Tenantly",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

//Setting multer up with storage location created above.
const parser = multer({ storage: storage });

//posts image to cloudinary and provies reponse that contains the image URL
router.post("/", parser.single("image"), (req, res) => {
  console.log(req.file.public_id);
  // to see what is returned to you
  const image = {};
  image.url = req.file.secure_url;
  image.id = req.file.public_id;
  if (image) {
    res.status(200).json(image.url);
  } else {
    res.status(404).json({ error: "nothing" });
  }
});

module.exports = router;
