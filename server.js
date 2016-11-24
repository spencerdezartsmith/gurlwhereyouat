const express = require('express');

const app = express();
const chat = require('./app');

// setting a port key
app.set('port', process.env.PORT || 3000);

// express middleware to serve static assets
app.use(express.static('public'));

// express will auto require ejs
app.set('view engine', 'ejs');

app.use('/', chat.router);

const port = app.get('port');

app.get('/dashboard', (req, res, next) => {
  res.send('<h1>This is the dashboard');
});

app.listen(port, () => {
  console.log('Gurlwhereyouat is listening on port:', port);
});
