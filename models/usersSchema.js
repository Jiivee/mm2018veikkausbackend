//Gather users collection from the db.

var mongoose = require('mongoose');
var Schema 	= mongoose.Schema;

var usersSchema = new Schema({
	name: String,
	email: String,
});

mongoose.model('users', usersSchema);
