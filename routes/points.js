/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = require('bluebird');
//ONLY Allow access for authenticated user:

var tokenChecker = require('../auth.js');
router.use(tokenChecker);

var populateQuery = {path: 'user', model: mongoose.model('user')};

router.get('/calculate', function(req, res, next) {
  mongoose.model('points').find().exec(function(err, points) {
    points.map(function(point) {
      var user = point.user;
      var tournament = point.tournament;
      var matchbetPoints = 0;
      var playoffbetPoints = 0;
      var topscorerPoints = 0;
      var promise = mongoose.model('matchbet').find({tournament: tournament, user: user}).exec(function(err, matchbets) {
        matchbets.map(function(matchbet) {
          matchbetPoints += matchbet.points;
        })
      })
      promise.then(function() {
        var promise2 = mongoose.model('playoffbet').find({tournament: tournament, user: user}).exec(function(err, playoffbets) {
          playoffbets.map(function(playoffbet) {
            playoffbetPoints += playoffbet.points;
          })
        })
        promise2.then(function() {
          var promise3 = mongoose.model('topscorerbet').findOne({tournament: tournament, user: user}).exec(function(err, topscorerbet) {
            topscorerPoints = topscorerbet.points;
          })
          promise3.then(function() {
            point.match_points = matchbetPoints;
            point.playoff_points = playoffbetPoints;
            point.topscorer_points = topscorerPoints;
            var total = matchbetPoints + playoffbetPoints + topscorerPoints;
            point.total_points = total;
            point.save(function(err) {
              if (err) {
                console.log('total points save error');
              }
            });
          })
        })
      })
    })
  })
  res.sendStatus(200);
});

router.get('/:tournamentId', function(req, res, next) {
  mongoose.model('points').find({tournament: req.params.tournamentId}).populate(populateQuery).sort('-total_points').exec(function(err, points) {
    res.send(points);
  })
})




module.exports = router;
