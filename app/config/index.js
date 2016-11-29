// const dev = require('./development.json');

if (process.env.NODE_ENV === 'production') {
// Offer production stage environment variables
  module.exports = {
    host: process.env.host || '',
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    fb: {
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL: process.env.host + '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos']
    }
  };
} else {
// Offer dev stage settings and data
  module.exports = {
    host: 'http://localhost:3000',
    dbURI: 'mongodb://gurlwhereyouatuser:12345678@ds035533.mlab.com:35533/gurlwhereyouat',
    sessionSecret: process.env.SESSION_SECRET,
    fb: {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '//localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos']
    }
  };
}
