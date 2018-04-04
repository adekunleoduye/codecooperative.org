var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'the code cooperative', url: req.path });
});

router.get('/program', function(req, res, next) {
  res.render('program', { title: 'our program', url: req.path });
});

router.get('/support', function(req, res, next) {
  res.render('get-involved', { title: 'get involved - the code cooperative', url: req.path });
});

router.get('/team', function(req, res, next) {
  res.render('team', { title: 'team - the code cooperative', url: req.path });
});

// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'log in', url: req.path, user: req.user });
// });

router.get('/login',
  passport.authenticate('github'),
  function(req, res, next){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res, next) {
    res.redirect('/portal');
  });

router.get('/logout', function(req, res, next){
    console.log('logging out');
    req.logout();
    res.redirect('/');
  });

module.exports = router;
