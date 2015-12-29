var express = require('express');
var router = express.Router();
var imageDb = require('../model/images');

/* GET home page. */
router.get('/', function (req, res, next) {

  imageDb.getAllimage({}, function (err, data) {
    if (!err) {
      res.render('index', {
        title: 'Dark-terest',
        auth: req.auth,
        data: data.reverse() || [],
        username: req.user.username
      });
    }
  });

});

/*logout*/
router.get('/logout', function (req, res, next) {
  req.darkTerest.reset();
  res.redirect('/');
});

module.exports = router;
