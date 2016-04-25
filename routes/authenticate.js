var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var jwt    = require('jsonwebtoken');
var config = require('../config');


router.post('/', function(req, res) {
  console.log('hello');
  console.log(req.headers);
  console.log(req.body);
  // find the user
  mongoose.model('user').findOne({email: req.body.email}, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var userData = {_id: user._id, email: user.email, name: user.name};
        var token = jwt.sign(userData, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        // return the information including token as JSON
        res.send({
          success: true,
          token: token,
          user: userData
        });
      }

    }

  });
});

module.exports = router;
