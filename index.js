const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://test:hellotaejim@cluster0.k4syx.mongodb.net/portfolioWebsiteDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

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

app.post("/msg", async function (req, res) {
  const { name, email, message } = req.body;
  console.log(name + ' , ' + email + ' , ' + message);
  const newMSG = new MSGModel({
    name,email,message
  });

  await newMSG.save();
});

app.listen(process.env.PORT || 3000);
module.exports = app;