var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var tokenChecker = require('../auth.js');
router.use(tokenChecker);

var MATCH_POINTS = {
  HOME_TEAM_GOALS: 1,
  AWAY_TEAM_GOALS: 1,
  MARK: 2,
  BONUS: 1
};

var PLAYOFF_POINTS = {
  ROUND_OF_16: 2,
  ROUND_OF_8: 3,
  ROUND_OF_4: 5,
  ROUND_OF_2: 8,
  ROUND_OF_1: 13
};


function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] !== null) {
      if (list[i].toString() === obj.toString()) {
          return true;
      }
    }
  }
  return false;
}

router.put('/playoff', function(req, res, next) {
  var rounds = req.body;
  rounds.map(function(round) {
    mongoose.model('playoff').findById(round._id, function(err, playoff) {
      playoff.teams = round.teams;
      playoff.save(function(err) {
        if (err) {
          console.log('playoffbet save error');
        }
      });
    })
    mongoose.model('playoffbet').find({round_of: round.round_of}).exec(function(err, playoffbets) {
      console.log(playoffbets);
      roundTeams = round.teams;
      playoffbets.map(function(playoffbet) {
        var playoffPoints = 0;
        var numberOfPoints;
        if (playoffbet.round_of === 16) {
          numberOfPoints = PLAYOFF_POINTS.ROUND_OF_16;
        }
        else if (playoffbet.round_of === 8) {
          numberOfPoints = PLAYOFF_POINTS.ROUND_OF_8;
        }
        else if (playoffbet.round_of === 4) {
          numberOfPoints = PLAYOFF_POINTS.ROUND_OF_4;
        }
        else if (playoffbet.round_of === 2) {
          numberOfPoints = PLAYOFF_POINTS.ROUND_OF_2;
        }
        else if (playoffbet.round_of === 1) {
          numberOfPoints = PLAYOFF_POINTS.ROUND_OF_1;
        }
        roundTeams.map(function(team) {
          if (containsObject(team, playoffbet.teams)) {
            playoffPoints += numberOfPoints;
          }
        })
        playoffbet.points = playoffPoints;
        console.log(playoffPoints);
        playoffbet.save(function(err) {
          if (err) {
            console.log('playoffbet points save error');
          }
          else {
            console.log('playoffbet points save success');
          }
        });
      })
    })
  })
  res.sendStatus(200);
})

router.put('/match/:id', function(req, res, next) {
  var matchResult = req.body.score;
  var home = parseInt(matchResult.home);
  var away = parseInt(matchResult.away);
  var mark;
  if (home > away) {
    mark = '1';
  }
  else if (away > home) {
    mark = '2';
  }
  else if (away === home) {
    mark = 'X'
  }
  mongoose.model('match').findById(req.params.id, function(err, match) {
    match.score.home = home;
    match.score.away = away;
    match.mark = mark;
    match.save(function(err) {
      if (err) {
        console.log('match result save error');
      }
    });
    mongoose.model('matchbet').find({match: match._id}).exec(function(err, matchbets) {
      matchbets.map(function(matchbet) {
        var points = 0;
        if (matchbet.score.home === home) {
          points += MATCH_POINTS.HOME_TEAM_GOALS;
        }
        if (matchbet.score.away === away) {
          points += MATCH_POINTS.AWAY_TEAM_GOALS;
        }
        if (matchbet.mark === mark) {
          points += MATCH_POINTS.MARK;
        }
        if (matchbet.score.home === home && matchbet.score.away === away && matchbet.mark === mark) {
          points += MATCH_POINTS.BONUS;
        }
        matchbet.points = points;
        matchbet.save(function(err) {
        if (err) {
          console.log('matchbet points save error');
        }
        else {
          console.log('matchbet points save success');
        }
        });
      })
    })
  })
res.sendStatus(200);
});


module.exports = router;
