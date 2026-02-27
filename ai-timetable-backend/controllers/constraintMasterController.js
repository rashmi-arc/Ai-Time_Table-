const ConstraintMaster = require("../models/ConstraintMaster");

exports.getConstraintMaster = async (req, res) => {
  try {
    const data = await ConstraintMaster.find().sort({ constraint_category: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
