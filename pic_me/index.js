const server = require('./server');

const { debug } = require('./dev');

/**
 * env config:
 * PORT=5555
 */
const port = process.env.PORT || 5555;

server.listen(port, _ => {
	debug ? console.log(`Listening on port: ${port}`) : null;
});
