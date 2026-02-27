const User = require("../models/User");

exports.getTeachersByDept = async (req, res) => {
  try {
    const { deptId } = req.params;

    const teachers = await User.find({
      role: "TEACHER",
      dept_id: deptId,
      is_active: true
    });

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Failed to load teachers" });
  }
};
