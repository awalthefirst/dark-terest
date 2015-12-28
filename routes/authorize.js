var express = require('express');
var router = express.Router();
var userDb = require('../model/users');
var bcrypt = require('bcryptjs');

/* GET login page. */
router.post('/login', function (req, res, next) {
  if (req.auth) {
    res.redirect('/');
  }
  else {

    var password = req.body.password;
    var email = req.body.email.toLowerCase();
    userDb.findUser({
      email: email,
    }, function (err, data) {
      if (err || data === null) {
        // send error
      }
      else {
        
        var hash = data.password;
        var compare = bcrypt.compareSync(password, hash);
        if (compare) {
          res.redirect('/');
        }
        else {
          //send eror
        }

      }
    });
  }

});

/* GET sign up page. */
router.post('/signup', function (req, res, next) {
  if (req.auth) {
    res.redirect('/');
  }
  else {

    var username = req.body.email.toLowerCase();
    var email = req.body.email.toLowerCase();
    var hash = bcrypt.hashSync(req.body.password, 8);

    userDb.addUser({
      username: username,
      email: email,
      password: hash
    }, function (err, data) {
      if (err) {
        // send error

      }
      else {
        res.redirect('/');
      }
    });

  }


});

module.exports = router;
