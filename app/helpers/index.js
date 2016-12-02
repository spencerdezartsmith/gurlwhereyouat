const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

// Iterate through the routes object to register the routes
const _registerRoutes = (routes, method) => {
  for (const key in routes) {
    if (typeof routes[key] === 'object' &&
        routes[key] !== null &&
        !(routes[key] instanceof Array)
      ) {
      _registerRoutes(routes[key], key);
    } else {
      // Register the routes
      if (method === 'get') {
        router.get(key, routes[key]);
      } else if (method === 'post') {
        router.post(key, routes[key]);
      } else {
        // will use the NA if no method is provided
        router.use(routes[key]);
      }
    }
  }
};

const route = routes => {
  _registerRoutes(routes);
  return router;
};

// Find a single document based on a key
const findOne = (profileID) => {
  return db.userModel.findOne({
    profileId: profileID
  });
};

// Create a new user and returns that instance
const createNewUser = profile => {
  return new Promise((resolve, reject) => {
    const newChatUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });

    newChatUser.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(newChatUser);
      }
    });
  });
};

// The ES6 promisified version of findById
const findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

// A middleware that checks to see if the user is autheniticated & logged in
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // next will invoke a continuation of the route
    next();
  } else {
    res.redirect('/');
  }
};

// Find a chatroom by a given name
const findRoomByName = (allRooms, roomName) => {
  const findRoom = allRooms.findIndex((element, index, array) => {
    if (element.room === roomName) {
      return true;
    } else {
      return false;
    }
  });
  return findRoom > -1;
};

// A function that generates a unique roomID
const randomHex = () => {
  return crypto.randomBytes(24).toString('hex');
};

// Find a chatroom with a given ID
const findRoomByID = (allRooms, roomID) => {
  return allRooms.find((element, index, array) => {
    if (element.roomID === roomID) {
      return true;
    } else {
      return false;
    }
  });
};

// Add a user to a chatroom
const addUserToRoom = (allRooms, data, socket) => {
  // Get the room object
  const getRoom = findRoomByID(allRooms, data.roomID);
  if (getRoom !== undefined) {
    // Get the active user's ID (ObjectID as used in session)
    const userID = socket.request.session.passport.user;
    // Check to see if this user already exists in the room
    const checkUser = getRoom.users.findIndex((element, index, array) => {
      if (element.userID === userID) {
        return true;
      } else {
        return false;
      }
    });

    // If user is already present in the room, remove them first
    if (checkUser > -1) {
      getRoom.users.splice(checkUser, 1);
    }

    // Push the user into the room's users array
    getRoom.users.push({
      socketID: socket.id,
      userID,
      user: data.user,
      userPic: data.userPic
    });

    // Join the room channel
    socket.join(data.roomID);

    // Return the updated room object
    return getRoom;
  }
};

module.exports = {
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  findRoomByName,
  randomHex,
  findRoomByID,
  addUserToRoom
};
