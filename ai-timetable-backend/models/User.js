const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: {
    type: String,
    enum: ["ADMIN", "HOD", "TEACHER"]
  },
  dept_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
