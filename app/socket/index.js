const helpers = require('../helpers');

module.exports = (io, app) => {
  let allRooms = app.locals.chatrooms;

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allRooms));
    });

    socket.on('createNewRoom', newRoomInput => {
      // Check to see if a room already exists with that name
      // If not, create the room and add it to the chatrooms array.
      if (!helpers.findRoomByName(allRooms, newRoomInput)) {
        allRooms.push({
          room: newRoomInput,
          roomID: helpers.randomHex(),
          users: []
        });

        // Emit an updated list to the creator
        socket.emit('chatRoomsList', JSON.stringify(allRooms));
        // Emit an updated list to everyone connected to the rooms pageTitle
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms));
      }
    });
  });
};
