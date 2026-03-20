const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  program_id: String,
  batch_year: String,
  day: String,
  slot: String,
  course: String,
  room: String,
  user_id: String
},{timestamps:true});

module.exports = mongoose.model("ClassTimetable", schema, "class_timetable");
