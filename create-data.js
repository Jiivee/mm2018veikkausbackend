/**
  This is only for testing purposes. Inserts ad and user collections to the db.
**/

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var fs = require('fs');
git push heroku master
mongoose.connect('mongodb://localhost/fv', function(err, db) {
if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
  }
});

//mongoose.connect('mongodb://heroku_n8tthvx3:gg52807ergarga789k8f20jmp1@ds033285.mongolab.com:33285/heroku_n8tthvx3');

//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js')) {
    require(__dirname + '/models/' + filename)
  }
})

//Greate Teams
var Team = mongoose.model('team');

Team.remove('team', function(err, result) {
  if (err) return handleError(err);
});

var fra = new Team({name: 'France', short_name: 'FRA', flag: ''});
var eng = new Team({name: 'England', short_name: 'ENG', flag: ''});
var cze = new Team({name: 'Czech Republic', short_name: 'CZE', flag: ''});
var isl = new Team({name: 'Iceland', short_name: 'ISL', flag: ''});
var aut = new Team({name: 'Austria', short_name: 'AUT', flag: ''});
var nir = new Team({name: 'Northern Ireland', short_name: 'NIR', flag: ''});
var por = new Team({name: 'Portugal', short_name: 'POR', flag: ''});
var esp = new Team({name: 'Spain', short_name: 'ESP', flag: ''});
var che = new Team({name: 'Switzerland', short_name: 'CHE', flag: ''});
var ita = new Team({name: 'Italy', short_name: 'ITA', flag: ''});
var bel = new Team({name: 'Belgium', short_name: 'BEL', flag: ''});
var wal = new Team({name: 'Wales', short_name: 'WAL', flag: ''});
var rou = new Team({name: 'Romania', short_name: 'ROU', flag: ''});
var alb = new Team({name: 'Albania', short_name: 'ALB', flag: ''});
var ger = new Team({name: 'Germany', short_name: 'GER', flag: ''});
var pol = new Team({name: 'Poland', short_name: 'POL', flag: ''});
var rus = new Team({name: 'Russia', short_name: 'RUS', flag: ''});
var svk = new Team({name: 'Slovakia', short_name: 'SVK', flag: ''});
var cro = new Team({name: 'Croatia', short_name: 'CRO', flag: ''});
var tur = new Team({name: 'Turkey', short_name: 'TUR', flag: ''});
var hun = new Team({name: 'Hungary', short_name: 'HUN', flag: ''});
var irl = new Team({name: 'Republic of Ireland', short_name: 'IRL', flag: ''});
var swe = new Team({name: 'Sweden', short_name: 'SWE', flag: ''});
var ukr = new Team({name: 'Ukraine', short_name: 'UKR', flag: ''});

var teams = [fra, eng, cze, isl, aut, nir, por, esp, che, ita, bel, wal, rou, alb, ger, pol, rus, svk, cro, tur, hun, irl, swe, ukr];

for(var i in teams) {
  teams[i].save(function (err) {
    if (err) return handleError(err);
  })
};


//Create Groups
var Group = mongoose.model('group');

Group.remove('group', function(err, result) {
  if (err) return handleError(err);
});

var group_a = new Group({name: 'A', teams: [alb, fra, rou, che]});
var group_b = new Group({name: 'B', teams: [eng, rus, svk, wal]});
var group_c = new Group({name: 'C', teams: [ger, nir, pol, ukr]});
var group_d = new Group({name: 'D', teams: [cro, cze, esp, tur]});
var group_e = new Group({name: 'E', teams: [bel, ita, irl, swe]});
var group_f = new Group({name: 'F', teams: [aut, hun, isl, por]});

var groups = [group_a, group_b, group_c, group_d, group_e, group_f];

for(var i in groups) {
  groups[i].save(function (err) {
    if (err) return handleError(err);
  })
};


//Update teams with groups
for (var i in teams) {
  for (var j in groups) {
    for (var k in groups[j].teams) {
      if (groups[j].teams[k] === teams[i]._id) {
        teams[i].group = groups[j];
      }
    }
  }
}
for(var i in teams) {
  teams[i].save(function (err) {
    if (err) return handleError(err);
  })
};



//Create Matches
var Match = mongoose.model('match');

Match.remove('match', function(err, result) {
  if (err) return handleError(err);
});

