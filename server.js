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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: false })) 

app.post('/send-verify-email', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bavnsofts@gmail.com',
      pass: 'jagjit@123'
    }
  });

  var mailOptions = {
    from: 'bavnsofts@gmail.com',
    to: req.body.email,
    subject: 'Arcskill account verification',
    html: '<p>Dear '+req.body.user_name+',</p><p>Please verify your Arcskill account by clicking on below link</p><p><a href="https://www.arcskill.com/back_end/verify_user_email.php?email='+req.body.email+'">Verfiy your email</a></p><p>Thanks and Regrads<br> Arcskill Team</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.send('success')
    }
  });


});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
