const admin = require('firebase-admin') 

const createUser = async (req, res) => {
  try{
    const {
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      photoUrl
    } = req.body;

    const user = await admin.auth().createUser({
      email,
      phoneNumber,
      password,
      displayName: `${firstName} ${lastName}`,
      photoURL: photoUrl
    });
    return res.send(user);
  } catch (error) {
    console.log('failed', error);
  }
}

module.exports = createUser