require('dotenv').config();

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const { server, io } = require('./server');
const { messagesFeed } = require('./models/models');
// Imports server.js and app.js creates a connection containing the routes and middleware

// Serve static files from the React app

io.sockets.on('connection', (socket) => {
  const watcher = chokidar.watch(
    path.join(__dirname, './models/messages/messages.json'),
    { persistent: true }
  );
  const sendMessages = () => {
    fs.readFile(
      path.join(__dirname, './models/messages/messages.json'),
      'base64',
      (err, data) => {
        if (err) socket.emit('socket-error', err);
        const newData = `${data}*`;
        socket.emit('message-feed', newData);
      },
    );
    //   const stream = fs.readFile(
    //     path.join(__dirname, './models/messages/messages.json'),
    //     { encoding: 'base64' },
    //   );
    //   stream.on('data', (data) => {
    //     stream.on('end', () => {
    //       const concat = data + '*';
    //       socket.emit('message-feed', concat);
    //     });
    //   });
    // stream.on('end', (data) => {
    //   console.log('streamdata', streamData)
    //   socket.emit('message-feed', data);
    // });
    // stream.on('error', (err) => {
    //   socket.emit('socket-error', err);
    // });
  };

  messagesFeed()
    .then(() => {})
    .then(sendMessages())
    .catch((err) => {
      sendMessages();
      console.error(err);
    });
  watcher.on('change', () => {
    sendMessages();
  });
});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
