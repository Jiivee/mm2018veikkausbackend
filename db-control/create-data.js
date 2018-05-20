/**
  This is only for testing purposes. Inserts ad and user collections to the db.
**/

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var async = require('async');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/fv2018', function(err, db) {
if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
  }
});

require('../models/Schemas')


var Team = mongoose.model('team');
var Group = mongoose.model('group');
var Match = mongoose.model('match');
var Player = mongoose.model('player');

//Delete previous data
Team.remove('team', function(err, result) {
  if (err) return handleError(err);
});

Group.remove('group', function(err, result) {
  if (err) return handleError(err);
});

Match.remove('match', function(err, result) {
  if (err) return handleError(err);
});

Match.remove('player', function(err, result) {
  if (err) return handleError(err);
});


var players = {
  ARG: [],
  AUS: [],
  BEL: [],
  BRA: [],
  COL: [],
  CRC: [],
  CRO: [],
  DEN: [],
  EGY: [],
  ENG: [],
  FRA: [],
  GER: [],
  ISL: [],
  IRN: [],
  JPN: [],
  KOR: [],
  MEX: [],
  MAR: [],
  NGA: [],
  PAN: [],
  PER: [],
  POL: [],
  POR: [],
  RUS: [],
  KSA: [],
  SEN: [],
  SRB: [],
  ESP: [],
  SWE: [],
  SUI: [],
  TUN: [],
  URU: [],
};

ARGplayers = [];
for (var i=0; i<players.ARG.length; i++) {
  ARGplayers.push(new Player({name: players.ARG[i]}));
}
AUSplayers = [];
for (var i=0; i<players.AUS.length; i++) {
  AUSplayers.push(new Player({name: players.AUS[i]}));
}
BELplayers = [];
for (var i=0; i<players.BEL.length; i++) {
  BELplayers.push(new Player({name: players.BEL[i]}));
}
BRAplayers = [];
for (var i=0; i<players.BRA.length; i++) {
  BRAplayers.push(new Player({name: players.BRA[i]}));
}
COLplayers = [];
for (var i=0; i<players.COL.length; i++) {
  COLplayers.push(new Player({name: players.COL[i]}));
}
CRCplayers = [];
for (var i=0; i<players.CRC.length; i++) {
  CRCplayers.push(new Player({name: players.CRC[i]}));
}
CROplayers = [];
for (var i=0; i<players.CRO.length; i++) {
  CROplayers.push(new Player({name: players.CRO[i]}));
}
DENplayers = [];
for (var i=0; i<players.DEN.length; i++) {
  DENplayers.push(new Player({name: players.DEN[i]}));
}
EGYplayers = [];
for (var i=0; i<players.EGY.length; i++) {
  EGYplayers.push(new Player({name: players.EGY[i]}));
}
ENGplayers = [];
for (var i=0; i<players.ENG.length; i++) {
  ENGplayers.push(new Player({name: players.ENG[i]}));
}
FRAplayers = [];
for (var i=0; i<players.FRA.length; i++) {
  FRAplayers.push(new Player({name: players.FRA[i]}));
}
GERplayers = [];
for (var i=0; i<players.GER.length; i++) {
  GERplayers.push(new Player({name: players.GER[i]}));
}
ISLplayers = [];
for (var i=0; i<players.ISL.length; i++) {
  ISLplayers.push(new Player({name: players.ISL[i]}));
}
IRNplayers = [];
for (var i=0; i<players.IRN.length; i++) {
  IRNplayers.push(new Player({name: players.IRN[i]}));
}
JPNplayers = [];
for (var i=0; i<players.JPN.length; i++) {
  JPNplayers.push(new Player({name: players.JPN[i]}));
}
KORplayers = [];
for (var i=0; i<players.KOR.length; i++) {
  KORplayers.push(new Player({name: players.KOR[i]}));
}
MEXplayers = [];
for (var i=0; i<players.MEX.length; i++) {
  MEXplayers.push(new Player({name: players.MEX[i]}));
}
MARplayers = [];
for (var i=0; i<players.MAR.length; i++) {
  MARplayers.push(new Player({name: players.MAR[i]}));
}
NGAplayers = [];
for (var i=0; i<players.NGA.length; i++) {
  NGAplayers.push(new Player({name: players.NGA[i]}));
}
PANplayers = [];
for (var i=0; i<players.PAN.length; i++) {
  PANplayers.push(new Player({name: players.PAN[i]}));
}
PERplayers = [];
for (var i=0; i<players.PER.length; i++) {
  PERplayers.push(new Player({name: players.PER[i]}));
}
POLplayers = [];
for (var i=0; i<players.POL.length; i++) {
  POLplayers.push(new Player({name: players.POL[i]}));
}
PORplayers = [];
for (var i=0; i<players.POR.length; i++) {
  PORplayers.push(new Player({name: players.POR[i]}));
}
RUSplayers = [];
for (var i=0; i<players.RUS.length; i++) {
  RUSplayers.push(new Player({name: players.RUS[i]}));
}
KSAplayers = [];
for (var i=0; i<players.KSA.length; i++) {
  KSAplayers.push(new Player({name: players.KSA[i]}));
}
SENplayers = [];
for (var i=0; i<players.SEN.length; i++) {
  SENplayers.push(new Player({name: players.SEN[i]}));
}
SRBplayers = [];
for (var i=0; i<players.SRB.length; i++) {
  SRBplayers.push(new Player({name: players.SRB[i]}));
}
ESPplayers = [];
for (var i=0; i<players.ESP.length; i++) {
  ESPplayers.push(new Player({name: players.ESP[i]}));
}
SWEplayers = [];
for (var i=0; i<players.SWE.length; i++) {
  SWEplayers.push(new Player({name: players.SWE[i]}));
}
SUIplayers = [];
for (var i=0; i<players.SUI.length; i++) {
  SUIplayers.push(new Player({name: players.SUI[i]}));
}
TUNplayers = [];
for (var i=0; i<players.TUN.length; i++) {
  TUNplayers.push(new Player({name: players.TUN[i]}));
}
URUplayers = [];
for (var i=0; i<players.URU.length; i++) {
  URUplayers.push(new Player({name: players.URU[i]}));
}

