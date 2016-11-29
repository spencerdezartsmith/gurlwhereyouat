const routes = require('./routes');
const session = require('./session');
require('dotenv').load();

module.exports = {
  router: routes(),
  session
};
