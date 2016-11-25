const router = require('express').Router();

module.exports = () => {
  const routes = {
    get: {
      '/': (req, res, next) => {
        res.render('login');
      },
      '/rooms': (req, res, next) => {
        res.render('rooms');
      },
      '/chat': (req, res, next) => {
        res.render('chatroom');
      }
    },
    post: {

    }
  };
};

// Iterate through the routes object and mount the routes
