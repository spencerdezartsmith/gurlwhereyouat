const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('login', {
    pageTitle: 'My Login Page'
  });
});

router.get('/info', (req, res, next) => {
  res.send('test page');
});

module.exports = { router };
