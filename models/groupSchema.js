var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var groupSchema = new Schema({
	name: String,
  teams: [String],
});

mongoose.model('group', groupSchema);
