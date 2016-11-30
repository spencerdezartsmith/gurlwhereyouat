const router = require('express').Router();
const helper = require('../helpers');
const passport = require('passport');

module.exports = () => {
  let routes = {
    get: {
      '/': (req, res, next) => {
        res.render('login', {
          pageTitle: 'My Login Page'
        });
      },
      '/rooms': [helper.isAuthenticated, (req, res, next) => {
        res.render('rooms', {
          user: req.user
        });
      }],
      '/chat': [helper.isAuthenticated, (req, res, next) => {
        res.render('chatroom'), {
          user: req.user
        };
      }],
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/auth/twitter': passport.authenticate('twitter'),
      '/auth/twitter/callback': passport.authenticate('twitter', {
        successRedirect: '/rooms',
        failureRedirect: '/login'
      }),
      '/logout': (req, res, next) => {
        // Logout method is supplied by passport
        req.logout();
        res.redirect('/');
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
