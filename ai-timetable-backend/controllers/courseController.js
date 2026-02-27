const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  try {
    let {
      course_code,
      course_name,
      program_id,
      semester_id,
      hours_per_week,
      course_type
    } = req.body;

    // clean inputs
    course_code = course_code.trim().toUpperCase();
    course_name = course_name.trim();
    program_id = program_id.trim();
    semester_id = semester_id.trim();

    // duplicate check:
    // same course code in same program + semester
    const existingCourse = await Course.findOne({
      course_code,
      program_id,
      semester_id
    });

    if (existingCourse) {
      return res.status(400).json({
        message: "Course already exists for this program & semester"
      });
    }

    const course = new Course({
      course_code,
      course_name,
      program_id,
      semester_id,
      hours_per_week,
      course_type
    });

    await course.save();

    res.status(201).json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find().sort({ created_at: -1 });
  res.json(courses);
};
