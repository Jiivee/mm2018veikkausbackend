/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//ONLY Allow access for authenticated user:
var tokenChecker = require('../auth.js');
router.use(tokenChecker);

router.get('/:userId/:tournamentId', function(req, res, next) {
  mongoose.model('topscorerbet').findOne({tournament: req.params.tournamentId, user: req.params.userId}).exec(function(err, topscorerbet) {
    res.send(topscorerbet);
  })
})

router.put('/', function(req, res, next) {
  var topscorerbet = req.body;
  mongoose.model('topscorerbet').findById(topscorerbet._id, function(err, bet) {
    bet.player = topscorerbet.player;
    bet.goals = topscorerbet.goals;
    bet.player_team = topscorerbet.player_team;
    bet.save(function(err) {
      if (err) {
        console.log('topscorerbet save error');
      }
      else {
        console.log('topscorerbet save success');
      }
    });
  });
  res.sendStatus(200);
});

module.exports = router;
