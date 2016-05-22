/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
//var router = express.Router();
//ONLY Allow access for authenticated user:
var router = require('../auth.js');

var async = require('async');

var populateQuery = {path: 'match', model: mongoose.model('match')};

var populateTeamsQuery = [
  {
    path: 'match.home_team',
    model: mongoose.model('team')
  },
  {
    path: 'match.away_team',
    model: mongoose.model('team')
  }
];

router.get('/:userId/:tournamentId', function(req, res, next) {
  mongoose.model('matchbet').find({tournament: req.params.tournamentId, user: req.params.userId}).sort('match').populate(populateQuery).exec(function(err, matchbets) {
    mongoose.model('match').populate(matchbets, populateTeamsQuery, function(err, matchbets) {
      res.send(matchbets);
    })
  })
})

router.put('/', function(req, res, next) {
  var bets = req.body;

  console.log(bets);
  async.each(bets, function(bet, callback) {
    mongoose.model('matchbet').findById(bet._id, function(err, matchbet) {
      matchbet.score = bet.score;
      console.log(bet.score);
      matchbet.mark = bet.mark;
      matchbet.save(function(err) {
        if (err) {
          console.log('matchbet save error');
          callback();
        }
        else {
          console.log('matchbet save success');
          callback();
        }
      });
    });
  });
  res.send(200);
});

module.exports = router;
