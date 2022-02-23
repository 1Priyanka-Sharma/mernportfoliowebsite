require('dotenv').config()
const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose.connect(db, {
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
  try {
    const { name, email, message } = req.body;
    const newMSG = new MSGModel({
      name, email, message
    });

    await newMSG.save();
    res.render("index", { content: 'Thank You. Your response is recorded.' });
  }
  catch (error) {
    console.log("Error" + error.message);
  }
});

app.listen(process.env.PORT || 3000);
module.exports = app;