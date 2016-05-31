/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//ONLY Allow access for authenticated user:
var tokenChecker = require('../auth.js');
router.use(tokenChecker);

var async = require('async');


router.get('/:userId/:tournamentId/:round_of', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId, user: req.params.userId, round_of: req.params.round_of}).populate({path: 'teams', model: mongoose.model('team')}).exec(function(err, playoffbets) {
    res.send(playoffbets);
  })
})

router.get('/:userId/:tournamentId/:round_of/team-ids', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId, user: req.params.userId, round_of: req.params.round_of}).exec(function(err, playoffbets) {
    res.send(playoffbets);
  })
})

router.put('/', function(req, res, next) {
  var bets = req.body;
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
      var round = playoffbet.round_of/2;
      if (round !== 1/2) {
        mongoose.model('playoffbet').findOne({tournament: playoffbet.tournament, user: playoffbet.user, round_of: round}, function(err, nextbet) {
          nextbet.teams = [];
          nextbet.save(function(err) {
            if (err) {
              console.log('nextbet save error');
            }
            else {
              console.log('nextbet save success');
            }
          });
        })
      }
    });
  });
  res.send(200);
});

module.exports = router;
