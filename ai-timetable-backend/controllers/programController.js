const Program = require("../models/Program");

const addProgram = async (req, res) => {
  try {
    const { program_name, start_year, intake, total_semesters } = req.body;

    if (!program_name || !start_year || !intake || !total_semesters) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Program.findOne({ program_name, start_year });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Program already exists" });
    }

    await Program.create({
      program_name,
      start_year,
      intake,
      total_semesters,
    });

    res.json({ message: "Program added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPrograms = async (req, res) => {
  const programs = await Program.find().sort({ createdAt: -1 });
  res.json(programs);
};

module.exports = {
  addProgram,
  getPrograms,
};
