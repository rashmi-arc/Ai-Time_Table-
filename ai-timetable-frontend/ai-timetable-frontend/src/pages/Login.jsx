import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = [
      {
        email: "admin@college.com",
        password: "admin123",
        name: "Admin",
        role: "ADMIN",
      },
      {
        email: "hod@college.com",
        password: "hod123",
        name: "HOD",
        role: "HOD",
      },
    ];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(foundUser));
    window.location.reload();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <h2>AI Timetable Generator</h2>
          <p>Academic Management System</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="login-hint">
          <p><b>Admin:</b> admin@college.com / admin123</p>
          <p><b>HOD:</b> hod@college.com / hod123</p>
        </div>

      </div>
    </div>
  );
}

export default Login;
