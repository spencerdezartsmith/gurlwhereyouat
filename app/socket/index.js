const helper = require('../helpers');

module.exports = (io, app) => {
  let allRooms = app.locals.chatrooms;
  // Listening for the roomslist namespace
  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allRooms));
    });

    socket.on('createNewRoom', newRoomInput => {
      // Check to see if a room already exists with that name
      // If not, create the room and add it to the chatrooms array.
      if (!helper.findRoomByName(allRooms, newRoomInput)) {
        allRooms.push({
          room: newRoomInput,
          roomID: helper.randomHex(),
          users: []
        });

        // Emit an updated list to the creator
        socket.emit('chatRoomsList', JSON.stringify(allRooms));
        // Emit an updated list to everyone connected to the rooms pageTitle
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms));
      }
    });
  });
  // Listening for the chatter namespace
  io.of('/chatter').on('connection', socket => {
    // Join chatroom
    socket.on('join', data => {
      let usersList = helper.addUserToRoom(allRooms, data, socket);
      // Update the list of active users as shown on the chatroom page
      socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
      socket.emit('updateUsersList', JSON.stringify(usersList.users));
    });

    // When a socket exists
    socket.on('disconnect', () => {
      // Find the room, to which the sicket is connected to and purge the user
      let room = helper.removeUserFromRoom(allRooms, socket);
      socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(room.users));
    });
  });
};
