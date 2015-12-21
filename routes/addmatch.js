var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


router.get('/:home/:away', function(req, res, next) {
  mongoose.model('match').create({home_team: req.params.home, away_team: req.params.away, score: {home: null, away: null}}, function (err, matchs) {
      if (err) {
        res.send(204);
        return console.error(err);
      }
      res.send(201);
      console.log('added: ' + matchs);
  });
})

module.exports = router;