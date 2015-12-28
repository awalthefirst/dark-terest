require('dotenv').config({
  silent: true
});
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("client-sessions");
var userDb = require("./model/users")
var index = require('./routes/index');
var wall = require('./routes/wall');
var authorize = require('./routes/authorize');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'darkTerest',
  secret: process.env.sessionSecret,
  duration: 1 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}));

app.use(function (req, res, next) {
  
  if (req.darkTerest && req.darkTerest.user) {

    userDb.findUser({
      username:req.darkTerest.user.email,
      email: req.darkTerest.user.email
    }, function (err, data) {

      if (!err && data !== null) {
        req.auth = true;
        req.user = {
          username: req.darkTerest.user.username,
          email: req.darkTerest.user.email
        }
        next()
      }
      else {
        req.darkTerest.reset();
        req.auth = false;
        next();
      }
    })
  }
  else {
    req.darkTerest.reset();
    req.auth = false;
    next();
  }
});

app.use('/', index);
app.use('/wall',wall);
app.use('/authorize',authorize);
app.use('/api',api);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
