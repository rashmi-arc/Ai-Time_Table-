const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["ADMIN", "HOD", "TEACHER", "STUDENT"]
  },

  dept_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // 🔥 IMPORTANT
    required: false
  },

  is_active: {
    type: Boolean,
    default: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);