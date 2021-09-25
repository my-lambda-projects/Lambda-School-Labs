const request = require('supertest');

const server = require('./server.js');
// const Users = require('../routes/profile');

// describe("server.js", function() {
//   describe("environment", function() {
//     it("should set environment to testing", function() {
//       expect(res.body.dbenv).toBe("testing");
//     });
//   });

it('should return a 200 OK', function() {
  // spin up the server
  return request(server)
    .get('/')
    .then(res => {
      expect(res.status).toBe(200);
    });
  // .catch(error) {
  //   res.status(400).json(error);
  // }
});

it('should return a JSON', function() {
  return request(server)
    .get('/')
    .then(res => {
      expect(res.type).toMatch(/json/i);
    });
});
it("should return {api: 'Ok'}", function() {
  return request(server)
    .get('/')
    .then(res => {
      expect(res.body.api).toBe('Ok');
    });
});

// describe('Login receives a 200', function() {
//   it('login returns a 200', async function() {
//     request(server)
//       .post('/api/auth/login')
//       .send({ email: 'keith@who.band', password: 'thewho' })
//       .then(res => {
//         expect(res.status).toBe(200);
//       });
//   });

//   it.skip('register function returns a 200', function() {
//     return request(server).post('api/auth/register', async (req, res) => {
//       // validate data before creating user
//       // const { error } = registerValidation(req.body);
//       // if (error) {
//       //   const { details } = error;
//       //   const message = details.map(detail => detail.message).join(",");
//       //   res.status(422).json({ error: message });
//       //

//       const { name, email, password } = req.body;

//       // try {
//       //   // check if user already exists
//       //   const userExist = await User.findOne({ email });
//       //   if (userExist)
//       //     return res.status(400).json({ message: "User is already registered" });

//       // hash passwords
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       // Create a new user
//       const user = new User({
//         name,
//         email,
//         password: hashedPassword
//       });

//       const newUser = await user.save();
//       res.send({
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email
//       });
//     });
//   });
// });
