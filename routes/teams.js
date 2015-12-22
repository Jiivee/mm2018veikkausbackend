/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


router.get('/', function(req, res, next) {
  mongoose.model('team').find().populate([{path: 'group', model: mongoose.model('group')}, {path: 'matches', model: mongoose.model('match')}]).exec(function(err, teams) {
  	res.send(teams);
  })
});

module.exports = router;
