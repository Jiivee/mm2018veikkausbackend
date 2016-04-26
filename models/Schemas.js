var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, unique: true},
  password: String,
  email: { type: String, unique: true},
  isVerified: { type: Boolean, dafault: false},
  tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }]
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
  match: { type: Schema.Types.ObjectId, ref: 'Match' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  score: {
    home: Number,
    away: Number
  },
  mark: String
});

var tournamentSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  game_modes: {
    goals: Boolean,
    mark: Boolean,
    eighth_finals: Boolean,
    quarter_finals: Boolean,
    semi_finals: Boolean,
    finals: Boolean,
    winner: Boolean
  },
  points: {
    goals: Number,
    mark: Number,
    extra: Number,
    eighth_finals: Number,
    quarter_finals: Number,
    semi_finals: Number,
    finals: Number,
    winner: Number
  }
});

mongoose.model('matchbet', matchbetSchema);
mongoose.model('user', userSchema);
mongoose.model('team', teamSchema);
mongoose.model('match', matchSchema);
mongoose.model('group', groupSchema);
mongoose.model('tournament', tournamentSchema);
