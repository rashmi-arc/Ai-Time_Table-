const CourseTeacherMap = require("../models/CourseTeacherMap");

// ✅ named export: addMapping
exports.addMapping = async (req, res) => {
  try {
    const mapping = new CourseTeacherMap(req.body);
    await mapping.save();
    res.status(201).json({ message: "Mapping saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ named export: getMappings
exports.getMappings = async (req, res) => {
  try {
    const data = await CourseTeacherMap.find().populate("course_id");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
