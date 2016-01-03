/**
	Get: Shows all the users in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
//var router = express.Router();

//ONLY Allow access for authenticated user:
var router = require('../auth.js');



var populateQuery = [
  {path: 'tournaments.tournament', model: mongoose.model('tournament')},
  {path: 'tournaments.match_bets', model: mongoose.model('matchbet')}
];

var populateMatchesQuery = {
  path: 'tournaments.match_bets.match',
  model: mongoose.model('match')
};

var populateTeamsQuery = [
  {
    path: 'tournaments.match_bets.match.home_team',
    model: mongoose.model('team')
  },
  {
    path: 'tournaments.match_bets.match.away_team',
    model: mongoose.model('team')
  }
];

router.get('/', function(req, res, next) {
  mongoose.model('user').find().populate(populateQuery).exec(function(err, users) {
    mongoose.model('matchbet').populate(users, populateMatchesQuery, function(err, users) {
      //mongoose.model('match').populate(users, populateTeamsQuery, function(err, users) {
        res.send(users);
      //})
    })
  })
});

router.get('/:id', function(req, res, next) {
  mongoose.model('user').findOne({_id: req.params.id}).populate(populateQuery).exec(function(err, user) {
    mongoose.model('matchbet').populate(user, populateMatchesQuery, function(err, user) {
      mongoose.model('match').populate(user, populateTeamsQuery, function(err, user) {
        res.send(user);
      })
    })
  })
});

router.get('/email/:email', function(req, res, next) {
  mongoose.model('user').findOne({email: req.params.email}).populate(populateQuery).exec(function(err, user) {
    mongoose.model('matchbet').populate(user, populateMatchesQuery, function(err, user) {
      mongoose.model('match').populate(user, populateTeamsQuery, function(err, user) {
        res.send(user);
      })
    })
  })
});

module.exports = router;
