import { useEffect, useState } from "react";
import axios from "axios";

function ClassTimetable() {

  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const [programId, setProgramId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [batchYear, setBatchYear] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPrograms();
    loadSemesters();
  }, []);

  const loadPrograms = async () => {
    const res = await axios.get("http://localhost:5000/api/programs");
    setPrograms(res.data);
  };

  const loadSemesters = async () => {
    const res = await axios.get("http://localhost:5000/api/semesters/all");
    setSemesters(res.data);
  };

  const generateTimetable = async () => {
    if (!programId || !semesterId || !batchYear) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/class-timetable/generate",
        { programId, semesterId, batchYear }
      );

      setTimetable(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  // SORT PERIODS CORRECTLY (Period 1, Period 2...)
  const uniqueSlots = [...new Set(timetable.map(t => t.slot))]
    .filter(Boolean)
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, "")) || 0;
      const numB = parseInt(b.replace(/\D/g, "")) || 0;
      return numA - numB;
    });

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

  // Styles
  const thStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    background: "#2f3e9e",
    color: "white"
  };

  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    verticalAlign: "top"
  };

  const dayStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    fontWeight: "600",
    background: "#f5f5f5"
  };

  return (
    <>
      {/* FORM CARD */}
      <div className="form-card">
        <h2 className="page-title">Generate Class Timetable</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Program</label>
            <select
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
            >
              <option value="">Select Program</option>
              {programs.map(p => (
                <option key={p._id} value={p._id}>
                  {p.program_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
            >
              <option value="">Select Semester</option>
              {semesters.map(s => (
                <option key={s._id} value={s._id}>
                  Semester {s.semester_number}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Batch Year</label>
            <input
              type="number"
              value={batchYear}
              onChange={(e) => setBatchYear(e.target.value)}
              placeholder="e.g. 2024"
            />
          </div>

          <div className="form-actions">
            <button
              className="primary-btn"
              onClick={generateTimetable}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Timetable"}
            </button>
          </div>

        </div>
      </div>

      {/* TABLE CARD */}
      {timetable.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ marginBottom: "20px" }}>Generated Timetable</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white"
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Day</th>
                {uniqueSlots.map((slot) => (
                  <th key={slot} style={thStyle}>
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td style={dayStyle}>{day}</td>

                  {uniqueSlots.map((slot) => {
                    const cell = timetable.find(
                      (t) => t.day === day && t.slot === slot
                    );

                    return (
                      <td key={slot} style={tdStyle}>
                        {cell && (
                          <>
                            <div style={{ fontWeight: "600" }}>
                              {cell.course}
                            </div>
                            <div style={{ fontSize: "12px", color: "#555" }}>
                              {cell.room}
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </>
  );
}

export default ClassTimetable;
