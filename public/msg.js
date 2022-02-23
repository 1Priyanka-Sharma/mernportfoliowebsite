const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  name: String,
  email: String,
  message: String
});
const Msg = mongoose.model("portfolioContactData", MsgSchema);

module.exports = Msg;