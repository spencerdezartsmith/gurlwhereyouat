const express = require('express');
const chat = require('./app');

const app = express();
const passport = require('passport');

// setting a port key
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
// express middleware to serve static assets
app.use(express.static('public'));
// express will auto require ejs
app.set('view engine', 'ejs');

app.use(chat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chat.router);

chat.ioServer(app).listen(port, () => {
  console.log('Gurlwhereyouat is listening on port:', port);
});
