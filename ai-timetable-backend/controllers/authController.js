const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email, is_active: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      userId: user._id,
      name: user.name,
      role: user.role,
      dept_id: user.dept_id || null
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
