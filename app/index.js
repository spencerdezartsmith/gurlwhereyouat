const routes = require('./routes');
const session = require('./session');
require('dotenv').load();

// Social Authentication Logic
require('./auth')();

module.exports = {
  router: routes(),
  session
};
