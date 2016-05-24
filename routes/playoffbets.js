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

router.get('/playoff/:userId/:tournamentId', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId, user: req.params.userId}).sort('round_of').exec(function(err, playoffbets) {
    res.send(playoffbets);
  })
})

router.put('/playoff/', function(req, res, next) {
  var bets = req.body;
  console.log(bets);
  async.each(bets, function(bet, callback) {
    mongoose.model('playoffbet').findById(bet._id, function(err, playoffbet) {
      playoffbet.teams = bet.teams;
      playoffbet.save(function(err) {
        if (err) {
          console.log('playoffbet save error');
          callback();
        }
        else {
          console.log('playoffbet save success');
          callback();
        }
      });
    });
  });
  res.send(200);
});

module.exports = router;
