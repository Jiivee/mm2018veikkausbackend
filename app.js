var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config');

var cors = require('cors');

/*
mongoose.connect('mongodb://localhost/fv', function(err, db) {
if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
  }
});
*/
mongoose.connect('mongodb://heroku_n8tthvx3:gg52807ergarga789k8f20jmp1@ds033285.mongolab.com:33285/heroku_n8tthvx3');

//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js')) {
    require(__dirname + '/models/' + filename)
  }
})

//var routes = require('./routes/index');
var users = require('./routes/users');
var matches = require('./routes/matches');
var teams = require('./routes/teams');
var groups = require('./routes/groups');
var playoffs = require('./routes/playoffs');
var tournaments = require('./routes/tournaments');
var matchbets = require('./routes/matchbets');
var playoffbets = require('./routes/playoffbets');
var topscorerbets = require('./routes/topscorerbets');
var points = require('./routes/points');
var authenticate = require('./routes/authenticate');
var register = require('./routes/register');
var newuser = require('./routes/newuser');
var verifyemail = require('./routes/verifyemail');
var saveresults = require('./routes/saveresults');

var app = express();

//CORS ENABLED TO EVERYTHING!!!!
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', users);
app.use('/matches', matches);
app.use('/teams', teams);
app.use('/groups', groups);
app.use('/playoffs', playoffs);
app.use('/tournaments', tournaments);
app.use('/matchbets', matchbets);
app.use('/playoffbets', playoffbets);
app.use('/topscorerbets', topscorerbets);
app.use('/authenticate', authenticate);
app.use('/points', points);
app.use('/register', register);
app.use('/newuser', newuser);
app.use('/verifyemail', verifyemail);
app.use('/saveresults', saveresults);






port = process.env.PORT || 3002;
app.listen(port, function() {
  console.log("Listening on port number: ", port);
});


module.exports = app;
