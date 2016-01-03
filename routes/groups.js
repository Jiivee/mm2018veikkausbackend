/**
  Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', function(req, res, next) {
  mongoose.model('group').find().populate({path: 'teams', model: mongoose.model('team')}).exec(function(err, groups) {
    res.send(groups);
  })
});

module.exports = router;


