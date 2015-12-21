/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


router.get('/', function(req, res, next) {
  mongoose.model('match').find(function(err, matches) {
  	res.send(matches);
  })
});

module.exports = router;
