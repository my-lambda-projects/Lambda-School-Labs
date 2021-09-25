const server = require('./api/server.js');
const port = process.env.PORT || 9000;
const dotenv = require('dotenv');

dotenv.load();

server.listen(port, () => {
	console.log(`Server started on ${port}`);
});
