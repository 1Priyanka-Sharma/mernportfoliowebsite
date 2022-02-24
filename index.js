require('dotenv').config()
const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const nodemailer = require('nodemailer');
require('./mconnection.js');
const MSGModel = require("./public/msg");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// public static path-template engine
const static_path = path.join(__dirname + '/public');
app.use(express.static(static_path));
app.set('view engine', 'hbs');

// Routing
app.get('', (req, res) => {
  res.render("index");
})

// POST Request
app.post("/msg", async function (req, res) {
  try {
    const { name, email, message } = req.body;
    const newMSG = new MSGModel({
      name, email, message
    });
    await newMSG.save();

    res.render("index", { content: 'Thank You. Your response is recorded.' });
    sendEmail(name, email, message);
  }
  catch (error) {
    console.log("Error" + error.message);
  }
});

function sendEmail(name, email, message) {

  let receiverEmail = process.env.EMAIL_ID;
  let password = process.env.PASSWORD;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: receiverEmail,
      pass: password
    }
  });

  let mainContent = 'Name: ' + name + '\n' + 'Email Id: ' + email + '\n' + 'Message: ' + message;

  let mailOptions = {
    from: receiverEmail,
    to: receiverEmail,
    subject: 'Email From Portfolio website',
    text: mainContent
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      console.log(error);
    else
      console.log('Email sent: ' + info.response);
  });
}

app.listen(process.env.PORT || 3000);
module.exports = app;