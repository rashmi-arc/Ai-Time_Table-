import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/courses";

export default function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course_code: "",
    course_name: "",
    program_id: "",
    semester_id: "",
    hours_per_week: "",
    course_type: ""
  });

  // fetch courses on load
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setCourses(res.data);
    } catch (err) {
      alert("Failed to load courses");
    }
  };

  const saveCourse = async () => {
    if (
      !form.course_code ||
      !form.course_name ||
      !form.program_id ||
      !form.semester_id ||
      !form.hours_per_week ||
      !form.course_type
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/add`, form);

      setForm({
        course_code: "",
        course_name: "",
        program_id: "",
        semester_id: "",
        hours_per_week: "",
        course_type: ""
      });

      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper">
      {/* HEADER */}
      <h2 className="page-title">Course Management</h2>
      <p className="page-desc">Create and manage courses</p>

      {/* FORM */}
      <div className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Course Code</label>
            <input
              value={form.course_code}
              onChange={(e) =>
                setForm({ ...form, course_code: e.target.value })
              }
              placeholder="e.g. CS101"
            />
          </div>

          <div className="form-group">
            <label>Course Name</label>
            <input
              value={form.course_name}
              onChange={(e) =>
                setForm({ ...form, course_name: e.target.value })
              }
              placeholder="e.g. Data Structures"
            />
          </div>

          <div className="form-group">
            <label>Program ID</label>
            <input
              value={form.program_id}
              onChange={(e) =>
                setForm({ ...form, program_id: e.target.value })
              }
              placeholder="e.g. 1"
            />
          </div>

          <div className="form-group">
            <label>Semester ID</label>
            <input
              value={form.semester_id}
              onChange={(e) =>
                setForm({ ...form, semester_id: e.target.value })
              }
              placeholder="e.g. 1"
            />
          </div>

          <div className="form-group">
            <label>Hours / Week</label>
            <input
              type="number"
              value={form.hours_per_week}
              onChange={(e) =>
                setForm({ ...form, hours_per_week: e.target.value })
              }
              placeholder="e.g. 4"
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              value={form.course_type}
              onChange={(e) =>
                setForm({ ...form, course_type: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="THEORY">THEORY</option>
              <option value="LAB">LAB</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              className="primary-btn"
              onClick={saveCourse}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Course"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h3 className="table-title">Existing Courses</h3>

        {courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Program</th>
                <th>Semester</th>
                <th>Hours</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.course_code}</td>
                  <td>{c.course_name}</td>
                  <td>{c.program_id}</td>
                  <td>{c.semester_id}</td>
                  <td>{c.hours_per_week}</td>
                  <td>{c.course_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
