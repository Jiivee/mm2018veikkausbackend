/**
  This is only for testing purposes. Inserts ad and user collections to the db.
**/

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var fs = require('fs');

mongoose.connect('mongodb://localhost/fv', function(err, db) {
if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
  }
});

//mongoose.connect('mongodb://heroku_n8tthvx3:gg52807ergarga789k8f20jmp1@ds033285.mongolab.com:33285/heroku_n8tthvx3');

//load all files in models dir
fs.readdirSync('C:/Users/Jiiiveee/Documents/futisveikkaus/fvbackend/models/').forEach(function(filename){
  if(~filename.indexOf('.js')) {
    require('C:/Users/Jiiiveee/Documents/futisveikkaus/fvbackend/models/' + filename)
  }
})

console.log(process.argv.slice(2));

//Greate Teams
var Tournament = mongoose.model('tournament');
var User = mongoose.model('user');

if (process.argv.slice(2)[0] == 'tournament') {
  Tournament.remove('tournament', function(err, result) {
    if (err) return err;
  });
}

if (process.argv.slice(2)[0] == 'user') {
  User.remove('user', function(err, result) {
    if (err) return err;
  });
}

mongoose.connection.close()
