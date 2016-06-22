var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var populateQuery = [{path: 'home_team', model: mongoose.model('team')}, {path: 'away_team', model: mongoose.model('team')}, {path: 'group', model: mongoose.model('group')}];

router.get('/', function(req, res, next) {
  mongoose.model('playoff').find().sort('-round_of').exec(function(err, playoffs) {
    res.send(playoffs);
  })
});

//THIS SHOULD BE DONE IN CREATE DATA
router.get('/create/playoffs/if/none', function(req, res, next) {
  mongoose.model('playoff').find().sort('round_of').exec(function(err, playoffs) {
    if (playoffs.length === 0) {
      var Playoff = mongoose.model('playoff');
      var round16 = new Playoff({round_of: 16, teams: []});
      var round8 = new Playoff({round_of: 8, teams: []});
      var round4 = new Playoff({round_of: 4, teams: []});
      var round2 = new Playoff({round_of: 2, teams: []});
      var round1 = new Playoff({round_of: 1, teams: []});
      var rounds = [round16, round8, round4, round2, round1];
      Playoff.create(rounds);
    }
    res.sendStatus(200);
  })
});

module.exports = router;
