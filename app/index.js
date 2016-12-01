const routes = require('./routes');
const session = require('./session');
const http = require('http');
const sockets = require('socket.io');
const appSocket = require('./socket');

// Social Authentication Logic
require('./auth')();

// Create an IO server instance
const ioServer = app => {
  app.locals.chatrooms = [];
  const server = http.Server(app);
  const io = sockets(server);
  io.use((socket, next) => {
    session(socket.request, {}, next);
  });
  appSocket(io, app);

  return server;
};

module.exports = {
  router: routes(),
  session,
  ioServer
};
