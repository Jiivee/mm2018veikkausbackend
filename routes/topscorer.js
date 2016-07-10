var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var populateQuery = [{path: 'home_team', model: mongoose.model('team')}, {path: 'away_team', model: mongoose.model('team')}, {path: 'group', model: mongoose.model('group')}];

router.get('/', function(req, res, next) {
  mongoose.model('topscorer').findOne().exec(function(err, topscorer) {
    res.send(topscorer);
  })
});

//THIS SHOULD BE DONE IN CREATE DATA
router.get('/create/topscorer/if/none', function(req, res, next) {
  mongoose.model('topscorer').find().exec(function(err, topscorer) {
    if (topscorer.length === 0) {
      var Topscorer = mongoose.model('topscorer');
      var scorer = new Topscorer({goals: 0, player: null});
      Topscorer.create(scorer);
    }
    res.sendStatus(200);
  })
});

module.exports = router;
