const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // Find a user profile in the local db using profile id
    // If user is found, return the user data using the done()
    // If user is not found, create one in the local db and call
  };

  passport.use(new FacebookStrategy(config.fb, authProcessor));
};
