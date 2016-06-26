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

var populateQuery = [
  {path: 'teams', model: mongoose.model('team')},
  {path: 'user', model: mongoose.model('user')}
];


router.get('/:tournamentId', function(req, res, next) {
  mongoose.model('playoffbet').find({tournament: req.params.tournamentId}).populate(populateQuery).sort('-round_of').exec(function(err, playoffbets) {
    playoffbets.map(function(playoffbet) {
      if (playoffbet.user !== null && playoffbet.user.name !== undefined) {
        results.push(playoffbet);
      }
    });
    results.sort(function(a, b) {
      if (a.round_of > b.round_of) {
        return -1;
      }
      if (a.round_of < b.round_of) {
        return 1;
      }
      if (a.user.name < b.user.name) {
        return -1;
      }
      if (a.user.name > b.user.name) {
        return 1;
      }
      return 0;
    });
    results.map(function(result) {
      result.teams.sort(function(c, d) {
        if (c.short_name < d.short_name) {
        return -1;
        }
        if (c.short_name > d.short_name) {
          return 1;
        }
        return 0;
      });
    });
    res.send(playoffbets);
  })
})

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
