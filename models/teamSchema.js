var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var teamSchema = new Schema({
	name: String,
  short_name: String,
  group: String,
});

mongoose.model('team', teamSchema);
