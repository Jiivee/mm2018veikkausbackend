/**
  Get: Shows all the users in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../config');
var jwt    = require('jsonwebtoken');
//ONLY Allow access for authenticated user:
var tokenChecker = require('../auth.js');
router.use(tokenChecker);

var mail = require('../email');

mongoose.Promise = require('bluebird');


var populateQuery = [{path: 'owner', model: mongoose.model('user')}, {path: 'users', model: mongoose.model('user')}];

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] !== null) {
        if (list[i].toString() === obj.toString()) {
            return true;
        }
      }
    }
    return false;
}

//All tournaments
router.get('/', function(req, res, next) {
  mongoose.model('tournament').find().populate(populateQuery).exec(function(err, tournaments) {
    res.send('tournaments');
  })
});

//tournament by id
router.get('/:tournamentId', function(req, res, next) {
  mongoose.model('tournament').findOne({_id: req.params.tournamentId}).populate(populateQuery).exec(function(err, tournament) {
    res.send(tournament);
  })
});

//create new tournament
router.post('/', function(req, res, next) {
  var owner_id = req.body.tournament.owner;
  var tournament = req.body.tournament;
  tournament.users = [owner_id];
  console.log(tournament);

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
                  mark: null,
                  user: owner_id,
                  tournament: tournament
                };
                bets.push(bet);
              }
              var promise = mongoose.model('matchbet').create(bets);
              var rounds = [16, 8, 4, 2, 1];
              rounds.map(function(round) {
                var playoffbet = {
                  user: owner_id,
                  tournament: tournament,
                  round_of: round,
                  teams: []
                }
                mongoose.model('playoffbet').create(playoffbet);
              });
              var topscorerbet = {
                user: owner_id,
                tournament: tournament,
                goals: null,
                player: null
              };
              mongoose.model('topscorerbet').create(topscorerbet);
              var points = {
                user: owner_id,
                tournament: tournament
              };
              mongoose.model('points').create(points);
              promise.then(function (matchbets) {
                user.tournaments.push(tournament);
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
    }
  });
});


//invite user to tournament
router.put('/invite-user', function(req, res, next) {
  console.log('inviting user');

  var tournamentId = req.body.tournamentId;
  var email = req.body.email;

  mongoose.model('tournament').findById(tournamentId, function(err, tournament) {
    if (!tournament)
      return next(new Error('Could not load tournament'));
    else {
      mongoose.model('user').findOne({email: email}).exec()
      .then(function(user) {
        console.log(user);
        if (!user) {
          console.log('!user')
          return mongoose.model('user').create({email: email}, function(err, newUser) {
            console.log('creating new user');
            var userData = {
              email: newUser.email
            };
            //mail.sentMailVerificationLink(userData, jwt.sign(userData, config.secret));
            console.log('user did not exist, created new user: ' + newUser);

            console.log('email start here');
            mail.sentMailNewUserVerification(tournament, userData, jwt.sign(userData, config.secret));
            return newUser;
          })
        }
        else {
          console.log('user found' + user);
          console.log(tournament);
          if (containsObject(user._id, tournament.users)) {
            return next(new Error('User already in tournament'));
          }
          return user;
        }
      })
      .then(function(user) {
        console.log('after user been created');
        console.log(user);
        if (user !== undefined) {
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
                  mark: null,
                  user: user,
                  tournament: tournament
                };
                bets.push(bet);
              }
              var promise = mongoose.model('matchbet').create(bets);
              var rounds = [16, 8, 4, 2, 1];
              rounds.map(function(round) {
                var playoffbet = {
                  user: user,
                  tournament: tournament,
                  round_of: round,
                  teams: []
                }
                mongoose.model('playoffbet').create(playoffbet);
              });
              var topscorerbet = {
                user: user,
                tournament: tournament,
                goals: null,
                player: null
              };
              mongoose.model('topscorerbet').create(topscorerbet);
              var points = {
                user: user,
                tournament: tournament
              };
              mongoose.model('points').create(points);
              promise.then(function (matchbets) {
                user.tournaments.push(tournament);
                user.save(function(err) {
                  if (err) {
                    console.log('user update error');
                    console.log(err);
                  }
                  else {
                    console.log('user update success');
                  }
                });
                res.sendStatus(200);
              })
              .catch(function(err){
                // just need one of these
                console.log('error:', err);
              });
            }
          });
        }
        else {
          res.sendStatus(500);
        }
      })
    }
  });
});

module.exports = router;
