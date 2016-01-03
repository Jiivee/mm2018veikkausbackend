var express = require('express');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('../config');
var router = express.Router();

router.get('/:token', function(req, res, next) {
  jwt.verify(req.params.token, config.secret, function(err, decoded) {
    if(decoded === undefined || err) {
      res.sendStatus(400);
      return console.error(err);
    }
    else {
      mongoose.model('user').findById(decoded.id, function(err, user) {
        if (err) {
          res.sendStatus(404);
          return console.error(err);
        }
        else {
          if (user.isVerified === true) {
            res.sendStatus(201);
            res.redirect('http://localhost:9000/#/login');
          }
          else {
            user.isVerified === true;
            user.save(function(err) {
              if (err) {
                console.log('user vefify error');
                console.log(err);
              }
              else {
                console.log('user vefify success');
              }
            });
            res.redirect('http://localhost:9000/#/login');
          }

        }
      });
    }
  });
});

module.exports = router;
