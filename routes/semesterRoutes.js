const express = require("express");
const router = express.Router();

const {
  addSemester,
  getAllSemesters,
  getSemestersByProgram
} = require("../controllers/semesterController");

// Add semester
router.post("/add", addSemester);

// Get all semesters (populate program)
router.get("/all", getAllSemesters);

// Get semesters by program
router.get("/:programId", getSemestersByProgram);

module.exports = router;
