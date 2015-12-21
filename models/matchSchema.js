var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var matchSchema = new Schema({
	home_team: String,
  away_team: String,
  score: {
    home: Number,
    away: Number
  },
  time: Date,
  group: String,
  mark: String
});

mongoose.model('match', matchSchema);
