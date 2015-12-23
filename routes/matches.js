/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var populateQuery = [{path: 'home_team', model: mongoose.model('team')}, {path: 'away_team', model: mongoose.model('team')}, {path: 'group', model: mongoose.model('group')}];

router.get('/', function(req, res, next) {
  mongoose.model('match').find().populate(populateQuery).exec(function(err, matches) {
  	res.send(matches);
  })
});

router.get('/id/:id', function(req, res, next) {
  mongoose.model('match').findOne({_id: req.params.id}).populate(populateQuery).exec(function(err, matches) {
    res.send(matches);
  })
});

router.get('/number/:number', function(req, res, next) {
  mongoose.model('match').findOne({'match_number': req.params.number}).populate(populateQuery).exec(function(err, matches) {
    res.send(matches);
  })
});

module.exports = router;
