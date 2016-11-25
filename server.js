const express = require('express');
const chat = require('./app');

const app = express();

// setting a port key
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
// express middleware to serve static assets
app.use(express.static('public'));
// express will auto require ejs
app.set('view engine', 'ejs');
app.use('/', chat.router);

app.listen(port, () => {
  console.log('Gurlwhereyouat is listening on port:', port);
});
