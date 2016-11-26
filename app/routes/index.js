const router = require('express').Router();
const helper = require('../helpers');

module.exports = () => {
  let routes = {
    get: {
      '/': (req, res, next) => {
        res.render('login', {
          pageTitle: 'My Login Page'
        });
      },
      '/rooms': (req, res, next) => {
        res.render('rooms');
      },
      '/chat': (req, res, next) => {
        res.render('chatroom');
      }
    },
    post: {

    },
    'NA': (req, res, next) => {
      // process.cwd provides the absolute path of the entry file
      // which is this case is the server.js file
      res.status(404).sendFile(process.cwd() + '/views/404.htm');
    }
  };

 return helper.route(routes);
};
