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

  mongoose.model('user').create({name: name, password: password, email: email}, function (err, user) {
    if (err) {
      res.sendStatus(409);
      return console.error(err);
    }
    else {
      var userData = {
        name: user.name,
        id: user._id,
        email: user.email
      }
      res.sendStatus(201);
      mail.sentMailVerificationLink(userData, jwt.sign(userData, config.secret));
      console.log('added: ' + user);
      }
  });
})

module.exports = router;
