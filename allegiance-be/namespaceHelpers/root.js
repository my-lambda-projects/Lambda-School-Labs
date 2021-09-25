const clients = {};

module.exports = (socket, namespace, io) => {
  console.log("New connection id: " + socket.id);

  socket.on("join", data => {
    // console.log("received", data);
    clients[data.id] = socket.id;
    // console.log(clients);
  });

  socket.on("send notification", data => {
    data.userIds.forEach(id => {
      const socketid = clients[id];
      console.log("send notification");
      io.to(socketid).emit("new notification", data);
      // if the user is online lets find his socket id,
    });
  });

  socket.on("send invite", data => {
    data.userIds.forEach(id => {
      const socketid = clients[id];
      console.log("send invite");
      io.to(socketid).emit("new invite", data);
      // if the user is online lets find his socket id,
    });
  });

  socket.on("join.groups", group_name => {
    console.log("socket rooms ===> ", socket.rooms);
    console.log("\n joining room ", group_name);
    socket.join(group_name);
  });

  socket.on("event", e => {
    console.log("getting hit", e);
    socket.broadcast.to(e.room).emit("event", e.post + " says hello!");
  });

  socket.on("groupPost", data => {
    console.log("pageData", data);
    socket.broadcast.to(data.room).emit("groupPost", data);
  });

  socket.on("replyPost", data => {
    console.log("replyPost", data);
    socket.broadcast.to(data.room).emit("replyPost", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected id: " + socket.id);
  });
};
