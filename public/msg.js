const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  text: String,
});
const Msg = mongoose.model("msg", MsgSchema);

module.exports = Msg;