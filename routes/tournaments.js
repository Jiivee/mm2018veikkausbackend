/**
  Get: Shows all the users in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
//var router = express.Router();
//ONLY Allow access for authenticated user:
var router = require('../auth.js');
var email = require('../email');

mongoose.Promise = require('bluebird');


var populateQuery = [{path: 'owner', model: mongoose.model('user')}, {path: 'users', model: mongoose.model('user')}];

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].toString() === obj.toString()) {
            return true;
        }
    }
    return false;
}

//All tournaments
router.get('/', function(req, res, next) {
  mongoose.model('tournament').find().populate(populateQuery).exec(function(err, tournaments) {
    res.send(tournaments);
  })
});

//tournament by id
router.get('/:id', function(req, res, next) {
  mongoose.model('tournament').findOne({_id: req.params.id}).populate(populateQuery).exec(function(err, tournament) {
    res.send(tournament);
  })
});

//create new tournament
router.post('/', function(req, res, next) {
  var owner_id = req.body.owner._id;
  var tournament = {
    name: req.body.name,
    owner: req.body.owner,
    users: [req.body.owner],
    game_modes: req.body.game_modes,
    points: req.body.points
  };

  mongoose.model('tournament').create(tournament, function (err, tournament) {
    if (err) {
      res.sendStatus(204);
      return console.error(err);
    }
    else {
      mongoose.model('user').findById(owner_id, function(err, user) {
        if (!user) {
          return next(new Error('Could not load user'));
        }
        else {
          var bets = [];
          mongoose.model('match').find().exec(function(err, matches) {
            if (err) {
              console.log('find matches error: ', err);
            }
            else {
              for (var match in matches) {
                var bet = {
                  match: matches[match]._id,
                  score: {
                    home: null,
                    away: null
                  },
                  mark: null
                };
                bets.push(bet);
              }
              var promise = mongoose.model('matchbet').create(bets);
              promise.then(function (matchbets) {
                user.tournaments.push({tournament: tournament, match_bets: matchbets});
                user.save(function(err) {
                  if (err) {
                    console.log('user update error');
                    console.log(err);
                  }
                  else {
                    console.log('user update success');
                  }
                });
              })
              .catch(function(err){
                // just need one of these
                console.log('error:', err);
              });
            }
          });
        }
      });
      res.sendStatus(201);
      console.log('added: ' + tournament);
      email.sendMail();
    }
  });
});


//invite user to tournament
router.put('/invite-user', function(req, res, next) {

  var tournament_id = req.body.tournament_id;
  var user_email = req.body.user_email;

  mongoose.model('tournament').findById(tournament_id, function(err, tournament) {
    if (!tournament)
      return next(new Error('Could not load tournament'));
    else {
      mongoose.model('user').findOne({email: user_email}).exec(function(err, user) {
        if (!user)
          return next(new Error('Could not load user'));
        else {
          if (containsObject(user._id, tournament.users)) {
            return next(new Error('User already in tournament'));
          }
          else {
            tournament.users.push(user);
            tournament.save(function(err) {
              if (err)
                console.log('user invite error');
              else
                console.log('user invite success');
            });

            var bets = [];
            mongoose.model('match').find().exec(function(err, matches) {
              if (err) {
                console.log('find matches error: ', err);
              }
              else {
                for (var match in matches) {
                  var bet = {
                    match: matches[match]._id,
                    score: {
                      home: null,
                      away: null
                    },
                    mark: null
                  };
                  bets.push(bet);
                }
                var promise = mongoose.model('matchbet').create(bets);
                promise.then(function (matchbets) {
                  user.tournaments.push({tournament: tournament, match_bets: matchbets});
                  user.save(function(err) {
                    if (err) {
                      console.log('user update error');
                      console.log(err);
                    }
                    else {
                      console.log('user update success');
                    }
                  });
                })
                .catch(function(err){
                  // just need one of these
                  console.log('error:', err);
                });
              }
            });
          }
        }
      });
    }
  });
});

module.exports = router;
