import { useEffect, useState } from "react";
import axios from "axios";

export default function AddProgram() {
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState({
    program_name: "",
    start_year: "",
    intake: "",
    total_semesters: ""
  });

  // LOAD PROGRAMS
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error("Failed to load programs");
    }
  };

  // SAVE PROGRAM
  const saveProgram = async () => {
    if (Object.values(form).some(v => v === "")) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/programs/add", {
        program_name: form.program_name.trim(),
        start_year: Number(form.start_year),
        intake: Number(form.intake),
        total_semesters: Number(form.total_semesters)
      });

      setForm({
        program_name: "",
        start_year: "",
        intake: "",
        total_semesters: ""
      });

      fetchPrograms();
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      {/* FORM CARD */}
      <div className="content">
  <div className="content-wrapper">

    {/* FORM CARD */}
   
      <h2 className="page-title">Program Management</h2>
      <p className="page-desc">Create and manage academic programs</p>
      <div className="form-card">

      <div className="form-grid">
        <div className="form-group">
          <label>Program Name</label>
          <input
            value={form.program_name}
            onChange={e =>
              setForm({ ...form, program_name: e.target.value })
            }
            placeholder="e.g. MCA"
          />
        </div>

        <div className="form-group">
          <label>Start Year</label>
          <input
            type="number"
            value={form.start_year}
            onChange={e =>
              setForm({ ...form, start_year: e.target.value })
            }
            placeholder="e.g. 2024"
          />
        </div>

        <div className="form-group">
          <label>Intake</label>
          <input
            type="number"
            value={form.intake}
            onChange={e =>
              setForm({ ...form, intake: e.target.value })
            }
            placeholder="e.g. 60"
          />
        </div>

        <div className="form-group">
          <label>Total Semesters</label>
          <input
            type="number"
            value={form.total_semesters}
            onChange={e =>
              setForm({ ...form, total_semesters: e.target.value })
            }
            placeholder="e.g. 4"
          />
        </div>

        <div className="form-actions">
          <button className="primary-btn" onClick={saveProgram}>
            Save Program
          </button>
        </div>
      </div>
    </div>

    {/* TABLE CARD */}
    <div className="table-card">
      <h3 className="table-title">Existing Programs</h3>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Program Name</th>
            <th>Start Year</th>
            <th>Intake</th>
            <th>Total Semesters</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p, i) => (
            <tr key={p._id}>
              <td>{i + 1}</td>
              <td>{p.program_name}</td>
              <td>{p.start_year}</td>
              <td>{p.intake}</td>
              <td>{p.total_semesters}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
</div>

    </>
  );
}
