const routes = require('./routes');
const session = require('./session');

module.exports = {
  router: routes(),
  session: session
};
