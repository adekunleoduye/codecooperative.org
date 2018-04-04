var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var mongoose = require('mongoose')
var GitHubStrategy = require('passport-github2').Strategy;
// var session = require('express-session')
var app = express();

var GITHUB_CLIENT_ID = 'cc3a9d995d4917c88757';
var GITHUB_CLIENT_SECRET = '051307994a58536492587ae5a08c7beef38e247d';

var index = require('./routes/index');
var user = require('./routes/users');

// mongoose.connect('mongodb://gmarraro:codecoop2018@ds125195.mlab.com:25195/code-coop-users')
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  scope: [ 'email, profile' ],
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.session({ secret: 'code cooperative' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.pug');
});

// app.get('/auth/github',
//   passport.authenticate('github'));

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/portal');
//   });

// app.get('/logout', function(req, res){
//     console.log('logging out');
//     req.logout();
//     res.redirect('/');
//   });
// app.post('/login', passport.authenticate('local', { successRedirect: '/portal',
//                                                     failureRedirect: '/login' },
//   res.redirect('/users/' + req.user.username))
// );

module.exports = app;
