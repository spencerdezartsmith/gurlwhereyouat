const router = require('express').Router();
const db = require('../db');

// Iterate through the routes object to register the routes
let _registerRoutes = (routes, method) => {
  for (let key in routes) {
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

let route = routes => {
  _registerRoutes(routes);
  return router;
};

// Find a single document based on a key
let findOne = (profileID) => {
  return db.userModel.findOne({
    profileId: profileID
  });
};

// Create a new user and returns that instance
let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newChatUser = new db.userModel({
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
let findById = id => {
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
let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // next will invoke a continuation of the route
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated
};
