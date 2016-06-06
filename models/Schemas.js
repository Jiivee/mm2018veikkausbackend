var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true},
  isVerified: { type: Boolean, default: false},
  tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }]
});

var teamSchema = new Schema({
  name: String,
  short_name: String,
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  flag: String
});

var playerSchema = new Schema({
  name: String
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

var playoffSchema = new Schema({
  round_of: Number,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
});

var topscorerSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  goals: Number
});

var matchbetSchema = new Schema({
  match: { type: Schema.Types.ObjectId, ref: 'Match' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  score: {
    home: Number,
    away: Number
  },
  mark: String,
  points: { type: Number, default: 0 }
});

var playoffbetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  round_of: Number,
  points: { type: Number, default: 0 },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
});

var topscorerbetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  player_team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  goals: Number
});

var pointsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  match_points: { type: Number, default: 0 },
  playoff_points: { type: Number, default: 0 },
  topscorer_points: { type: Number, default: 0 },
  total_points: { type: Number, default: 0 }
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
mongoose.model('playoffbet', playoffbetSchema);
mongoose.model('topscorerbet', topscorerbetSchema);
mongoose.model('topscorer', topscorerSchema);
mongoose.model('playoff', playoffSchema);
mongoose.model('user', userSchema);
mongoose.model('team', teamSchema);
mongoose.model('player', playerSchema);
mongoose.model('match', matchSchema);
mongoose.model('group', groupSchema);
mongoose.model('points', pointsSchema);
mongoose.model('tournament', tournamentSchema);
