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

router.get('/login', passport.authenticate('github'), function(req, res, next){
  // Do nothing
});

router.get('/portal', function(req, res, next) {
  res.render('portal', { title: 'student portal - the code cooperative', url: req.path });
});

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res, next) {
    res.redirect('/portal');
  }
);

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
