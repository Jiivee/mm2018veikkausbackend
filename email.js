var nodemailer = require("nodemailer");
var config = require('./config');

var sender = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: config.email.username,
    pass: config.email.password
  }
});

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

exports.sentMailVerificationLink = function(user, token) {
  var from = "futisveikkaus2016";
  var message = "<p>Thank you for Registering on futisveikkaus2016</p>" +
    "<p>Please verify your email by clicking on the verification link below.<br/>" +
    "<a href='http://" + config.server + "/verifyemail/" +
    token + "'>Verification Link</a></p>";
  mail(from, user.email , "Account Verification", message);
}
