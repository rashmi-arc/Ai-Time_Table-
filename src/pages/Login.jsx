import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data); // ✅ debug

      if (res.ok) {
        // ✅ STORE TOKEN
        localStorage.setItem("token", data.token);

        // ✅ STORE USER (VERY IMPORTANT)
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful");

        // ✅ RELOAD APP
        window.location.reload();
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;