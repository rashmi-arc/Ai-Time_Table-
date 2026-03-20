const express = require("express");
const router = express.Router();

const {
  generateTimetable
} = require("../controllers/timetableController");

router.post("/generate", generateTimetable);

module.exports = router;
