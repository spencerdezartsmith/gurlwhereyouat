const express = require('express');

const app = express();
// setting a port key
app.set('port', process.env.PORT || 3000);
const port = app.get('port');

app.get('/', (req, res, next) => {
  res.send('<h1>Hello Express</h1>');
});

app.get('/dashboard', (req, res, next) => {
  res.send('<h1>This is the dashboard');
});

app.listen(port, () => {
  console.log('Gurlwhereyouat is listening on port:', port);
});