var allPlayers = ARGplayers.concat(AUSplayers, BELplayers, BRAplayers, COLplayers, CRCplayers, CROplayers, DENplayers, EGYplayers, ENGplayers, FRAplayers, GERplayers, ISLplayers, IRNplayers, JPNplayers, KORplayers, MEXplayers, MARplayers, NGAplayers, PANplayers, PERplayers, POLplayers, PORplayers, RUSplayers, KSAplayers, SENplayers, SRBplayers, ESPplayers, SWEplayers, SUIplayers, TUNplayers, URUplayers); 

var ARG = new Team({name: 'Argentina', short_name: 'ARG', flag: '', players: ARGplayers});
var AUS = new Team({name: 'Australia', short_name: 'AUS', flag: '', players: AUSplayers});
var BEL = new Team({name: 'Belgium', short_name: 'BEL', flag: '', players: BELplayers});
var BRA = new Team({name: 'Brazil', short_name: 'BRA', flag: '', players: BRAplayers});
var COL = new Team({name: 'Colombia', short_name: 'COL', flag: '', players: COLplayers});
var CRC = new Team({name: 'Costa Rica', short_name: 'CRC', flag: '', players: CRCplayers});
var CRO = new Team({name: 'Croatia', short_name: 'CRO', flag: '', players: CROplayers});
var DEN = new Team({name: 'Denmark', short_name: 'DEN', flag: '', players: DENplayers});
var EGY = new Team({name: 'Egypt', short_name: 'EGY', flag: '', players: EGYplayers});
var ENG = new Team({name: 'England', short_name: 'ENG', flag: '', players: ENGplayers});
var FRA = new Team({name: 'France', short_name: 'FRA', flag: '', players: FRAplayers});
var GER = new Team({name: 'Germany', short_name: 'GER', flag: '', players: GERplayers});
var ISL = new Team({name: 'Iceland', short_name: 'ISL', flag: '', players: ISLplayers});
var IRN = new Team({name: 'Iran', short_name: 'IRN', flag: '', players: IRNplayers});
var JPN = new Team({name: 'Japan', short_name: 'JPN', flag: '', players: JPNplayers});
var KOR = new Team({name: 'Korea Republic', short_name: 'KOR', flag: '', players: KORplayers});
var MEX = new Team({name: 'Mexico', short_name: 'MEX', flag: '', players: MEXplayers});
var MAR = new Team({name: 'Morocco', short_name: 'MAR', flag: '', players: MARplayers});
var NGA = new Team({name: 'Nigeria', short_name: 'NGA', flag: '', players: NGAplayers});
var PAN = new Team({name: 'Panama', short_name: 'PAN', flag: '', players: PANplayers});
var PER = new Team({name: 'Peru', short_name: 'PER', flag: '', players: PERplayers});
var POL = new Team({name: 'Poland', short_name: 'POL', flag: '', players: POLplayers});
var POR = new Team({name: 'Portugal', short_name: 'POR', flag: '', players: PORplayers});
var RUS = new Team({name: 'Russia', short_name: 'RUS', flag: '', players: RUSplayers});
var KSA = new Team({name: 'Saudi Arabia', short_name: 'KSA', flag: '', players: KSAplayers});
var SEN = new Team({name: 'Senegal', short_name: 'SEN', flag: '', players: SENplayers});
var SRB = new Team({name: 'Serbia', short_name: 'SRB', flag: '', players: SRBplayers});
var ESP = new Team({name: 'Spain', short_name: 'ESP', flag: '', players: ESPplayers});
var SWE = new Team({name: 'Sweden', short_name: 'SWE', flag: '', players: SWEplayers});
var SUI = new Team({name: 'Switzerland', short_name: 'SUI', flag: '', players: SUIplayers});
var TUN = new Team({name: 'Tunisia', short_name: 'TUN', flag: '', players: TUNplayers});
var URU = new Team({name: 'Uruguay', short_name: 'URU', flag: '', players: URUplayers});

