const userApi = require('../api/users');
const prApi = require('../api/pullrequests');
const homeApi = require('../api/home');

module.exports = (server) => {
  // server.use('/users', userApi);

  server.use('/pull-requests', prApi);
  server.route('*')
  	.get(homeApi);  

}