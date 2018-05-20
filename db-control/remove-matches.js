/**
  This is only for testing purposes. Inserts ad and user collections to the db.
**/

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

mongoose.connect('mongodb://localhost/fv2018', function(err, db) {
if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
  }
});

require('../models/Schemas')

//Greate Teams
var Team = mongoose.model('team');
var Group = mongoose.model('group');
var Match = mongoose.model('match');
var Player = mongoose.model('player');
/*
if (process.argv.slice(2)[0] == 'tournament') {
  Tournament.remove('tournament', function(err, result) {
    if (err) return err;
  });
  console.log('Deleted tournaments');
}

if (process.argv.slice(2)[0] == 'user') {
  User.remove('user', function(err, result) {
    if (err) return err;
  });
  console.log('Deleted users');
}

if (process.argv.slice(2)[0] == 'matchbet') {
  MatchBet.remove('matchbet', function(err, result) {
    if (err) return err;
  });
  console.log('Deleted matchbets');
}
*/
if (process.argv.slice(2)[0] == 'all') {
  Team.remove('team', function(err, result) {
    if (err) return err;
    console.log('Deleted teams');
  });
  Group.remove('group', function(err, result) {
    if (err) return err;
    console.log('Deleted groups');
  });
  Match.remove('match', function(err, result) {
    if (err) return err;
    console.log('Deleted matches');
  });
  Player.remove('player', function(err, result) {
    if (err) return err;
    console.log('Deleted players');
  });
}

mongoose.connection.close()
