const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
var nodemailer = require('nodemailer');

// Use Routes
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: false })) 


app.get('/send-verify-email/:email/:user_name', function(req, res){
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'arcskill01@gmail.com',
      pass: 'arcskill@123'
    }
  });

  var mailOptions = {
    from: 'arcskill01@gmail.com',
    to: req.params.email,
    subject: 'Arcskill account verification',
    html: '<p>Dear '+req.params.user_name+',</p><p>Please verify your Arcskill account by clicking on below link</p><p><a href="https://www.arcskill.com/back_end/verify_user_email.php?email='+req.params.email+'">Verfiy your email</a></p><p>Thanks and Regrads<br> Arcskill Team</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error -'+error)
    } else {
      res.send('success')
    }
  });
});


app.get('/forgotten-password/:email/:user_name/:password', function(req, res){
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'arcskill01@gmail.com',
      pass: 'arcskill@123'
    }
  });

  var mailOptions = {
    from: 'bavnsofts@gmail.com',
    to: req.params.email,
    subject: 'Arcskill account details',
    html: '<p>Dear '+req.params.user_name+',</p><p>Your arcskill account details are given as below:</p><p>Email: '+req.params.email+'</p><p>Password: '+req.params.password+'</p><p><a href="https://www.arcskill.com/login.php">Login Now</a></p><p>Thanks and Regrads<br> Arcskill Team</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error -'+error)
    } else {
      res.send('success')
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
