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
      var promise = mongoose.model('matchbet').find({tournament: tournament, user: user}).exec(function(err, matchbets) {
        matchbets.map(function(matchbet) {
          matchbetPoints += matchbet.points;
        })
      })
      promise.then(function() {
        console.log(matchbetPoints);
        point.match_points = matchbetPoints;
        point.total_points = matchbetPoints;
        point.save(function(err) {
          if (err) {
            console.log('total points save error');
          }
        });
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
