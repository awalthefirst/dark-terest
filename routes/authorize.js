var express = require('express');
var router = express.Router();
var userDb = require('../model/users');
var bcrypt = require('bcryptjs');


/*GET login page*/
router.get('/login', function (req, res, next) {
  if (req.auth) {
    res.redirect('/');
  }
  else {
    res.render('login', {
      title: 'Dark-terest login',
    })
  }

});

/*GET signup page*/
router.get('/signup', function (req, res, next) {
  if (req.auth) {
    res.redirect('/');
  }
  else {
    res.render('signup', {
      title: 'Dark-terest signup',
    })
  }

});

/* post login page. */
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
        console.log(err,data)
        res.render('login', {
            title: 'Dark-terest error',
            error: 'username or password invalid'
          })
          
      }
      else {

        var hash = data.password;
        var compare = bcrypt.compareSync(password, hash);
        if (compare) {

          var user = {
            username: data.username,
            email: data.email
          };
          req.darkTerest.user = user;
          res.redirect('/');
        }
        else {
          //send eror
          res.render('login', {
            title: 'Dark-terest error',
            error: 'username or password invalid'
          })
        }

      }
    });
  }

});

/* post sign up page. */
router.post('/signup', function (req, res, next) {
  if (req.auth) {
    res.redirect('/');
  }
  else {

    var username = req.body.username.toLowerCase();
    var email = req.body.email.toLowerCase();
    var hash = bcrypt.hashSync(req.body.password, 8);

    userDb.addUser({
      username: username,
      email: email,
      password: hash
    }, function (err, data) {
      if (err) {
        // send error
        res.render('signup', {
          title: 'Dark-terest error',
          error: 'Email or Username already exit'
        })

      }
      else {
        
        var user = {
          username: data.username,
          email: data.email
        };
        
        req.darkTerest.user = user;
        
        res.redirect('/');
      }
    });

  }


});

module.exports = router;
