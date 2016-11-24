const express = require('express');
const path = require('path');

const app = express();
// setting a port key
app.set('port', process.env.PORT || 3000);
const port = app.get('port');

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/views/login.htm'));
});

app.get('/dashboard', (req, res, next) => {
  res.send('<h1>This is the dashboard');
});

app.listen(port, () => {
  console.log('Gurlwhereyouat is listening on port:', port);
});
