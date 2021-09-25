const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://venky-yagatilee.auth0.com/.well-known/jwks.json'
   }),

    audience: 'https://labspt2-housecup.herokuapp.com/',
    issuer: 'https://venky-yagatilee.auth0.com/',
    algorithms: ['RS256']

  });



// const client = jwksRsa({ jwksUri: `https://venky-yagatilee.auth0.com/.well-known/jwks.json` });

// function getKey(header, cb) {
//   client.getSigningKey(header.kid, function(err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     cb(null, signingKey);
//   });
// }

// const options = {
//   audience: '46Ngw5RelPCvdaCoKrqPvIWyvgFQBqvx',
//   issuer: `https://venky-yagatilee.auth0.com/`,
//   algorithms: ["RS256"]
// };

// const protectEndPoint = (req,res,next) => {
//     const token = req.headers.authorization;
//     console.log(`Line 38 schoolsPage-express-jwt.js`,token);
//     if (token) {
//       jwt.verify(token, getKey, options, (err, decodedToken) => {
//         if (err) {
//           next({ ...err, code: 403 });
//         }
//         console.log(`jwt protected`, decodedToken);
//         req.user = decodedToken;
//         console.log(req.user)
//         next();
//       });
//     } else {
//       next({ code: 403 });
//     }
// }     

module.exports = {jwtCheck:jwtCheck}