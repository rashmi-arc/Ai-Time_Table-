const Constraint = require("../models/Constraint");

exports.addConstraints = async (req, res) => {
  try {
    // req.body = ARRAY
    await Constraint.insertMany(req.body);
    res.json({ message: "Constraints saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getConstraints = async (req, res) => {
  try {
    const data = await Constraint.find()
      .populate("dept_id", "dept_name")
      .populate("program_id", "program_name")
      .populate("constraint_id", "constraint_name");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
