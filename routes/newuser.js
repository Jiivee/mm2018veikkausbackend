var express = require('express');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('../config');
var mail = require('../email');

var router = express.Router();

router.post('/', function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  console.log(email);

  mongoose.model('user').findOne({email: email}).exec(function(err, user) {
    console.log(user);
    if (err) {
      res.sendStatus(409);
      return console.error(err);
    }
    else {
      if (user.isVerified === false) {
        user.isVerified = true;
        user.name = name;
        user.password = password;
        user.save(function(err) {
        if (err) {
          console.log('user save error');
        }
        else {
          console.log('user save success');
        }
      });
      }
    }
  });
})

module.exports = router;
