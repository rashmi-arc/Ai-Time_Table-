import { useEffect, useState } from "react";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "TEACHER",
    dept_id: ""
  });

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadDepartments();
    loadUsers();
  }, []);

  // ✅ Load departments
  const loadDepartments = async () => {
    const res = await fetch("http://localhost:5000/api/departments");
    const data = await res.json();
    setDepartments(data);
  };

  // ✅ Load users
  const loadUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: token
      }
    });

    const data = await res.json();
    setUsers(data);
  };

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save user
  const saveUser = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("User added");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "TEACHER",
        dept_id: ""
      });

      loadUsers(); // 🔄 refresh table
    } else {
      alert(data.message);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });

    loadUsers();
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <h2 className="page-title">User Management</h2>
      <p className="page-desc">Create and manage system users</p>

      {/* ===== FORM CARD ===== */}
      <div className="form-card">
        <div className="form-grid">

          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="TEACHER">Teacher</option>
              <option value="HOD">HOD</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="dept_id"
              value={form.dept_id}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.dept_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button className="primary-btn" onClick={saveUser}>
              Add User
            </button>
          </div>

        </div>
      </div>

      {/* ===== TABLE CARD ===== */}
      <div className="table-card">
        <h3 className="table-title">Existing Users</h3>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.dept_id?.dept_name || "-"}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  );
}

export default AddUser;