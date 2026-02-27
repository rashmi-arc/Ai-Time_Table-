const Semester = require("../models/Semester");

// ================= ADD SEMESTER =================
exports.addSemester = async (req, res) => {
  try {
    const { program, semester_number, start_date } = req.body;

    if (!program || !semester_number || !start_date) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check duplicate semester for same program
    const exists = await Semester.findOne({
      program,
      semester_number
    });

    if (exists) {
      return res.status(400).json({
        message: "Semester already exists for this program"
      });
    }

    const semester = new Semester({
      program,
      semester_number,
      start_date: new Date(start_date)
    });

    await semester.save();

    res.status(200).json({
      message: "Semester added successfully"
    });

  } catch (err) {
    console.error("Add Semester Error:", err);
    res.status(500).json({
      message: "Error adding semester"
    });
  }
};

// ================= GET ALL SEMESTERS =================
exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find()
      .populate("program")
      .sort({ semester_number: 1 });

    res.json(semesters);

  } catch (err) {
    console.error("Fetch Semester Error:", err);
    res.status(500).json({
      message: "Error fetching semesters"
    });
  }
};

// ================= GET BY PROGRAM =================
exports.getSemestersByProgram = async (req, res) => {
  try {
    const semesters = await Semester.find({
      program: req.params.programId
    }).sort({ semester_number: 1 });

    res.json(semesters);

  } catch (err) {
    console.error("Fetch Semester By Program Error:", err);
    res.status(500).json({
      message: "Error fetching semesters"
    });
  }
};
