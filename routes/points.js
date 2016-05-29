/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//ONLY Allow access for authenticated user:
var tokenChecker = require('../auth.js');
router.use(tokenChecker);

var populateQuery = {path: 'user', model: mongoose.model('user')};

router.get('/:tournamentId', function(req, res, next) {
  mongoose.model('points').find({tournament: req.params.tournamentId}).populate(populateQuery).exec(function(err, points) {
    res.send(points);
  })
})

module.exports = router;
