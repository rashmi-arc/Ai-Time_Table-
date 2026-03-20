import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import {
  addMapping,
  getMappings
} from "../services/courseTeacherService";

export default function CourseTeacherMapping() {
  const [courses, setCourses] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course_id: "",
    user_id: "",
    batch_year: "",
    dept_id: ""
  });

  useEffect(() => {
    fetchCourses();
    fetchMappings();
    fetchDepartments();
  }, []);

  // ✅ courses
  const fetchCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  // ✅ mappings
  const fetchMappings = async () => {
    const res = await getMappings();
    setMappings(res.data);
  };

  // ✅ departments
  const fetchDepartments = async () => {
    const res = await fetch("http://localhost:5000/api/departments");
    const data = await res.json();
    setDepartments(data);
  };

  // ✅ teachers by department
  const loadTeachers = async (deptId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/users/teachers/${deptId}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const data = await res.json();
    setTeachers(data);
  };

  // ✅ input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ department change
  const handleDeptChange = (e) => {
    const deptId = e.target.value;

    setForm({ ...form, dept_id: deptId, user_id: "" });

    loadTeachers(deptId); // 🔥 load teachers
  };

  // ✅ submit
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
        batch_year: "",
        dept_id: ""
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

          {/* Department */}
          <div className="form-group">
            <label>Department</label>
            <select value={form.dept_id} onChange={handleDeptChange}>
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.dept_name}
                </option>
              ))}
            </select>
          </div>

          {/* Course */}
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

          {/* Teacher */}
          <div className="form-group">
            <label>Teacher</label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Batch */}
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
                <th>Teacher</th>
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

                  <td>{m.user_id?.name}</td> {/* 🔥 FIX */}

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