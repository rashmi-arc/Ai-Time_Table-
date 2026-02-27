const express = require("express");
const router = express.Router();

// ✅ destructuring names MUST match controller exports
const {
  addMapping,
  getMappings
} = require("../controllers/courseTeacherMapController");

// ❌ if addMapping is undefined → crash
router.post("/add", addMapping);
router.get("/", getMappings);

module.exports = router;
