var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var tokenChecker = require('../auth.js');
router.use(tokenChecker);

var points = {
  HOME_TEAM_GOALS: 1,
  AWAY_TEAM_GOALS: 1,
  MARK: 2,
  BONUS: 1
};

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
          points += 1;
        }
        if (matchbet.score.away === away) {
          points += 1;
        }
        if (matchbet.mark === mark) {
          points += 2;
        }
        if (matchbet.score.home === home && matchbet.score.away === away && matchbet.mark === mark) {
          points += 1;
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
