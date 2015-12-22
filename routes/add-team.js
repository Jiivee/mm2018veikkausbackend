var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


router.post('/', function(req, res, next) {
  var name = req.body.name;
  var short_name = req.body.short_name;
  var flag = req.body.flag;

  mongoose.model('team').create({name: name, short_name: short_name, flag: flag}, function (err, team) {
      if (err) {
        res.send(204);
        return console.error(err);
      }
      res.send(201);
      console.log('added: ' + team);
  });
})

module.exports = router;
