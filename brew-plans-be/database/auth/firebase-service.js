const admin = require('firebase-admin') 
const serviceAccount = require('../auth/serviceAccountKey')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://brew-plans.firebaseio.com'
});

module.exports = admin
