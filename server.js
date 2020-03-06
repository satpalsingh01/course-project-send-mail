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
  console.log(req.params,' params')

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sumitchoudhary727@gmail.com',
      pass: 'sumit1994'
    }
  });

  var mailOptions = {
    from: 'bavnsofts@gmail.com',
    to: 'satpals.bavnsofts@gmail.com',
    subject: 'Arcskill account verification',
    html: '<p>Dear '+req.params.user_name+',</p><p>Please verify your Arcskill account by clicking on below link</p><p><a href="https://www.arcskill.com/back_end/verify_user_email.php?email='+req.params.email+'">Verfiy your email</a></p><p>Thanks and Regrads<br> Arcskill Team</p>'
  };

  console.log(mailOptions,' ----------------------------------------------------------------------------------------------------mailOptions')

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
