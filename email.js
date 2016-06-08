var nodemailer = require("nodemailer");
var config = require('./config');

var sender = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: config.email.username,
    pass: config.email.password
  }
});

var from = 'EURO 2016 Veikkaus';

function mail(from, email, subject, message){
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: message  // html body
    };

    sender.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.error(error);
        }
        console.log('mail sent');
        sender.close(); // shut down the connection pool, no more messages
    });
}

exports.sentMailNewUserVerification = function(tournament, user, token) {
  console.log('sending mail');
  var message = "<p>You have been invited to " + tournament.name + " EURO 2016 betting by " + tournament.owner.name + ".</p>" +
    "<p>Please please click the following link to create username and password and start betting!.<br/>" +
    "<a href='" + config.server + "/newuser/" +
    token + "'>Verification Link</a></p>";
  mail(from, user.email, tournament.name, message);
}

exports.sentMailVerificationLink = function(user, token) {
  var message = "<p>Thank you for Registering on futisveikkaus2016</p>" +
    "<p>Please verify your email by clicking on the verification link below.<br/>" +
    "<a href='http://" + config.server + "/verifyemail/" +
    token + "'>Verification Link</a></p>";
  mail(from, user.email , "Account Verification", message);
}


