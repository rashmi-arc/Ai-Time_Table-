import { useEffect, useState } from "react";
import axios from "axios";

export default function Semesters() {
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [form, setForm] = useState({
    program: "",
    semester_number: "",
    start_date: ""
  });

  // ================= LOAD DATA ON PAGE LOAD =================
  useEffect(() => {
    loadPrograms();
    loadSemesters();
  }, []);

  const loadPrograms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error("Program load error:", err);
    }
  };

  const loadSemesters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/semesters/all");
      setSemesters(res.data);
    } catch (err) {
      console.error("Semester load error:", err);
    }
  };

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= SAVE SEMESTER =================
  const saveSemester = async () => {
    if (!form.program || !form.semester_number || !form.start_date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/semesters/add",
        form
      );

      alert(res.data.message);

      // Reset form
      setForm({
        program: "",
        semester_number: "",
        start_date: ""
      });

      // Reload semesters
      loadSemesters();

    } catch (err) {
      console.log("Error:", err.response?.data);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <h2 className="page-title">Semester Management</h2>
      <p className="page-desc">Add semesters for academic programs</p>

      {/* ================= FORM ================= */}
      <div className="form-card">
        <div className="form-grid">

          {/* Program Dropdown */}
          <div className="form-group">
            <label>Program</label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
            >
              <option value="">Select Program</option>
              {programs.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.program_name}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Number */}
          <div className="form-group">
            <label>Semester Number</label>
            <select
              name="semester_number"
              value={form.semester_number}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {[1,2,3,4,5,6,7,8].map((n) => (
                <option key={n} value={n}>
                  Semester {n}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
          </div>

          {/* Save Button */}
          <div className="form-actions">
            <button
              className="primary-btn"
              onClick={saveSemester}
            >
              Save Semester
            </button>
          </div>

        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-card">
        <h3 className="table-title">Existing Semesters</h3>

        {semesters.length === 0 ? (
          <p>No semesters found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Program</th>
                <th>Semester</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {semesters.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.program?.program_name}</td>
                  <td>Semester {s.semester_number}</td>
                  <td>
                    {new Date(s.start_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
