const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose"); // ✅ IMPORTANT

// ✅ ADD USER (ADMIN)
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role, dept_id } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      dept_id: dept_id || null // ✅ important
    });

    await user.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL USERS (WITH DEPARTMENT)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("dept_id", "dept_name")
      .select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET TEACHERS BY DEPARTMENT (FINAL CLEAN VERSION)
exports.getTeachersByDept = async (req, res) => {
  try {
    const { deptId } = req.params;

    // ✅ validate id
    if (!mongoose.Types.ObjectId.isValid(deptId)) {
      return res.status(400).json({ message: "Invalid department id" });
    }

    const teachers = await User.find({
      role: "TEACHER",
      dept_id: deptId
    }).select("_id name");

    res.json(teachers);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};