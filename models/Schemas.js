var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  match_bets: [{ type: Schema.Types.ObjectId, ref: 'MatchBet' }]
});

var teamSchema = new Schema({
  name: String,
  short_name: String,
  group: String,
});

var groupSchema = new Schema({
	name: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

var matchSchema = new Schema({
  home_team: { type: Schema.Types.ObjectId, ref: 'Team' },
  away_team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: {
    home: Number,
    away: Number
  },
  time: Date,
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  mark: String
});

var matchbetSchema = new Schema({
  match_id: String,
  match: { type: Schema.Types.ObjectId, ref: 'Match' },
  score_bet: {
    home: Number,
    away: Number
  },
  mark_bet: String
});

var MatchBet = mongoose.model('matchbet', matchbetSchema);
var User = mongoose.model('user', userSchema);
var Team = mongoose.model('team', teamSchema);
var Match = mongoose.model('match', matchSchema);
var Group = mongoose.model('group', groupSchema);
