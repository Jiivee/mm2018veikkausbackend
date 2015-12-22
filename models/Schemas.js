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
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  flag: String
});

var groupSchema = new Schema({
	name: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

var matchSchema = new Schema({
  match_number: Number,
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

var tournamentSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  game_modes: {
    '1x2': Boolean,
    mark: Boolean,
    eighth_finals: Boolean,
    quater_finals: Boolean,
    semi_finals: Boolean,
    finals: Boolean,
    winner: Boolean
  }
});

mongoose.model('matchbet', matchbetSchema);
mongoose.model('user', userSchema);
var Team = mongoose.model('team', teamSchema);
mongoose.model('match', matchSchema);
mongoose.model('group', groupSchema);
