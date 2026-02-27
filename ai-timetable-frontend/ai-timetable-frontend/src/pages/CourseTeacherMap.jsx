import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import {
  addMapping,
  getMappings
} from "../services/courseTeacherService";

export default function CourseTeacherMapping() {
  const [courses, setCourses] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course_id: "",
    user_id: "",
    batch_year: ""
  });

  useEffect(() => {
    fetchCourses();
    fetchMappings();
  }, []);

  const fetchCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  const fetchMappings = async () => {
    const res = await getMappings();
    setMappings(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.course_id || !form.user_id || !form.batch_year) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await addMapping(form);
      alert("Course mapped successfully");

      setForm({
        course_id: "",
        user_id: "",
        batch_year: ""
      });

      fetchMappings();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper">
      {/* HEADER */}
      <h2 className="page-title">Course Mapping</h2>
      <p className="page-desc">Assign courses to teachers</p>

      {/* FORM */}
      <div className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Course</label>
            <select
              name="course_id"
              value={form.course_id}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.course_code} - {c.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Teacher ID</label>
            <input
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              placeholder="e.g. T101"
            />
          </div>

          <div className="form-group">
            <label>Batch Year</label>
            <input
              name="batch_year"
              value={form.batch_year}
              onChange={handleChange}
              placeholder="e.g. 2024"
            />
          </div>

          <div className="form-actions">
            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Mapping"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h3 className="table-title">Course – Teacher Mappings</h3>

        {mappings.length === 0 ? (
          <p>No mappings found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Teacher ID</th>
                <th>Batch Year</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((m, i) => (
                <tr key={m._id}>
                  <td>{i + 1}</td>
                  <td>
                    {m.course_id?.course_code} –{" "}
                    {m.course_id?.course_name}
                  </td>
                  <td>{m.user_id}</td>
                  <td>{m.batch_year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
