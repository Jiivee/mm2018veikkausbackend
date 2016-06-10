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


router.get('/:userId/:tournamentId', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId, user: req.params.userId}).sort('-round_of').exec(function(err, playoffbets) {
    res.send(playoffbets);
  })
})

router.get('/:userId/:tournamentId/teams', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId, user: req.params.userId}).populate({path: 'teams', model: mongoose.model('team')}).sort('-round_of').exec(function(err, playoffbets) {
    res.send(playoffbets);
  })
})

router.get('/:userId/:tournamentId/:round_of/team-ids', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId, user: req.params.userId, round_of: req.params.round_of}).exec(function(err, playoffbets) {
    res.send(playoffbets);
  })
})

router.put('/', function(req, res, next) {
  res.sendStatus(403);
  /*
  var bets = req.body;
  async.each(bets, function(bet, callback) {
    console.log(bet);
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
  res.sendStatus(200);
  */
});

module.exports = router;
