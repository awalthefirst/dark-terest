var express = require('express');
var router = express.Router();
var imageDb = require('../model/images');

  /* GET user wall page. */
router.get('/', function (req, res, next) {
  
  if (req.auth) {
    
    imageDb.getUserImage({
      username: req.user.username
    }, function (err, data) {
      if (!err) {
        res.render('wall', {
          title: 'Dark-wall',
          auth:req.auth,
          data: data || [],
          username:req.user.username
        });

      }
    })

  }
  else {
    return res.redirect('/')
  }

});

module.exports = router;