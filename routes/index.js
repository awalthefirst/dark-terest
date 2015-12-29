var express = require('express');
var router = express.Router();
var imageDb = require('../model/images');

/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.auth) {
    respond();
  }
  else {
    respond();
  }

  function respond() {
    
    imageDb.getAllimage({}, function (err, data) {
      if (!err) {
        res.render('index', {
          title: 'Dark-terest',
          auth: req.auth,
          data: data || [],
          username: req.user.username
        });
      }
    });
  }

});

/*logout*/
router.get('/logout', function (req, res, next) {
  req.darkTerest.reset();
  res.redirect('/');
});

module.exports = router;
