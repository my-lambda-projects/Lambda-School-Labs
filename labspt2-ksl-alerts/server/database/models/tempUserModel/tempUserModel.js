const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, });

const db = mongoose.connection;

const tempUserSchema = new Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  accountType: String,
  alerts: [{
    title: String,
    urlQuery: String,
    items: [{
      contactInfo: {
        firstName: String,
        homePhone: String,
        cellPhone: String,
      },
      pageStats: {
        listingNumber: String,
        expirationDate: String,
        pageViews: String,
        favorited: String,
        sellerType: String,
        memberSince: String,
      },
      listingDetails: {
        title: String,
        location: String,
        price: String,
        description: String,
      },
      images: [{
        small: String,
        large: String,
      }],
    }],
  }],
  
  url: String, 
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
