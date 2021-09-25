let nameTags; //Public id or mutliple id's we want to give tags to
let email;

const uploadImage = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const Sequelize = require("sequelize");
    const db = require("../db/dbconnection");
    const Image = require("../db/models/image")(db, Sequelize);
    const User = require("../db/models/user")(db, Sequelize); 
    User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
    Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'}); 
    User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
    Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});

    const {email, name, url} = req.body;

    console.log(email, name, url); 
    

    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  

    const newImage = (name, url, id) => {
        Image.create({
            name: name,
            url: url,
            uploaded_image_user_id: id //needs the id of the user to properly be saved
        }).then()
    }    

        if(email) {
            User.findOne({ where: { email: email } }).then(user => {
            let credits = user.credits;
            
            //Adds a credit to a user
            User.update({ credits: credits+1 }, { where: { email: email }, individualHooks: true })
            .then(user => {
                console.log("Credit added")
            })
            .catch(err => {
                console.log("Not working")
            }); 
            })
        }
        
        User.findOne({where: {email: email}}).then(user => {
            let id = user.id;
            user.addUploadedImages([newImage(name, url, id)]).then() //Saves the image to a user's uploads
            res.status(200).json({Message: 'Success'})
        }).catch(err => {
            console.log("ERROR IN ADDUPLOADEDIMAGES")
        })
}

module.exports = {
    uploadImage
}