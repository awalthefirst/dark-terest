var express = require('express');
var router = express.Router();
var imageDb = require('../model/images');

/* add new image pin. */

router.post('/addpin', function (req, res, next) {

  if (req.auth) {
    imageDb.addImage({
      name: req.body.name.toLowerCase(),
      username: req.body.username.toLowerCase(),
      src: req.body.src.toLowerCase()
    }, function (err) {
      if (!err) {
        res.end();
      }

    });

  }
  else {
    return res.sendStatus(401)
  }

});

router.delete('/addpin', function (req, res, next) {

  if (req.auth) {

    imageDb.removeImage({
      name: req.body.name.toLowerCase(),
      username: req.body.username.toLowerCase(),
      src: req.body.src.toLowerCase()
    }, function (err) {
      if (!err) {
        res.end();
      }

    });

  }
  else {
    return res.sendStatus(401);
  }

});

module.exports = router;