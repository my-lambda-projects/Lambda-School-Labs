const models = require('../models/models.js');

module.exports = {
  createUser: function(data, done) {
    models.User.create(data, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    })
  },
  createTempUser: function(data, done) {
    models.TempUser.create(data, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    });
  },
  findByUsername: function(data, done) {
    models.User.findOne({ username: data.username, }, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    });
  },
  findByEmail: function(data, done) {
    models.User.findOne({ email: data.email, }, (err, user) => {
     if (err) {
       done(err);
     } else {
       done(null, user);
     }
    })
  },
  findByUrlTemp: function(data, done) {
    models.TempUser.findOne({ url: data.url, }, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    });
  },
  deleteByUrlTemp: function(data, done) {
    models.TempUser.deleteOne({ url: data.url, }, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    })
  },
  findByEmailTemp: function(data, done) {
    
    models.TempUser.findOne({ email: data.email, }, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    });
  },
  changeAccountType: function(data, done) {

    const { email, accountType, } = data;

    models.User.findOneAndUpdate({ email, }, { accountType, }, (error, user) => {

      if (error) {
        done(error);
      } else {

        const updatedUser = Object.assign({}, user._doc, { accountType, });

        done(null, updatedUser);
      }

    });
  },
  createNewAlert: function(data, done) {

    const { email, title, urlQuery, } = data;

    models.User.findOne({ email, }, (error, user) => {

      const alerts = [];

      // Remove the placeholder alert.
      for (let i in user.alerts) {
        if (user.alerts[i].title) {
          alerts.push(user.alerts[i]);
        }
      }

      const alert = {
        title,
        urlQuery,
        items: [{

        }],
      };

      alerts.push(alert);

      models.User.findOneAndUpdate({ email, }, { alerts, }, { new: true, }, (foundError, updatedUserData) => {
        if (error) {
          done(error);
        } else {
          done(null, updatedUserData);
        }
      });
    });
  },
  addAlertItem: function(data, done) {

    const { email, title, } = data;

    models.User.findOne({ email, }, (error, user) => {

    });


  }
}

