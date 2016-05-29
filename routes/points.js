/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//ONLY Allow access for authenticated user:
//var router = require('../auth.js');

var jwt    = require('jsonwebtoken');
var config = require('../config');

var populateQuery = {path: 'user', model: mongoose.model('user')};

router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

router.get('/:tournamentId', function(req, res, next) {
  mongoose.model('points').findOne({tournament: req.params.tournamentId}).populate(populateQuery).exec(function(err, points) {
    res.send(points);
  })
})

module.exports = router;
