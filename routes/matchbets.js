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

var populateQuery = {path: 'match', model: mongoose.model('match')};

var populateQueryMatchUser = [
  {
    path: 'match', model: mongoose.model('match')
  },
  {
    path: 'user', model: mongoose.model('user')
  },
];

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



router.get('/nextbets/:tournamentId/', function(req, res, next) {
  mongoose.model('match').find({mark: null}).sort('match_number').limit(4).exec(function(err, matches) {
    var matchIds = [];
    var numberOfGames = matches.length;
    matches.map(function(match) {
      matchIds.push(match._id);
    })
    mongoose.model('matchbet').find({match: { $in: matchIds}, tournament: req.params.tournamentId}).populate(populateQueryMatchUser).sort('user').exec(function(err, matchbets) {
      mongoose.model('match').populate(matchbets, populateTeamsQuery, function(err, matchbets) {
      results = [];
        matchbets.map(function(matchbet) {
          if (matchbet.user !== null && matchbet.user.name !== undefined) {
            results.push(matchbet);
          }
        })
        results.sort(function(a, b) {
          if (a.user.name < b.user.name) {
            return -1;
          }
          if (a.user.name > b.user.name) {
            return 1;
          }
          if (a.match.match_number < b.match.match_number) {
            return -1;
          }
          if (a.match.match_number > b.match.match_number) {
            return 1;
          }
          return 0;
        });
        var data = [];
        var oneUser = [];
        var j=0;
        for (var i=0; i<results.length; i++) {
          oneUser.push(results[i]);
          j++;
          if (j===numberOfGames) {
            data.push(oneUser);
            oneUser = [];
            j=0;
          }
        }
        res.send(data);
      })
    })
  })




  /*{ $nin: matchIds }
  mongoose.model('matchbet').find({tournament: req.params.tournamentId, user: req.params.userId}).sort('match').populate(populateQueryMatchUser).exec(function(err, matchbets) {
    mongoose.model('match').populate(matchbets, populateTeamsQuery, function(err, matchbets) {
      var bets = []

      res.send(matchbets);
    })
  })
*/
})

router.get('/:userId/:tournamentId', function(req, res, next) {
  mongoose.model('matchbet').find({tournament: req.params.tournamentId, user: req.params.userId}).sort('match').populate(populateQuery).exec(function(err, matchbets) {
    mongoose.model('match').populate(matchbets, populateTeamsQuery, function(err, matchbets) {
      res.send(matchbets);
    })
  })
})

router.put('/', function(req, res, next) {
  res.sendStatus(403);
  /*
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
  */
});

module.exports = router;
