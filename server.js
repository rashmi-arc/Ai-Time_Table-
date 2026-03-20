const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.PORT);

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/course-teacher", require("./routes/courseTeacherMapRoutes"));
app.use("/api/programs", require("./routes/programRoutes"));

app.use("/api/departments", require("./routes/departmentRoutes"));


app.use("/api/pdm", require("./routes/pdmRoutes"));
app.use("/api/semesters", require("./routes/semesterRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/dept-slots", require("./routes/deptTimeSlotRoutes"));
app.use("/api/constraint-master", require("./routes/constraintMasterRoutes"));
app.use("/api/constraints", require("./routes/constraintRoutes"));

app.use("/api/class-timetable", require("./routes/timetableRoutes"));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/ai_timetable")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("AI Timetable Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
