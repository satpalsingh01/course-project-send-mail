const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
var nodemailer = require('nodemailer');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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
