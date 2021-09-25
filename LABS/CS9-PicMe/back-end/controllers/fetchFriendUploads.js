const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const Image = require("../db/models/image")(db, Sequelize);
const User = require("../db/models/user")(db, Sequelize); 
User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'}); 
User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

console.log("SECRET", secret)



const fetchFriendUploads = (req, res) => {
    //Grabs id from body request
    const userId = req.params.id; //Grabs jwt token from params
    let id;

    jwt.verify(userId, secret, (err, decoded) => { //decodes it so we can use the user id below
        if(err) return;
        id = decoded.id

        console.log("VERIFY", id)
    })



    User.findOne({where: {id: id}}).then(user => {
        const userUploads =  user.getUploadedImages().then(uploadedImages => { 
            // Grabs a user's uploads from DB and pushes each one into our pics array
            // uploads.forEach(image => {
            //     pics.push(image.dataValues.url)
            // })
            res.status(200).json(uploadedImages) //Sends back an array of pictures
        }).catch(err => {
            res.status(200).json({Err: "User has no images"})
        })
    }).catch(err => {
        res.status(400).json({Err: "No user found "})
    })
}

module.exports = {
    fetchFriendUploads
}