var teams = [ARG, AUS, BEL, BRA, COL, CRC, CRO, DEN, EGY, ENG, FRA, GER, ISL, IRN, JPN, KOR, MEX, MAR, NGA, PAN, PER, POL, POR, RUS, KSA, SEN, SRB, ESP, SWE, SUI, TUN, URU];

var group_a = new Group({name: 'A', teams: [RUS, KSA, EGY, URU]});
var group_b = new Group({name: 'B', teams: [POR, ESP, MAR, IRN]});
var group_c = new Group({name: 'C', teams: [FRA, AUS, PER, DEN]});
var group_d = new Group({name: 'D', teams: [ARG, ISL, CRO, NGA]});
var group_e = new Group({name: 'E', teams: [BRA, SUI, CRC, SRB]});
var group_f = new Group({name: 'F', teams: [GER, MEX, SWE, KOR]});
var group_g = new Group({name: 'G', teams: [BEL, PAN, TUN, ENG]});
var group_h = new Group({name: 'H', teams: [POL, SEN, COL, JPN]});

var groups = [group_a, group_b, group_c, group_d, group_e, group_f, group_g, group_h];

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

var m1 = new Match({match_number: 1, home_team: RUS, away_team: KSA, time: '2018-06-14T15:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m2 = new Match({match_number: 2, home_team: EGY, away_team: URU, time: '2018-06-15T12:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m3 = new Match({match_number: 3, home_team: MAR, away_team: IRN, time: '2018-06-15T15:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m4 = new Match({match_number: 4, home_team: POR, away_team: ESP, time: '2018-06-15T18:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m5 = new Match({match_number: 5, home_team: FRA, away_team: AUS, time: '2018-06-16T10:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m6 = new Match({match_number: 6, home_team: ARG, away_team: ISL, time: '2018-06-16T13:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m7 = new Match({match_number: 7, home_team: PER, away_team: DEN, time: '2018-06-16T16:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m8 = new Match({match_number: 8, home_team: CRO, away_team: NGA, time: '2018-06-16T19:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m9 = new Match({match_number: 9, home_team: CRC, away_team: SRB, time: '2018-06-17T12:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m10 = new Match({match_number: 10, home_team: GER, away_team: MEX, time: '2018-06-17T15:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m11 = new Match({match_number: 11, home_team: BRA, away_team: SUI, time: '2018-06-17T18:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m12 = new Match({match_number: 12, home_team: SWE, away_team: KOR, time: '2018-06-18T12:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m13 = new Match({match_number: 13, home_team: BEL, away_team: PAN, time: '2018-06-18T15:00:00.000Z', group: group_g, score: {home: null, away: null}, mark: null});
var m14 = new Match({match_number: 14, home_team: TUN, away_team: ENG, time: '2018-06-18T18:00:00.000Z', group: group_g, score: {home: null, away: null}, mark: null});
var m15 = new Match({match_number: 15, home_team: COL, away_team: JPN, time: '2018-06-19T12:00:00.000Z', group: group_h, score: {home: null, away: null}, mark: null});
var m16 = new Match({match_number: 16, home_team: POL, away_team: SEN, time: '2018-06-19T15:00:00.000Z', group: group_h, score: {home: null, away: null}, mark: null});
var m17 = new Match({match_number: 17, home_team: RUS, away_team: EGY, time: '2018-06-19T18:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m18 = new Match({match_number: 18, home_team: POR, away_team: MAR, time: '2018-06-20T12:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m19 = new Match({match_number: 19, home_team: URU, away_team: KSA, time: '2018-06-20T15:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m20 = new Match({match_number: 20, home_team: IRN, away_team: ESP, time: '2018-06-20T18:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m21 = new Match({match_number: 21, home_team: DEN, away_team: AUS, time: '2018-06-21T12:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m22 = new Match({match_number: 22, home_team: FRA, away_team: PER, time: '2018-06-21T15:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m23 = new Match({match_number: 23, home_team: ARG, away_team: CRO, time: '2018-06-21T18:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m24 = new Match({match_number: 24, home_team: BRA, away_team: CRC, time: '2018-06-22T12:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m25 = new Match({match_number: 25, home_team: NGA, away_team: ISL, time: '2018-06-22T15:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m26 = new Match({match_number: 26, home_team: SRB, away_team: SUI, time: '2018-06-22T18:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m27 = new Match({match_number: 27, home_team: BEL, away_team: TUN, time: '2018-06-23T12:00:00.000Z', group: group_g, score: {home: null, away: null}, mark: null});
var m28 = new Match({match_number: 28, home_team: KOR, away_team: MEX, time: '2018-06-23T15:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m29 = new Match({match_number: 29, home_team: GER, away_team: SWE, time: '2018-06-23T18:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m30 = new Match({match_number: 30, home_team: ENG, away_team: PAN, time: '2018-06-24T12:00:00.000Z', group: group_g, score: {home: null, away: null}, mark: null});
var m31 = new Match({match_number: 31, home_team: JPN, away_team: SEN, time: '2018-06-24T15:00:00.000Z', group: group_h, score: {home: null, away: null}, mark: null});
var m32 = new Match({match_number: 32, home_team: POL, away_team: COL, time: '2018-06-24T18:00:00.000Z', group: group_h, score: {home: null, away: null}, mark: null});
var m33 = new Match({match_number: 33, home_team: KSA, away_team: EGY, time: '2018-06-25T14:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m34 = new Match({match_number: 34, home_team: URU, away_team: RUS, time: '2018-06-25T14:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m35 = new Match({match_number: 35, home_team: ESP, away_team: MAR, time: '2018-06-25T18:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m36 = new Match({match_number: 36, home_team: IRN, away_team: POR, time: '2018-06-25T18:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m37 = new Match({match_number: 37, home_team: DEN, away_team: FRA, time: '2018-06-26T14:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m38 = new Match({match_number: 38, home_team: AUS, away_team: PER, time: '2018-06-26T14:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m39 = new Match({match_number: 39, home_team: NGA, away_team: ARG, time: '2018-06-26T18:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m40 = new Match({match_number: 40, home_team: ISL, away_team: CRO, time: '2018-06-26T18:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m41 = new Match({match_number: 41, home_team: MEX, away_team: SWE, time: '2018-06-27T12:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m42 = new Match({match_number: 42, home_team: KOR, away_team: GER, time: '2018-06-27T14:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m43 = new Match({match_number: 43, home_team: SUI, away_team: CRC, time: '2018-06-27T18:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m44 = new Match({match_number: 44, home_team: SRB, away_team: BRA, time: '2018-06-27T18:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m45 = new Match({match_number: 45, home_team: JPN, away_team: POL, time: '2018-06-28T14:00:00.000Z', group: group_h, score: {home: null, away: null}, mark: null});
var m46 = new Match({match_number: 46, home_team: SEN, away_team: COL, time: '2018-06-28T14:00:00.000Z', group: group_h, score: {home: null, away: null}, mark: null});
var m47 = new Match({match_number: 47, home_team: PAN, away_team: TUN, time: '2018-06-28T17:00:00.000Z', group: group_g, score: {home: null, away: null}, mark: null});
var m48 = new Match({match_number: 48, home_team: ENG, away_team: BEL, time: '2018-06-28T18:00:00.000Z', group: group_g, score: {home: null, away: null}, mark: null});

var matches = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m30, m31, m32, m33, m34, m35, m36, m37, m38, m39, m40, m41, m42, m43, m44, m45, m46, m47, m48]

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

//Create data
var promise = Player.create(allPlayers);
promise.then(function () {
  var promise1 = Team.create(teams);
  promise1.then(function () {
    var promise2 = Group.create(groups);
    promise2.then(function () {
        Match.create(matches);
        console.log('data created2');
    })
  })
})

console.log('data created');
