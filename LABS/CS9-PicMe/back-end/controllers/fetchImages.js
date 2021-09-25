const cloudinary = require("cloudinary"); //Cloudinary npm package

const fetchImages = (req, res) => {

    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  


    cloudinary.v2.search
    .expression('resource_type:image') //Looks through images from our cloudinary
    .sort_by('public_id','desc')
    .max_results(30)
    .execute().then(result => { //result return an object, needed to grab only url links
        let images = []
        if(result.resources) {
            result.resources.forEach(image => { 
                images.push(image.url) 
            })

            res.status(200).json(images)
        } else {
            res.json(result)
        }
    });
}

module.exports = {
    fetchImages
}