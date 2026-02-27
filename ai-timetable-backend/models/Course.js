const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_code: {
    type: String,
    required: true,
    trim: true
  },
  course_name: {
    type: String,
    required: true,
    trim: true
  },
  program_id: {
    type: String,
    required: true,
    trim: true
  },
  semester_id: {
    type: String,
    required: true,
    trim: true
  },
  hours_per_week: {
    type: Number,
    required: true
  },
  course_type: {
    type: String,
    enum: ["THEORY", "LAB"],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Course", courseSchema);
