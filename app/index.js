const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('login', {
    'pageTitle': 'My Login Page'
  });
});

module.exports = { router };
