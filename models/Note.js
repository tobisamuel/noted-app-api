const cuid = require("cuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  _id: { type: String, default: cuid },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