var m1 = new Match({match_number: 1, home_team: fra, away_team: rou, time: '2016-06-10T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m2 = new Match({match_number: 2, home_team: alb, away_team: che, time: '2016-06-11T14:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m3 = new Match({match_number: 3, home_team: wal, away_team: svk, time: '2016-06-11T17:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m4 = new Match({match_number: 4, home_team: eng, away_team: rus, time: '2016-06-11T20:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m5 = new Match({match_number: 5, home_team: tur, away_team: cro, time: '2016-06-12T14:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m6 = new Match({match_number: 6, home_team: pol, away_team: nir, time: '2016-06-12T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m7 = new Match({match_number: 7, home_team: ger, away_team: ukr, time: '2016-06-12T20:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m8 = new Match({match_number: 8, home_team: esp, away_team: cze, time: '2016-06-13T14:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m9 = new Match({match_number: 9, home_team: irl, away_team: swe, time: '2016-06-13T17:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m10 = new Match({match_number: 10, home_team: bel, away_team: ita, time: '2016-06-13T20:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m11 = new Match({match_number: 11, home_team: aut, away_team: hun, time: '2016-06-14T14:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m12 = new Match({match_number: 12, home_team: por, away_team: isl, time: '2016-06-14T17:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m13 = new Match({match_number: 13, home_team: rus, away_team: svk, time: '2016-06-15T14:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m14 = new Match({match_number: 14, home_team: rou, away_team: che, time: '2016-06-15T17:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m15 = new Match({match_number: 15, home_team: fra, away_team: alb, time: '2016-06-15T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m16 = new Match({match_number: 16, home_team: eng, away_team: wal, time: '2016-06-16T14:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m17 = new Match({match_number: 17, home_team: ukr, away_team: nir, time: '2016-06-16T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m18 = new Match({match_number: 18, home_team: ger, away_team: pol, time: '2016-06-16T20:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m19 = new Match({match_number: 19, home_team: ita, away_team: swe, time: '2016-06-17T14:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m20 = new Match({match_number: 20, home_team: cze, away_team: cro, time: '2016-06-17T17:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m21 = new Match({match_number: 21, home_team: esp, away_team: tur, time: '2016-06-17T20:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m22 = new Match({match_number: 22, home_team: bel, away_team: irl, time: '2016-06-18T14:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m23 = new Match({match_number: 23, home_team: isl, away_team: hun, time: '2016-06-18T17:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m24 = new Match({match_number: 24, home_team: por, away_team: aut, time: '2016-06-18T20:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m25 = new Match({match_number: 25, home_team: rou, away_team: alb, time: '2016-06-19T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m26 = new Match({match_number: 26, home_team: che, away_team: fra, time: '2016-06-19T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m27 = new Match({match_number: 27, home_team: rus, away_team: wal, time: '2016-06-20T20:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m28 = new Match({match_number: 28, home_team: svk, away_team: eng, time: '2016-06-20T20:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m29 = new Match({match_number: 29, home_team: ukr, away_team: pol, time: '2016-06-21T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m30 = new Match({match_number: 30, home_team: nir, away_team: ger, time: '2016-06-21T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m31 = new Match({match_number: 31, home_team: cze, away_team: tur, time: '2016-06-21T20:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m32 = new Match({match_number: 32, home_team: cro, away_team: esp, time: '2016-06-21T20:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m33 = new Match({match_number: 33, home_team: isl, away_team: aut, time: '2016-06-22T17:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m34 = new Match({match_number: 34, home_team: hun, away_team: por, time: '2016-06-22T17:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m35 = new Match({match_number: 35, home_team: ita, away_team: irl, time: '2016-06-22T20:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m36 = new Match({match_number: 36, home_team: swe, away_team: bel, time: '2016-06-22T20:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});

var matches = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m30, m31, m32, m33, m34, m35, m36];

for(var i in matches) {
  matches[i].save(function (err) {
    if (err) return handleError(err);
  })
};


//Update teams with matches
for (var i in teams) {
  for (var j in matches) {
    if (teams[i]._id === matches[j].home_team) {
      teams[i].matches.push(matches[j]);
    }
    else if (teams[i]._id === matches[j].away_team) {
      teams[i].matches.push(matches[j]);
    }
  }
}
for(var i in teams) {
  teams[i].save(function (err) {
    if (err) return handleError(err);
  })
};











console.log('data created');
